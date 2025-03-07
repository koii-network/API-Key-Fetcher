import { namespaceWrapper } from "@_koii/task-manager/namespace-wrapper";
import axios from 'axios';

export async function handleClaudeFlow(browser) {
  let claudePage;
  try {
    // Create new page for GitHub flow
    claudePage = await browser.newPage();
    
    // Set viewport size
    await claudePage.setViewport({
      width: 1920,
      height: 1080
    });

    // Navigate to GitHub login
    await claudePage.goto('https://console.anthropic.com/login', {
      waitUntil: 'networkidle0',
      timeout: 600000  // 10 minutes
    });

    // Add warning message and highlight login field
    await claudePage.evaluate(() => {
      const loginButton = document.querySelector('[data-testid="email"]');
      if (loginButton) {
        // Create warning message
        const warningDiv = document.createElement('div');
        warningDiv.textContent = '⚠️ Please login to anthropic console.';
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
        const style = document.createElement('style');
        style.textContent = `
          @keyframes warningPulse {
            0% { opacity: 0.8; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.02); }
            100% { opacity: 0.8; transform: scale(1); }
          }
        `;
        document.head.appendChild(style);

        // Insert warning before login button
        loginButton.parentNode.insertBefore(warningDiv, loginButton);

        // Highlight login button
        loginButton.style.cssText = `
          border: 2px solid #e3b341 !important;
          box-shadow: 0 0 5px rgba(227, 179, 65, 0.3);
          animation: warningPulse 2s infinite;
        `;
      }
    });

    // Show login alert
    await claudePage.evaluate(() => {
      alert('Please login to anthropic console to continue to next step');
    });

    // Wait for navigation after login
    await claudePage.waitForNavigation({
      waitUntil: 'networkidle0',
      timeout: 600000  // 10 minutes
    });

    // Check if login was successful
    const currentUrl = claudePage.url();
    if (currentUrl === 'https://console.anthropic.com/dashboard') {

      await claudePage.evaluate(() => {
        alert('You are now successfully logged in.\nRedirecting to token creation page.');
      });

      await new Promise(resolve => setTimeout(resolve, 1000));

      // Navigate to tokens page
      await claudePage.goto('https://console.anthropic.com/settings/keys', {
        waitUntil: 'networkidle0',
        timeout: 600000  // 10 minutes
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
          const hintElement = document.createElement('div');
          hintElement.textContent = 'For example: 247builder';
          hintElement.style.cssText = `
            color: #2ea44f;
            font-size: 12px;
            font-style: italic;
            margin-top: 4px;
            margin-bottom: 8px;
            animation: pulse 2s infinite;
          `;

          // Insert hint after the input
          keyNameInput.parentNode.insertBefore(hintElement, keyNameInput.nextSibling);
        }
      });

      // Wait for the key to be generated and displayed
      await claudePage.waitForFunction(() => {
        const keyElement = document.querySelector('.bg-accent-secondary-900 p.text-text-000');
        return keyElement && keyElement.textContent.startsWith('sk-ant-');
      }, { timeout: 600000 }); // 10 minutes timeout

      // Get and store the API key
      const apiKey = await claudePage.evaluate(() => {
        const keyElement = document.querySelector('.bg-accent-secondary-900 p.text-text-000');
        return keyElement ? keyElement.textContent : null;
      });

      if (apiKey && apiKey.startsWith('sk-ant-')) {
        console.log('Successfully retrieved API key');
        await namespaceWrapper.storeSet("claude_api_key", apiKey);
        
        // Post Claude API key to API
        try {
          await axios.post('http://localhost:30017/api/task-variables', {
            label: "CLAUDE_API_KEY",
            value: apiKey
          });
          console.log('Successfully posted Claude API key to API');
        } catch (error) {
          console.error('Error posting Claude API key:', error.response?.data || error.message);
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
    return false;
  } finally {
    // Only close the page in finally if it exists and hasn't been closed yet
    if (claudePage && !claudePage.isClosed()) {
      try {
        await claudePage.close();
      } catch (error) {
        console.log("Page already closed");
      }
    }
  }
} 