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
      width: 1700,
      height: 992,
    });

    // Add helper function to inject secure footer
    const injectBranding = async (page) => {
      await page.evaluate(() => {
        // Only add if not already present
        if (!document.querySelector(".koii-branding")) {
          // Add logo
          const logo = document.createElement("div");
          logo.className = "koii-logo";
          logo.innerHTML = `
            <div class="logo">
              <svg xmlns="http://www.w3.org/2000/svg" width="38" height="28" viewBox="0 0 38 28" fill="none">
                <path d="M25.8301 14.9147C25.8301 13.8235 26.7032 12.9504 27.7946 12.9504C28.886 12.9504 29.7591 13.8235 29.7591 14.9147C29.7591 16.006 28.886 16.879 27.7946 16.879C26.7032 16.879 25.8301 15.9696 25.8301 14.9147Z" fill="white"/>
                <path d="M37.6906 19.6802C37.6178 20.2986 37.5451 20.917 37.3632 21.499C36.8175 23.5724 35.617 25.464 33.6525 26.5189C30.9604 27.9012 27.759 27.3919 25.0669 26.337C22.8478 27.9012 22.8478 27.9012 22.8478 27.9012C22.3384 28.2285 21.6836 27.6829 21.9746 27.1373C21.3562 27.2464 21.1743 26.6644 21.3562 26.1915C20.8469 26.5916 20.4103 25.8641 20.7014 25.4276C20.8833 25.1366 21.1743 24.8092 21.3926 24.5546C18.2639 22.7722 15.4263 20.5896 12.5523 18.4435C14.1894 19.462 20.7377 22.8086 22.3384 23.4997C24.0119 24.2272 25.6854 24.9547 27.4316 25.3549C28.8868 25.6822 30.7421 25.8641 32.0882 25.0275C33.3251 24.3 33.798 22.8086 33.9799 21.4627C34.4164 18.5526 33.3978 15.2788 31.8699 12.8052C30.2692 10.2225 27.6499 7.89449 24.6667 7.1306C23.5753 6.83959 22.484 6.83959 21.4653 7.02147C19.1007 7.4216 16.9543 8.87664 15.3172 10.6954C12.9525 13.3145 11.3154 16.5519 9.82388 19.753C8.80525 21.8992 7.38645 27.1373 4.03953 25.0639C2.54797 24.1181 1.6021 22.4812 0.94727 20.8806C0.21968 19.171 -0.289635 16.8793 0.183299 15.0241C1.20193 11.1319 6.65886 14.5876 8.51421 15.8244C8.40508 15.788 4.03953 13.7874 2.43883 15.3515C1.71124 16.079 1.74762 17.3886 1.85676 18.3343C2.07504 20.044 2.91176 22.5903 4.51246 23.5361C6.5861 24.7365 7.6411 20.9898 8.1868 19.6802C9.09629 17.4613 9.9694 15.2424 10.988 13.0599C12.1158 10.659 13.4618 8.29462 15.3172 6.36671C14.917 5.89382 14.3349 5.31181 14.2986 4.69342C14.2258 4.00228 14.917 3.23839 15.6446 3.60215C14.8079 2.65638 15.9356 1.23772 17.027 1.78336C16.5177 0.983094 17.3181 -0.0354284 18.1548 0.000947381C18.6277 0.000947381 19.1007 0.401079 19.4645 0.65571C20.4103 1.2741 21.3562 1.92886 22.3384 2.54725C31.3969 1.1286 38.491 11.4229 37.6906 19.6802Z" fill="white"/>
              </svg>
            </div>
          `;

          // Add secure footer
          const footer = document.createElement("div");
          footer.className = "secure-footer";
          footer.innerHTML = `
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M32.9683 19.7798H15.0825C13.1286 19.7798 11.5254 21.3643 11.5254 23.2955V36.7641C11.5254 38.6952 13.1286 40.2798 15.0825 40.2798H32.9683C34.9222 40.2798 36.5254 38.6952 36.5254 36.7641V23.2955C36.5254 21.3643 34.9222 19.7798 32.9683 19.7798Z" fill="#9BE7C4"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M24.0414 25.8521C23.0711 25.8521 22.2667 26.6545 22.2667 27.6522C22.2667 28.6498 23.0711 29.4521 24.0414 29.4521H24.092C25.0623 29.4521 25.8667 28.6498 25.8667 27.6522C25.8667 26.6545 25.0623 25.8521 24.092 25.8521H24.0414ZM20.8667 27.6522C20.8667 25.8947 22.2845 24.4521 24.0414 24.4521H24.092C25.8489 24.4521 27.2667 25.8947 27.2667 27.6522C27.2667 29.4096 25.8489 30.8521 24.092 30.8521H24.0414C22.2845 30.8521 20.8667 29.4096 20.8667 27.6522Z" fill="#353570"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M15.7749 14.9764C15.7749 10.3322 19.6545 6.56039 24.3574 6.77907L24.3594 6.77917C28.8041 6.99861 32.1749 10.7766 32.1749 15.1764V19.2751H33.9749C35.7613 19.2751 37.1749 20.6881 37.1749 22.4745V37.4707C37.1749 39.2571 35.7613 40.67 33.9749 40.67H13.9749C12.1885 40.67 10.7749 39.2571 10.7749 37.4707V22.4745C10.7749 20.6881 12.1885 19.2751 13.9749 19.2751H15.7749V14.9764ZM17.1749 19.2751H30.7749V15.1764C30.7749 11.4785 27.9462 8.35849 24.2914 8.17751C20.3948 7.99689 17.1749 11.1232 17.1749 14.9764V19.2751ZM13.9749 20.6751C12.9613 20.6751 12.1749 21.4616 12.1749 22.4745V37.4707C12.1749 38.4836 12.9613 39.27 13.9749 39.27H33.9749C34.9885 39.27 35.7749 38.4836 35.7749 37.4707V22.4745C35.7749 21.4616 34.9885 20.6751 33.9749 20.6751H13.9749Z" fill="#9BE7C4"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M24.0271 29.6516C24.4137 29.6516 24.7271 29.965 24.7271 30.3516V36.3516C24.7271 36.7382 24.4137 37.0516 24.0271 37.0516C23.6405 37.0516 23.3271 36.7382 23.3271 36.3516V30.3516C23.3271 29.965 23.6405 29.6516 24.0271 29.6516Z" fill="#353570"/>
            </svg>
            <div class="text">
              <span>No Strings Attached</span>
              <span>This page is secured by Koii, and running 100% on your computer</span>
            </div>
          `;

          // Add styles
          const style = document.createElement("style");
          style.textContent = `
            .koii-logo {
              position: fixed;
              top: 20px;
              left: 20px;
              z-index: 9999;
              display: flex;
              align-items: center;
              gap: 8px;
              padding: 8px;
              border-radius: 8px;
              backdrop-filter: blur(100px);
            }
            
            .secure-footer {
              position: fixed;
              bottom: 160px;
              left: 40px;
              display: flex;
              align-items: center;
              border-radius: 10px;
              background: rgba(137, 137, 199, 0.15);
              padding: 12px;
              gap: 10px;
              border: none;
              z-index: 9999;
              backdrop-filter: blur(100px);
            }
            
            .secure-footer::after {
              content: '';
              position: absolute;
              bottom: 0;
              left: 0;
              right: 0;
              height: 100%;
              border-radius: 10px;
              border-bottom: 1px solid rgba(229, 229, 229, 0.8);
              border-left: 1px solid rgba(229, 229, 229, 0.8);
              border-right: 1px solid rgba(229, 229, 229, 0.8);
              mask-image: linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
              -webkit-mask-image: linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
              pointer-events: none;
            }
            
            .secure-footer .text {
              color: rgba(255, 255, 255, 0.80);
              font-family: 'Inter', sans-serif;
              font-size: 15px;
              font-style: normal;
              font-weight: 500;
              line-height: 150%;
              letter-spacing: -0.165px;
            }
            
            .secure-footer .text span {
              display: block;
            }
          `;

          document.head.appendChild(style);
          document.body.appendChild(logo);
          document.body.appendChild(footer);

          // Add class to mark branding as added
          document.body.classList.add("koii-branding");
        }
      });
    };

    // Add listener for navigation events to re-inject footer
    claudePage.on("load", () => injectBranding(claudePage));

    // Initial injection after page creation
    await injectBranding(claudePage);

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

      // Wait for the input field to appear after clicking Create Key
      await claudePage.waitForSelector('input[placeholder="my-secret-key"]', {
        timeout: 120000, // 2 minutes timeout
      });

      // Add hints and highlights for token creation
      try {
        // First find and interact with the input field
        await claudePage.waitForSelector('input[placeholder="my-secret-key"]');
        await claudePage.click('input[placeholder="my-secret-key"]');
        await claudePage.type(
          'input[placeholder="my-secret-key"]',
          "my-node-anthropic-key",
        );

        // Add the visual hints through evaluate
        await claudePage.evaluate(() => {
          const addButton = Array.from(
            document.querySelectorAll("button"),
          ).find((button) => button.textContent.includes("Add"));

          if (addButton) {
            // Add step indicator for Add button
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
                ">Step 5</div>
                <div style="
                  color: #41465D;
                  font-weight: 500;
                  font-size: 12px;
                ">Click Add to create your API key</div>
              </div>
            `;
            addButton.style.position = "relative";
            addButton.appendChild(hintElement);
          }
        });
      } catch (error) {
        console.error("Error during key creation interaction:", error);
      }

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
