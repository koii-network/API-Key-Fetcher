import { namespaceWrapper } from "@_koii/task-manager/namespace-wrapper";

export async function handleGitHubFlow(browser) {
  let githubPage;
  try {
    // Create new page for GitHub flow
    githubPage = await browser.newPage();
    
    // Set viewport size
    await githubPage.setViewport({
      width: 1920,
      height: 1080
    });

    // Navigate to GitHub login
    await githubPage.goto('https://github.com/login', {
      waitUntil: 'networkidle0'
    });

    // Show login alert
    await githubPage.evaluate(() => {
      alert('Please login to GitHub to continue to next step');
    });

    // Wait for navigation after login
    await githubPage.waitForNavigation({
      waitUntil: 'networkidle0'
    });

    // Check if login was successful
    const currentUrl = githubPage.url();
    if (currentUrl === 'https://github.com/') {
      await githubPage.evaluate(() => {
        alert('You are now successfully logged in.\nRedirecting to token creation page in 3 seconds...');
      });

      await new Promise(resolve => setTimeout(resolve, 3000));

      // Navigate to tokens page
      await githubPage.goto('https://github.com/settings/tokens/new', {
        waitUntil: 'networkidle0'
      });

      // Add hints and highlights for token creation
      await githubPage.evaluate(() => {
        const inputElement = document.querySelector('input[name="oauth_access[description]"]');
        if (inputElement) {
          // Style the input element
          inputElement.style.cssText = `
            border: 2px solid #2ea44f !important;
            box-shadow: 0 0 5px rgba(46, 164, 79, 0.4);
            animation: pulse 2s infinite;
          `;
          
          // Create hint element
          const hintElement = document.createElement('span');
          hintElement.textContent = 'Please enter a name for your token, for example: 247 builder';
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
          inputElement.parentNode.insertBefore(hintElement, inputElement.nextSibling);
        }

        // Highlight the repo scope checkbox
        const checkbox = document.querySelector('input[value="repo"]');
        if (checkbox) {
          const checkboxContainer = checkbox.closest('li') || checkbox.parentElement;
          checkboxContainer.style.cssText = `
            background: rgba(46, 164, 79, 0.1);
            border-radius: 6px;
            padding: 8px;
            border: 2px solid #2ea44f;
            margin: 5px 0;
            animation: pulse 2s infinite;
          `;
          
          const checkboxHint = document.createElement('div');
          checkboxHint.textContent = 'Please check this box and scroll down to the "Generate token" button';
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
        const styleSheet = document.createElement('style');
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
        waitUntil: 'networkidle0',
        timeout: 300000
      });

      // Check if we're on the tokens page and save token
      if (githubPage.url() === 'https://github.com/settings/tokens') {
        console.log('Successfully generated token');

        const token = await githubPage.evaluate(() => {
          const tokenElement = document.querySelector('#new-oauth-token');
          return tokenElement ? tokenElement.textContent : null;
        });

        if (token) {
          console.log('Successfully retrieved token');
          await namespaceWrapper.storeSet("github_token", token);
          
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
  }
} 