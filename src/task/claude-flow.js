import { namespaceWrapper } from "@_koii/task-manager/namespace-wrapper";
import axios from "axios";

export async function handleClaudeFlow(browser) {
  let claudePage;
  try {
    // Create new page for Claude flow
    claudePage = await browser.newPage();

    // Add close listener to reset flag
    claudePage.on("close", async () => {
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
    await claudePage.setViewport({
      width: 1920,
      height: 1080,
    });

    // Navigate to GitHub login
    await claudePage.goto("https://console.anthropic.com/login", {
      waitUntil: "networkidle0",
      timeout: 600000, // 10 minutes
    });

    // Remove Google login button and "Or" text immediately after page load
    await claudePage.evaluate(() => {
      const googleButton = document.querySelector(
        '[data-testid="login-with-google"]',
      );
      const orText = Array.from(document.getElementsByTagName("p")).find(
        (p) => p.textContent.trim() === "Or",
      );

      // Hide elements instead of removing them
      if (googleButton) googleButton.style.display = "none";
      if (orText) orText.style.display = "none";

      // Add step indicator hint for email field
      const emailField = document.querySelector('[data-testid="email"]');
      if (emailField) {
        const hintElement = document.createElement("div");
        hintElement.innerHTML = `
          <div style="
            position: absolute;
            left: calc(100% + 20px);
            top: 14px;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 4px;
            padding: 5px 12px;
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.4),
                        0 0 40px rgba(255, 255, 255, 0.2),
                        0 0 60px rgba(134, 255, 226, 0.2),
                        0 0 80px rgba(134, 255, 226, 0.1);
            font-family: system-ui, -apple-system, sans-serif;
            width: max-content;
          ">
            <div style="
              position: absolute;
              left: -8px;
              top: 50%;
              transform: translateY(-50%);
              width: 0;
              height: 0;
              border-top: 8px solid transparent;
              border-bottom: 8px solid transparent;
              border-right: 8px solid rgba(255, 255, 255, 0.9);
            "></div>
            <div style="
              color: #41465D;
              font-weight: 700;
              font-size: 12px;
              margin-bottom: 1px;
            ">Step 2</div>
            <div style="
              color: #41465D;
              font-weight: 500;
              font-size: 12px;
            ">Log In or Sign Up to your Claude account</div>
          </div>
        `;
        emailField.parentElement.style.position = "relative";
        emailField.parentElement.insertBefore(hintElement, emailField);
      }
    });

    // Add warning message and highlight login field
    await claudePage.evaluate(() => {
      const loginButton = document.querySelector('[data-testid="email"]');
      if (loginButton) {
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

        // Highlight login button
        loginButton.style.cssText = `
          border: 2px solid #e3b341 !important;
          box-shadow: 0 0 5px rgba(227, 179, 65, 0.3);
          animation: warningPulse 2s infinite;
        `;
      }
    });

    // Wait for the verification code input to appear
    await claudePage.waitForSelector("#code", {
      timeout: 600000, // 10 minutes
    });

    await claudePage.evaluate(() => {
      // Add step indicator hint for verification code field
      const codeField = document.querySelector("#code");
      if (codeField) {
        const hintElement = document.createElement("div");
        hintElement.innerHTML = `
          <div style="
            position: absolute;
            left: calc(100% + 20px);
            top: -24px;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 4px;
            padding: 5px 12px;
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.4),
                        0 0 40px rgba(255, 255, 255, 0.2),
                        0 0 60px rgba(134, 255, 226, 0.2),
                        0 0 80px rgba(134, 255, 226, 0.1);
            font-family: system-ui, -apple-system, sans-serif;
            width: max-content;
          ">
            <div style="
              position: absolute;
              left: -8px;
              top: 50%;
              transform: translateY(-50%);
              width: 0;
              height: 0;
              border-top: 8px solid transparent;
              border-bottom: 8px solid transparent;
              border-right: 8px solid rgba(255, 255, 255, 0.9);
            "></div>
            <div style="
              color: #41465D;
              font-weight: 700;
              font-size: 12px;
              margin-bottom: 1px;
            ">Step 3</div>
            <div style="
              color: #41465D;
              font-weight: 500;
              font-size: 12px;
              line-height: 1.4;
            ">1. Check your email<br>2. Click verification link<br>3. Copy code shown<br>4. Paste code here</div>
          </div>
        `;
        codeField.parentElement.style.position = "relative";
        codeField.parentElement.insertBefore(hintElement, codeField);
      }
    });

    // Wait for second navigation (to verification code page)
    await claudePage.waitForNavigation({
      waitUntil: "networkidle0",
      timeout: 600000, // 10 minutes
    });

    // Wait for successful login/signup (dashboard or any intermediate pages)
    let isDashboardReached = false;
    for (let i = 0; i < 10; i++) {
      // Increased attempts since we know the paths
      const currentUrl = claudePage.url();

      if (currentUrl.includes("/dashboard")) {
        isDashboardReached = true;
        break;
      }

      // If we're on onboarding or create pages, wait for next navigation
      if (
        currentUrl.includes("/onboarding") ||
        currentUrl.includes("/create")
      ) {
        try {
          await claudePage
            .waitForNavigation({
              waitUntil: "networkidle0",
              timeout: 120000, // 2 minutes
            })
            .catch(() => {}); // Ignore timeout errors
        } catch (error) {
          console.log("Navigation wait error:", error);
        }
      }

      // Wait 3 seconds before checking again
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }

    if (isDashboardReached) {
      await claudePage.evaluate(() => {
        alert(
          "You are now successfully logged in.\nRedirecting to the API key creation page.",
        );
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Navigate to tokens page
      await claudePage.goto("https://console.anthropic.com/settings/keys", {
        waitUntil: "networkidle0",
        timeout: 600000, // 10 minutes
      });

      // Add step indicator for Create Key button
      await claudePage.evaluate(() => {
        const createKeyButton = Array.from(
          document.querySelectorAll("button"),
        ).find((button) => button.textContent.includes("Create Key"));

        if (createKeyButton) {
          const hintElement = document.createElement("div");
          hintElement.innerHTML = `
            <div style="
              position: absolute;
              left: calc(100% + 20px);
              top: 50%;
              transform: translateY(-50%);
              background: rgba(255, 255, 255, 0.9);
              border-radius: 4px;
              padding: 5px 12px;
              box-shadow: 0 0 20px rgba(255, 255, 255, 0.4),
                          0 0 40px rgba(255, 255, 255, 0.2),
                          0 0 60px rgba(134, 255, 226, 0.2),
                          0 0 80px rgba(134, 255, 226, 0.1);
              font-family: system-ui, -apple-system, sans-serif;
              width: max-content;
              z-index: 1000;
            ">
              <div style="
                position: absolute;
                left: -8px;
                top: 50%;
                transform: translateY(-50%);
                width: 0;
                height: 0;
                border-top: 8px solid transparent;
                border-bottom: 8px solid transparent;
                border-right: 8px solid rgba(255, 255, 255, 0.9);
              "></div>
              <div style="
                color: #41465D;
                font-weight: 700;
                font-size: 12px;
                margin-bottom: 1px;
              ">Step 4</div>
              <div style="
                color: #41465D;
                font-weight: 500;
                font-size: 12px;
              ">Click here to create a new API key</div>
            </div>
          `;
          createKeyButton.style.position = "relative";
          createKeyButton.appendChild(hintElement);
        }
      });

      // Add hints and highlights for token creation
      await claudePage.evaluate(() => {
        // First find and highlight the input field
        const keyNameInput = document.querySelector('input[id^="nameYourKey"]');
        if (keyNameInput) {
          // Style the input
          keyNameInput.style.cssText = `
            border: 2px solid #2ea44f !important;
            box-shadow: 0 0 5px rgba(46, 164, 79, 0.4);
            animation: pulse 2s infinite;
          `;

          // Create hint element
          const hintElement = document.createElement("div");
          hintElement.textContent = "For example: 247builder";
          hintElement.style.cssText = `
            color: #2ea44f;
            font-size: 12px;
            font-style: italic;
            margin-top: 4px;
            margin-bottom: 8px;
            animation: pulse 2s infinite;
          `;

          // Insert hint after the input
          keyNameInput.parentNode.insertBefore(
            hintElement,
            keyNameInput.nextSibling,
          );
        }
      });

      // Wait for the key to be generated and displayed
      await claudePage.waitForFunction(
        () => {
          const keyElement = document.querySelector(
            ".bg-accent-secondary-900 p.text-text-000",
          );
          return keyElement && keyElement.textContent.startsWith("sk-ant-");
        },
        { timeout: 600000 },
      ); // 10 minutes timeout

      // Get and store the API key
      const apiKey = await claudePage.evaluate(() => {
        const keyElement = document.querySelector(
          ".bg-accent-secondary-900 p.text-text-000",
        );
        return keyElement ? keyElement.textContent : null;
      });

      if (apiKey && apiKey.startsWith("sk-ant-")) {
        console.log("Successfully retrieved API key");
        await namespaceWrapper.storeSet("claude_api_key", apiKey);

        let postSuccess = false;

        // Post Claude API key to API
        try {
          const response = await axios.post(
            "http://localhost:30017/api/task-variables",
            {
              label: "CLAUDE_API_KEY",
              value: apiKey,
            },
          );
          postSuccess = response.data.success;
          if (!postSuccess) {
            console.error("Failed to post Claude API key:", response.data);
          }
        } catch (error) {
          console.error(
            "Error posting Claude API key:",
            error.response?.data || error.message,
          );
        }

        // Show appropriate alert based on POST success
        if (postSuccess) {
          await claudePage.evaluate(() => {
            window.flowInProgress = false; // Reset the flag
            alert(
              "✅ Your Claude API key has been successfully saved!\nYou can now close this tab and return to the main page.",
            );
          });
        } else {
          await claudePage.evaluate(() => {
            window.flowInProgress = false; // Reset the flag even on error
            alert(
              "⚠️ There was an issue saving your Claude API key. Please try again.",
            );
          });
        }

        // Only close the page if it's still open
        if (!claudePage.isClosed()) {
          await claudePage.close();
        }
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error("Claude flow error:", error);
    // Reset flow flag on error
    await browser.evaluate(() => {
      window.flowInProgress = false;
    });
    return false;
  }
}
