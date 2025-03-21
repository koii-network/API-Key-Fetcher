import { namespaceWrapper, app } from "@_koii/task-manager/namespace-wrapper";
import { getLandingPageContent } from './landing-page.js';
import { handleCardClick } from './1-task.js';

export async function routes() {
  /**
   *
   * Define all your custom routes here
   *
   */

  // Landing page route
  app.get("/landing-page", async (_req, res) => {
    try {
      // Get stored values from DB using correct keys
      const githubToken = await namespaceWrapper.storeGet("github_token");
      const githubUsername = await namespaceWrapper.storeGet("github_username");
      const claudeApiKey = await namespaceWrapper.storeGet("claude_api_key");

      // Get the landing page HTML with namespaceWrapper
      const html = getLandingPageContent(namespaceWrapper);

      // Inject the DB values into the response
      const htmlWithData = html.replace(
        '<script>',
        `<script>
          window.flowInProgress = false;  // Initialize flow flag
          window.dbValues = ${JSON.stringify({
            github: {
              token: githubToken,
              username: githubUsername
            },
            claude: claudeApiKey
          })};
        `
      );

      res.setHeader('Content-Type', 'text/html');
      res.status(200).send(htmlWithData);
    } catch (error) {
      console.error("Error serving landing page:", error);
      res.status(500).send("Error loading landing page");
    }
  });

  // Example route
  app.get("/value", async (_req, res) => {
    const value = await namespaceWrapper.storeGet("value");
    console.log("value", value);
    res.status(200).json({ value: value });
  });

  app.post('/api/card-click/:type', async (req, res) => {
    const { type } = req.params;
    console.log(`Received card click request for type: ${type}`);
    
    if (type !== 'github' && type !== 'claude') {
      console.log(`Invalid card type: ${type}`);
      return res.status(400).json({ error: 'Invalid card type' });
    }

    try {
      console.log(`Handling ${type} card click...`);
      await handleCardClick(type);
      console.log(`${type} flow completed successfully`);
      res.json({ success: true });
    } catch (error) {
      console.error(`Error handling ${type} card click:`, error);
      res.status(500).json({ error: 'Failed to handle card click' });
    }
  });
}

