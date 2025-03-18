import puppeteer from "puppeteer";
import { handleClaudeFlow } from "./claude-flow.js";
import { handleGitHubFlow } from "./github-flow.js";
import { getLandingPageContent } from "./landing-page.js";
import { namespaceWrapper, TASK_ID } from "@_koii/task-manager/namespace-wrapper";

let isCleaningUp = false;

async function cleanup(browser) {
  if (isCleaningUp) return;
  isCleaningUp = true;

  try {
    if (browser?.isConnected()) {
      const pages = await browser.pages().catch(() => []);
      // Simply close pages without needing to clean up event listeners
      await Promise.all(
        pages.map(async (page) => {
          try {
            await page.close().catch(() => {});
          } catch (error) {
            // Ignore cleanup errors
          }
        }),
      );
      await browser.close().catch(() => {});
    }
  } catch (error) {
    // Ignore cleanup errors
  }

  console.log("Cleanup complete, exiting...");
  process.exit(0);
}

export async function task() {
  const content = getLandingPageContent(namespaceWrapper);
  let browser;

  // Add credential check before browser launch
  try {
    const hasGithubUsername = await namespaceWrapper.storeGet('github_username');
    const hasGithubToken = await namespaceWrapper.storeGet('github_token');
    const hasClaudeApiKey = await namespaceWrapper.storeGet('claude_api_key');

    if (hasGithubUsername || hasGithubToken || hasClaudeApiKey) {
      console.log('Credentials already exist in DB. Skipping browser launch.');
      return;
    }
  } catch (error) {
    console.error('Error checking credentials:', error);
    return;
  }

  // Handle process termination
  process.on("SIGINT", () => cleanup(browser));
  process.on("SIGTERM", () => cleanup(browser));
  process.on("uncaughtException", (error) => {
    console.error("Uncaught exception:", error);
    cleanup(browser);
  });

  try {
    console.log(`EXECUTE TASK FOR ROUND ${namespaceWrapper.roundNumber}`);

    browser = await puppeteer.launch({
      headless: false,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--window-size=1700,992",
        "--window-position=0,0",
        "--start-maximized",
        "--max-width=1700",
        "--max-height=992",
        "--disable-gpu",
        "--disable-dev-shm-usage",
      ],
      defaultViewport: {
        width: 1700,
        height: 992,
      },
    });

    // Handle browser disconnection
    browser.on("disconnected", () => {
      if (!isCleaningUp) {
        console.log("Browser was closed");
        cleanup(browser);
      }
    });

    const landingPage = await browser.newPage();

    await landingPage.setViewport({
      width: 1700,
      height: 992,
      deviceScaleFactor: 1,
    });

    await landingPage.goto(`http://localhost:3000/task/${TASK_ID}/landing-page`, {
      waitUntil: "networkidle0",
      timeout: 600000,
    });

    let checkConnectionInterval;

    try {
      checkConnectionInterval = setInterval(() => {
        if (!browser?.isConnected()) {
          cleanup(browser);
        }
      }, 1000);

      while (browser?.isConnected()) {
        try {
          await landingPage.waitForFunction(
            () => window.lastClickedCard !== undefined,
            {
              timeout: 5000, // Shorter timeout to check connection more frequently
              polling: 1000,
            },
          );

          if (!browser?.isConnected()) break;

          const clickedCard = await landingPage
            .evaluate(() => {
              const card = window.lastClickedCard;
              window.lastClickedCard = undefined;
              return card;
            })
            .catch(() => null);

          if (!clickedCard || !browser?.isConnected()) continue;

          if (clickedCard === "github") {
            await handleGitHubFlow(browser);
          } else if (clickedCard === "claude") {
            await handleClaudeFlow(browser);
          }

          if (browser?.isConnected()) {
            await landingPage
              .reload({ waitUntil: "networkidle0" })
              .catch(() => {});
          }
        } catch (error) {
          if (error.name === "TimeoutError") {
            // Timeout is expected, continue checking
            continue;
          }
          if (!browser?.isConnected()) {
            break;
          }
          console.error("Error handling card click:", error);
        }
      }
    } finally {
      if (checkConnectionInterval) {
        clearInterval(checkConnectionInterval);
      }
    }
  } catch (error) {
    if (!isCleaningUp) {
      console.error("EXECUTE TASK ERROR:", error);
    }
  } finally {
    await cleanup(browser);
  }
}
