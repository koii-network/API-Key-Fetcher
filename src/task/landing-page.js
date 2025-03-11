export function getLandingPageContent() {
  return `
    <html>
      <head>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
            padding: 40px;
            background: #f6f8fa;
          }
          h1 {
            text-align: center;
            color: #24292e;
            margin-bottom: 40px;
          }
          .cards-container {
            display: flex;
            justify-content: center;
            gap: 30px;
            flex-wrap: wrap;
          }
          .card {
            background: white;
            border-radius: 10px;
            padding: 20px;
            width: 250px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            cursor: pointer;
            transition: all 0.2s;
            text-align: center;
            position: relative;
          }
          .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 4px 15px rgba(0,0,0,0.15);
          }
          .card img {
            width: 50px;
            height: 50px;
            margin-bottom: 15px;
          }
          .card h2 {
            margin: 0 0 10px 0;
            color: #24292e;
          }
          .card p {
            color: #586069;
            margin: 0;
            font-size: 14px;
          }
          .card.completed::after {
            content: "✓";
            position: absolute;
            top: 10px;
            right: 10px;
            background: #2ea44f;
            color: white;
            width: 24px;
            height: 24px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            font-weight: bold;
          }
          .completed {
            border: 2px solid #2ea44f;
            box-shadow: 0 2px 10px rgba(46, 164, 79, 0.2);
          }
          .completed:hover {
            box-shadow: 0 4px 15px rgba(46, 164, 79, 0.3);
          }
        </style>
      </head>
      <body>
        <h1>Choose which task variable you want to get</h1>
        <div class="cards-container">
          <div class="card" id="github-card">
            <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub">
            <h2>GitHub Info</h2>
            <p>Get your GitHub access token for API access</p>
          </div>
          <div class="card" id="anthropic-card">
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MCA1MCI+PHBhdGggZD0iTTI1IDJDMTIuMyAyIDIgMTIuMyAyIDI1czEwLjMgMjMgMjMgMjMgMjMtMTAuMyAyMy0yM1MzNy43IDIgMjUgMnptMCA0MmMtMTAuNSAwLTE5LTguNS0xOS0xOVMxNC41IDYgMjUgNnMxOSA4LjUgMTkgMTktOC41IDE5LTE5IDE5eiIvPjwvc3ZnPg==" alt="Anthropic">
            <h2>Anthropic API Key</h2>
            <p>Get your Claude API access credentials</p>
          </div>
          <div class="card" id="twitter-card">
            <img src="https://abs.twimg.com/responsive-web/client-web/icon-svg.168b89d5.svg" alt="Twitter">
            <h2>Twitter Info</h2>
            <p>Get your Twitter API credentials</p>
          </div>
        </div>
        <script>
          // Add flag to track if a flow is in progress
          window.flowInProgress = false;

          // Function to check completion status from window.dbValues
          function checkCompletionStatus() {
            if (window.dbValues) {
              // Check GitHub completion
              if (window.dbValues.github_token) {
                document.getElementById('github-card').classList.add('completed');
              }
              
              // Check Claude completion
              if (window.dbValues.claude_api_key) {
                document.getElementById('anthropic-card').classList.add('completed');
              }
            }
          }

          // Check completion status on load
          checkCompletionStatus();

          // Add click handlers
          document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('click', () => {
              // Check if a flow is already in progress
              if (window.flowInProgress) {
                alert('⚠️ Please finish the ongoing flow first before starting another one.');
                return;
              }

              // Reset all flags before setting new one
              window.githubClicked = false;
              window.claudeClicked = false;
              window.twitterClicked = false;

              if (card.id === 'github-card') {
                window.githubClicked = true;
                window.lastClickedCard = 'github';
                window.flowInProgress = true;
              } else if (card.id === 'anthropic-card') {
                window.claudeClicked = true;
                window.lastClickedCard = 'claude';
                window.flowInProgress = true;
              } else if (card.id === 'twitter-card') {
                alert('Twitter API setup coming soon!');
              }
            });
          });
        </script>
      </body>
    </html>
  `;
} 