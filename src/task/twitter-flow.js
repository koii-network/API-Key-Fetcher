import { namespaceWrapper } from "@_koii/task-manager/namespace-wrapper";
import axios from 'axios';

export async function handleTwitterFlow(browser) {
  let twitterPage;
  try {
    // Create new page for Twitter flow
    twitterPage = await browser.newPage();
    
    // Add close listener to reset flag
    twitterPage.on('close', async () => {
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
    await twitterPage.setViewport({
      width: 1920,
      height: 1080
    });

    // Navigate to Twitter login
    await twitterPage.goto('https://twitter.com/i/flow/login', {
      waitUntil: 'networkidle0',
      timeout: 600000  // 10 minutes
    });

    // Add warning message
    await twitterPage.evaluate(() => {
      const loginForm = document.querySelector('form');
      if (loginForm) {
        const warningDiv = document.createElement('div');
        warningDiv.textContent = '⚠️ Please login to Twitter to continue.';
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
        loginForm.insertBefore(warningDiv, loginForm.firstChild);
      }
    });

    // Wait for successful login (URL change)
    await twitterPage.waitForFunction(
      () => window.location.href === 'https://twitter.com/home',
      { timeout: 600000 }
    );

    // Get cookies after successful login
    const cookies = await twitterPage.cookies();
    
    // Save cookies to database
    await namespaceWrapper.storeSet("twitter_cookies", JSON.stringify(cookies));
    
    let postSuccess = false;
    
    // Post cookies to API
    try {
      const response = await axios.post('http://localhost:30017/api/task-variables', {
        label: "TWITTER_COOKIES",
        value: JSON.stringify(cookies)
      });
      postSuccess = response.data.success;
      if (!postSuccess) {
        console.error('Failed to post Twitter cookies:', response.data);
      }
    } catch (error) {
      console.error('Error posting Twitter cookies:', error.response?.data || error.message);
    }

    // Show appropriate alert based on POST success
    if (postSuccess) {
      await twitterPage.evaluate(() => {
        window.flowInProgress = false;  // Reset the flag
        alert('✅ Your Twitter login has been successfully saved!\nYou can now close this tab and return to the main page.');
      });
    } else {
      await twitterPage.evaluate(() => {
        window.flowInProgress = false;  // Reset the flag even on error
        alert('⚠️ There was an issue saving your Twitter login. Please try again.');
      });
    }
    
    // Close the page
    if (!twitterPage.isClosed()) {
      await twitterPage.close();
    }
    return true;

  } catch (error) {
    console.error("Twitter flow error:", error);
    // Reset flow flag on error
    await browser.evaluate(() => {
      window.flowInProgress = false;
    });
    return false;
  }
} 