import puppeteer from "puppeteer";
import { handleClaudeFlow } from "./claude-flow.js";
import { handleGitHubFlow } from "./github-flow.js";
import { getLandingPageContent } from "./landing-page.js";
import { namespaceWrapper, TASK_ID } from "@_koii/task-manager/namespace-wrapper";
import open from 'open';

let isCleaningUp = false;

async function cleanup(browser) {
  if (isCleaningUp) return;
  isCleaningUp = true;

  try {
    if (browser?.isConnected()) {
      const pages = await browser.pages().catch(() => []);
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

  console.log("Cleanup complete");
  isCleaningUp = false;  // Reset flag instead of exiting
}

export async function task() {
  const content = getLandingPageContent(namespaceWrapper);
  
  // Add credential check before opening page
  try {
    const hasGithubUsername = await namespaceWrapper.storeGet('github_username');
    const hasGithubToken = await namespaceWrapper.storeGet('github_token');
    const hasClaudeApiKey = await namespaceWrapper.storeGet('claude_api_key');

    if (hasGithubUsername && hasGithubToken && hasClaudeApiKey) {
      console.log('Credentials already exist in DB. Skipping browser launch.');
      return;
    }
  } catch (error) {
    console.error('Error checking credentials:', error);
    return;
  }

  // Open the landing page in default browser
  const url = `http://localhost:3000/task/${TASK_ID}/landing-page`;
  await open(url);

  // The rest of the Puppeteer logic will be moved to API endpoints
}

// Add these functions to handle the card clicks via API
export async function handleCardClick(cardType) {
  let browser;
  
  try {
    console.log(`Starting ${cardType} flow...`);
    
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

    console.log('Browser launched successfully');

    if (cardType === "github") {
      console.log('Initiating GitHub flow...');
      await handleGitHubFlow(browser);
    } else if (cardType === "claude") {
      console.log('Initiating Claude flow...');
      await handleClaudeFlow(browser);
    }

  } catch (error) {
    console.error('Error in handleCardClick:', error);
  } finally {
    if (browser) {
      console.log('Cleaning up browser...');
      await cleanup(browser);
    }
  }
}
