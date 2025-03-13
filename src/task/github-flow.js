import { namespaceWrapper } from "@_koii/task-manager/namespace-wrapper";
import axios from "axios";

export async function handleGitHubFlow(browser) {
  let githubPage;
  try {
    // Create new page for GitHub flow
    githubPage = await browser.newPage();

    // Add close listener to reset flag
    githubPage.on("close", async () => {
      try {
        const pages = await browser.pages();
        const landingPage = pages[0];
        await landingPage.evaluate(() => {
          window.flowInProgress = false;
        });
      } catch (error) {
        console.log("Could not reset flow flag on page close:", error);
      }
    });

    // Set viewport size
    await githubPage.setViewport({
      width: 1920,
      height: 1080,
    });

    // Navigate to GitHub login
    await githubPage.goto("https://github.com/login", {
      waitUntil: "networkidle0",
      timeout: 600000, // 10 minutes
    });

    // Add warning message and highlight login field
    await githubPage.evaluate(() => {
      const loginField = document.querySelector("#login_field");
      if (loginField) {
        // Create warning message
        const warningDiv = document.createElement("div");
        warningDiv.textContent =
          "⚠️ Please use your spare GitHub account. If you don't have one, please register a new account.";
        warningDiv.style.cssText = `
          color: #b59f00;
          background: #fffbe6;
          border: 1px solid #fff5c1;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 15px;
          padding: 8px 12px;
          text-align: center;
          animation: warningPulse 2s infinite;
        `;

        // Add animation style
        const style = document.createElement("style");
        style.textContent = `
          @keyframes warningPulse {
            0% { opacity: 0.8; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.02); }
            100% { opacity: 0.8; transform: scale(1); }
          }
        `;
        document.head.appendChild(style);

        // Insert warning before login field
        loginField.parentNode.insertBefore(warningDiv, loginField);

        // Highlight login field
        loginField.style.cssText = `
          border: 2px solid #e3b341 !important;
          box-shadow: 0 0 5px rgba(227, 179, 65, 0.3);
        `;
      }
    });

    // Show login alert
    await githubPage.evaluate(() => {
      alert("Please login to GitHub to continue to the next step");
    });

    // Wait for navigation after login
    await githubPage.waitForNavigation({
      waitUntil: "networkidle0",
      timeout: 600000, // 10 minutes
    });

    // Check if login was successful
    const currentUrl = githubPage.url();
    if (currentUrl === "https://github.com/") {
      // Get and store GitHub username
      const username = await githubPage.evaluate(() => {
        const metaElement = document.querySelector('meta[name="user-login"]');
        return metaElement ? metaElement.getAttribute("content") : null;
      });

      if (username) {
        console.log("Successfully retrieved username:", username);
        await namespaceWrapper.storeSet("github_username", username);
      }

      await githubPage.evaluate(() => {
        alert(
          "You are now successfully logged in.\nRedirecting to token creation page in 3 seconds...",
        );
      });

      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Navigate to tokens page
      await githubPage.goto("https://github.com/settings/tokens/new", {
        waitUntil: "networkidle0",
        timeout: 600000, // 10 minutes
      });

      // Add hints and highlights for token creation
      await githubPage.evaluate(() => {
        const inputElement = document.querySelector(
          'input[name="oauth_access[description]"]',
        );
        if (inputElement) {
          // Style the input element
          inputElement.style.cssText = `
            border: 2px solid #2ea44f !important;
            box-shadow: 0 0 5px rgba(46, 164, 79, 0.4);
            animation: pulse 2s infinite;
          `;

          // Create hint element
          const hintElement = document.createElement("span");
          hintElement.textContent =
            "Please enter a name for your token, for example: 247 builder";
          hintElement.style.cssText = `
            margin-left: 10px;
            color: #2ea44f;
            font-size: 12px;
            font-style: italic;
            display: inline-block;
            vertical-align: middle;
            animation: pulse 2s infinite;
          `;

          // Insert hint after the input
          inputElement.parentNode.insertBefore(
            hintElement,
            inputElement.nextSibling,
          );
        }

        // Highlight the repo scope checkbox
        const checkbox = document.querySelector('input[value="repo"]');
        if (checkbox) {
          const checkboxContainer =
            checkbox.closest("li") || checkbox.parentElement;
          checkboxContainer.style.cssText = `
            background: rgba(46, 164, 79, 0.1);
            border-radius: 6px;
            padding: 8px;
            border: 2px solid #2ea44f;
            margin: 5px 0;
            animation: pulse 2s infinite;
          `;

          const checkboxHint = document.createElement("div");
          checkboxHint.textContent =
            'Please check this box and scroll down to the "Generate token" button';
          checkboxHint.style.cssText = `
            color: #2ea44f;
            font-size: 12px;
            font-style: italic;
            margin-top: 5px;
            animation: pulse 2s infinite;
          `;

          checkboxContainer.appendChild(checkboxHint);
        }

        // Add pulse animation
        const styleSheet = document.createElement("style");
        styleSheet.textContent = `
          @keyframes pulse {
            0% { opacity: 0.6; }
            50% { opacity: 1; }
            100% { opacity: 0.6; }
          }
        `;
        document.head.appendChild(styleSheet);
      });

      // Wait for navigation after clicking generate token
      await githubPage.waitForNavigation({
        waitUntil: "networkidle0",
        timeout: 600000, // 10 minutes
      });

      // Check if we're on the tokens page and save token
      if (githubPage.url() === "https://github.com/settings/tokens") {
        console.log("Successfully generated token");

        const token = await githubPage.evaluate(() => {
          const tokenElement = document.querySelector("#new-oauth-token");
          return tokenElement ? tokenElement.textContent : null;
        });

        if (token) {
          console.log("Successfully retrieved token");
          await namespaceWrapper.storeSet("github_token", token);

          let postSuccess = true;

          // Post GitHub username to API
          try {
            const usernameResponse = await axios.post(
              "http://localhost:30017/api/task-variables",
              {
                label: "GITHUB_USERNAME",
                value: username,
              },
            );
            if (!usernameResponse.data.success) {
              postSuccess = false;
              console.error(
                "Failed to post GitHub username:",
                usernameResponse.data,
              );
            }
          } catch (error) {
            postSuccess = false;
            console.error(
              "Error posting GitHub username:",
              error.response?.data || error.message,
            );
          }

          // Post GitHub token to API
          try {
            const tokenResponse = await axios.post(
              "http://localhost:30017/api/task-variables",
              {
                label: "GITHUB_TOKEN",
                value: token,
              },
            );
            if (!tokenResponse.data.success) {
              postSuccess = false;
              console.error("Failed to post GitHub token:", tokenResponse.data);
            }
          } catch (error) {
            postSuccess = false;
            console.error(
              "Error posting GitHub token:",
              error.response?.data || error.message,
            );
          }

          // Show success alert only if both POSTs were successful
          if (postSuccess) {
            await githubPage.evaluate(() => {
              window.flowInProgress = false; // Reset the flag
              alert(
                "✅ Your GitHub information has been successfully saved!\nYou can now close this tab and return to the main page.",
              );
            });
          } else {
            await githubPage.evaluate(() => {
              window.flowInProgress = false; // Reset the flag even on error
              alert(
                "⚠️ There was an issue saving your GitHub information. Please try again.",
              );
            });
          }

          // Only close the page if it's still open
          if (!githubPage.isClosed()) {
            await githubPage.close();
          }
          return true;
        }
      }
    }
    return false;
  } catch (error) {
    console.error("GitHub flow error:", error);
    // Reset flow flag on error
    await browser.evaluate(() => {
      window.flowInProgress = false;
    });
    return false;
  } finally {
    // Only close the page in finally if it exists and hasn't been closed yet
    if (githubPage && !githubPage.isClosed()) {
      try {
        await githubPage.close();
      } catch (error) {
        console.log("Page already closed");
      }
    }
    // Reset flow flag in case of manual close or any other scenario
    try {
      await browser.pages().then(async (pages) => {
        const landingPage = pages[0];
        await landingPage.evaluate(() => {
          window.flowInProgress = false;
        });
      });
    } catch (error) {
      console.log("Could not reset flow flag:", error);
    }
  }
}
