import { namespaceWrapper } from "@_koii/task-manager/namespace-wrapper";
import puppeteer from 'puppeteer';
import { handleGitHubFlow } from './github-flow.js';
import { handleClaudeFlow } from './claude-flow.js';
import { getLandingPageContent } from './landing-page.js';

export async function task(roundNumber) {
  let browser;
  try {
    console.log(`EXECUTE TASK FOR ROUND ${roundNumber}`);
    
    // Launch browser
    browser = await puppeteer.launch({
      headless: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    // Create landing page
    const landingPage = await browser.newPage();
    
    // Set viewport size
    await landingPage.setViewport({
      width: 1920,
      height: 1080
    });

    // Set landing page content
    await landingPage.setContent(getLandingPageContent());

    while (true) {
      try {
        // Wait for any card click
        await landingPage.waitForFunction(() => 
          window.lastClickedCard !== undefined, 
          { timeout: 600000 } // 10 minutes timeout
        );
        
        // Get which card was clicked
        const clickedCard = await landingPage.evaluate(() => {
          const card = window.lastClickedCard;
          window.lastClickedCard = undefined; // Reset for next click
          return card;
        });

        if (clickedCard === 'github') {
          await handleGitHubFlow(browser);
        } else if (clickedCard === 'claude') {
          await handleClaudeFlow(browser);
        }
        
        // Continue waiting for more clicks
        
      } catch (error) {
        console.error("Error handling card click:", error);
      }
    }
    
  } catch (error) {
    console.error("EXECUTE TASK ERROR:", error);
    if (browser) await browser.close();
  }
}
