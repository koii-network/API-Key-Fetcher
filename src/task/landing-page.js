export function getLandingPageContent() {
  return `
    <html>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;700&display=swap" rel="stylesheet">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
            padding: 40px;
            background: var(--Node-Gradient, linear-gradient(180deg, #030332 0%, #454580 131.81%));
            min-height: 100vh;
            margin: 0;
            max-width: 1200px;
            margin-left: auto;
            margin-right: auto;
          }
          .heading {
            color: rgba(255, 255, 255, 0.80);
            text-align: center;
            font-family: 'Sora', sans-serif;
            font-size: 32px;
            font-style: normal;
            font-weight: 700;
            line-height: 150%;
            letter-spacing: -0.352px;
            margin-bottom: 8px;
          }
          .sub-heading {
            color: rgba(255, 255, 255, 0.80);
            text-align: center;
            font-family: 'Sora', sans-serif;
            font-size: 18px;
            font-style: normal;
            font-weight: 400;
            line-height: 150%;
            letter-spacing: -0.352px;
            margin-bottom: 40px;
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
          }
          .sub-heading .small-text {
            font-size: 16px;
            display: block;
          }
          .section {
            margin-bottom: 40px;
            padding: 0 40px;
          }
          .section-title {
            color: rgba(255, 255, 255, 0.80);
            font-family: 'Sora', sans-serif;
            font-size: 24px;
            font-weight: 700;
            line-height: 150%;
            margin-bottom: 8px;
            text-align: left;
          }
          .section-description {
            color: rgba(255, 255, 255, 0.80);
            font-family: 'Sora', sans-serif;
            font-size: 16px;
            font-weight: 400;
            line-height: 150%;
            text-align: left;
            margin-bottom: 24px;
          }
          .cards-container {
            display: flex;
            justify-content: flex-start;
            gap: 30px;
            flex-wrap: wrap;
            margin-bottom: 40px;
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
        <h1 class="heading">Become a Super Contributor</h1>
        <p class="sub-heading">
          Earn more rewards when you connect additional services to your Koii account.
          <span class="small-text">Prometheus requires at least one Github Account and one AI Agent to operate.</span>
        </p>
        
        <div class="section">
          <h2 class="section-title">Free Accounts</h2>
          <p class="section-description">Connect popular tools to complete more tasks and participate in governance.</p>
          <div class="cards-container">
            <div class="card" id="github-card" data-type="github">
              <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub">
              <h2>GitHub Info</h2>
              <p>Get your GitHub access token for API access</p>
            </div>
          </div>
        </div>

        <div class="section">
          <h2 class="section-title">Paid Accounts</h2>
          <p class="section-description">Some tasks require paid subscriptions, and often have greater rewards.</p>
          <div class="cards-container">
            <div class="card" id="anthropic-card" data-type="claude">
              <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MCA1MCI+PHBhdGggZD0iTTI1IDJDMTIuMyAyIDIgMTIuMyAyIDI1czEwLjMgMjMgMjMgMjMgMjMtMTAuMyAyMy0yM1MzNy43IDIgMjUgMnptMCA0MmMtMTAuNSAwLTE5LTguNS0xOS0xOVMxNC41IDYgMjUgNnMxOSA4LjUgMTkgMTktOC41IDE5LTE5IDE5eiIvPjwvc3ZnPg==" alt="Anthropic">
              <h2>Anthropic API Key</h2>
              <p>Get your Claude API access credentials</p>
            </div>
          </div>
        </div>

        <script>
          let flowState = {
            inProgress: false,
            selectedCard: null
          };

          function handleCardClick(event) {
            const card = event.currentTarget;
            
            if (flowState.inProgress) {
              alert('⚠️ Please finish the ongoing flow first before starting another one.');
              return;
            }

            flowState = {
              inProgress: true,
              selectedCard: card.dataset.type
            };
          }

          // Add event listeners
          document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('click', handleCardClick);
          });

          // Expose only what's needed for the task manager
          Object.defineProperty(window, 'lastClickedCard', {
            get: () => flowState.selectedCard,
            set: (value) => {
              flowState.selectedCard = value;
              flowState.inProgress = value !== undefined;
            }
          });
        </script>
      </body>
    </html>
  `;
} 