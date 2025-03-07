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

    // Wait for either GitHub or Claude card click
    await landingPage.waitForFunction(() => 
      window.githubClicked === true || window.claudeClicked === true
    );
    
    // Check which card was clicked and handle accordingly
    const clickedCard = await landingPage.evaluate(() => {
      if (window.githubClicked) return 'github';
      if (window.claudeClicked) return 'claude';
      return null;
    });

    if (clickedCard === 'github') {
      await handleGitHubFlow(browser);
    } else if (clickedCard === 'claude') {
      await handleClaudeFlow(browser);
    }

    // Keep browser open for other potential actions
    // Only close browser when user is completely done
    
  } catch (error) {
    console.error("EXECUTE TASK ERROR:", error);
    // Only close browser on error
    if (browser) await browser.close();
  }
}
