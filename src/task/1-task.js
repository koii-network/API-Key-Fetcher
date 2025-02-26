import { namespaceWrapper } from "@_koii/task-manager/namespace-wrapper";
import puppeteer from 'puppeteer';

export async function task(roundNumber) {
  // Run your task and store the proofs to be submitted for auditing
  // The submission of the proofs is done in the submission function
  try {
    console.log(`EXECUTE TASK FOR ROUND ${roundNumber}`);
    
    // Launch browser
    const browser = await puppeteer.launch({
      headless: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    // Create new page
    const page = await browser.newPage();
    
    // Set viewport size to 1920x1080
    await page.setViewport({
      width: 1920,
      height: 1080
    });
    
    // Navigate to GitHub login
    await page.goto('https://github.com/login', {
      waitUntil: 'networkidle0'
    });

    console.log('Successfully loaded GitHub login page');

    // Show initial alert message
    await page.evaluate(() => {
      alert('Please login to GitHub to continue to next step');
    });

    // Wait for navigation to homepage after login
    await page.waitForNavigation({
      waitUntil: 'networkidle0'
    });

    // Check if login was successful by checking URL
    const currentUrl = page.url();
    if (currentUrl === 'https://github.com/') {
      // Show single redirect alert
      await page.evaluate(() => {
        alert('You are now successfully logged in.\nRedirecting to token creation page in 3 seconds...');
      });

      // Wait for 3 seconds after alert is dismissed
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Navigate to tokens page
      await page.goto('https://github.com/settings/tokens/new', {
        waitUntil: 'networkidle0'
      });
      
      console.log('Successfully navigated to tokens page');

      // Add hint for token name and highlight elements
      await page.evaluate(() => {
        const inputElement = document.querySelector('input[name="oauth_access[description]"]');
        if (inputElement) {
          // Style the input element
          inputElement.style.cssText = `
            border: 2px solid #2ea44f !important;
            box-shadow: 0 0 5px rgba(46, 164, 79, 0.4);
            transition: all 0.3s ease-in-out;
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
          
          // Insert hint after the input
          inputElement.parentNode.insertBefore(hintElement, inputElement.nextSibling);
        }

        // Highlight the repo scope checkbox
        const checkbox = document.querySelector('input[value="repo"]');
        if (checkbox) {
          // Style the checkbox container
          const checkboxContainer = checkbox.closest('li') || checkbox.parentElement;
          checkboxContainer.style.cssText = `
            background: rgba(46, 164, 79, 0.1);
            border-radius: 6px;
            padding: 8px;
            border: 2px solid #2ea44f;
            margin: 5px 0;
            transition: all 0.3s ease-in-out;
          `;
          
          // Create hint for checkbox with updated text
          const checkboxHint = document.createElement('div');
          checkboxHint.textContent = 'Please check this box and scroll down to the "Generate token" button';
          checkboxHint.style.cssText = `
            color: #2ea44f;
            font-size: 12px;
            font-style: italic;
            margin-top: 5px;
            animation: pulse 2s infinite;
          `;
          
          // Add the hint after the checkbox container
          checkboxContainer.appendChild(checkboxHint);
        }

        // Highlight the generate token button
        const generateButton = document.querySelector('button[type="submit"]');
        if (generateButton) {
          generateButton.style.cssText = `
            border: 3px solid #ff0000 !important;
            box-shadow: 0 0 10px rgba(255, 0, 0, 0.4);
            animation: buttonPulse 2s infinite;
          `;

          // Add button pulse animation
          const buttonStyle = document.createElement('style');
          buttonStyle.textContent = `
            @keyframes buttonPulse {
              0% { transform: scale(1); border-color: #ff0000; box-shadow: 0 0 10px rgba(255, 0, 0, 0.4); }
              50% { transform: scale(1.05); border-color: #ff5555; box-shadow: 0 0 15px rgba(255, 0, 0, 0.6); }
              100% { transform: scale(1); border-color: #ff0000; box-shadow: 0 0 10px rgba(255, 0, 0, 0.4); }
            }
          `;
          document.head.appendChild(buttonStyle);
        }
      });

      // Wait for navigation after clicking generate token
      await page.waitForNavigation({
        waitUntil: 'networkidle0'
      });

      // Check if we're on the tokens page
      if (page.url() === 'https://github.com/settings/tokens') {
        console.log('Successfully generated token');

        // Get the token value
        const token = await page.evaluate(() => {
          const tokenElement = document.querySelector('#new-oauth-token');
          return tokenElement ? tokenElement.textContent : null;
        });

        if (token) {
          console.log('Successfully retrieved token');
          // Save token to database
          await namespaceWrapper.storeSet("github_token", token);
        } else {
          console.log('Token element not found');
        }
      }
    }

    // Store browser instance for later use
    await namespaceWrapper.storeSet("browser", browser);
    await namespaceWrapper.storeSet("page", page);

  } catch (error) {
    console.error("EXECUTE TASK ERROR:", error);
    // Cleanup in case of error
    const browser = await namespaceWrapper.storeGet("browser");
    if (browser) await browser.close();
  }
}
