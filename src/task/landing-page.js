export function getLandingPageContent() {
  return `
    <html>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;700&family=Inter:wght@500&display=swap" rel="stylesheet">
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
            background: transparent;
            border: 1px solid rgba(255, 255, 255, 0.76);
            border-radius: 10px;
            padding: 20px;
            width: 300px;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            gap: 20px;
          }
          .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 4px 15px rgba(0,0,0,0.15);
          }
          .card-icon {
            flex-shrink: 0;
          }
          .card-icon img {
            width: 50px;
            height: 50px;
          }
          .card-content {
            flex-grow: 1;
          }
          .card-content h2 {
            margin: 0 0 8px 0;
            color: rgba(255, 255, 255, 0.80);
          }
          .card-content p {
            color: rgba(255, 255, 255, 0.80);
            margin: 0;
            font-size: 14px;
            line-height: 1.4;
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
          .card.disabled {
            opacity: 0.3;
            cursor: not-allowed;
            pointer-events: none;
          }
          .header {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 40px;
          }
          
          .header .logo {
            display: flex;
            align-items: center;
            gap: 8px;
          }
          
          .header .logo-text {
            color: rgba(255, 255, 255, 0.80);
            font-family: 'Sora', sans-serif;
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            line-height: 150%;
            letter-spacing: -0.22px;
          }
          
          .secure-footer {
            position: fixed;
            bottom: 160px;
            left: 40px;
            display: flex;
            align-items: center;
            gap: 12px;
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
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">
            <svg xmlns="http://www.w3.org/2000/svg" width="38" height="28" viewBox="0 0 38 28" fill="none">
              <path d="M25.8301 14.9147C25.8301 13.8235 26.7032 12.9504 27.7946 12.9504C28.886 12.9504 29.7591 13.8235 29.7591 14.9147C29.7591 16.006 28.886 16.879 27.7946 16.879C26.7032 16.879 25.8301 15.9696 25.8301 14.9147Z" fill="white"/>
              <path d="M37.6906 19.6802C37.6178 20.2986 37.5451 20.917 37.3632 21.499C36.8175 23.5724 35.617 25.464 33.6525 26.5189C30.9604 27.9012 27.759 27.3919 25.0669 26.337C22.8478 27.9012 22.8478 27.9012 22.8478 27.9012C22.3384 28.2285 21.6836 27.6829 21.9746 27.1373C21.3562 27.2464 21.1743 26.6644 21.3562 26.1915C20.8469 26.5916 20.4103 25.8641 20.7014 25.4276C20.8833 25.1366 21.1743 24.8092 21.3926 24.5546C18.2639 22.7722 15.4263 20.5896 12.5523 18.4435C14.1894 19.462 20.7377 22.8086 22.3384 23.4997C24.0119 24.2272 25.6854 24.9547 27.4316 25.3549C28.8868 25.6822 30.7421 25.8641 32.0882 25.0275C33.3251 24.3 33.798 22.8086 33.9799 21.4627C34.4164 18.5526 33.3978 15.2788 31.8699 12.8052C30.2692 10.2225 27.6499 7.89449 24.6667 7.1306C23.5753 6.83959 22.484 6.83959 21.4653 7.02147C19.1007 7.4216 16.9543 8.87664 15.3172 10.6954C12.9525 13.3145 11.3154 16.5519 9.82388 19.753C8.80525 21.8992 7.38645 27.1373 4.03953 25.0639C2.54797 24.1181 1.6021 22.4812 0.94727 20.8806C0.21968 19.171 -0.289635 16.8793 0.183299 15.0241C1.20193 11.1319 6.65886 14.5876 8.51421 15.8244C8.40508 15.788 4.03953 13.7874 2.43883 15.3515C1.71124 16.079 1.74762 17.3886 1.85676 18.3343C2.07504 20.044 2.91176 22.5903 4.51246 23.5361C6.5861 24.7365 7.6411 20.9898 8.1868 19.6802C9.09629 17.4613 9.9694 15.2424 10.988 13.0599C12.1158 10.659 13.4618 8.29462 15.3172 6.36671C14.917 5.89382 14.3349 5.31181 14.2986 4.69342C14.2258 4.00228 14.917 3.23839 15.6446 3.60215C14.8079 2.65638 15.9356 1.23772 17.027 1.78336C16.5177 0.983094 17.3181 -0.0354284 18.1548 0.000947381C18.6277 0.000947381 19.1007 0.401079 19.4645 0.65571C20.4103 1.2741 21.3562 1.92886 22.3384 2.54725C31.3969 1.1286 38.491 11.4229 37.6906 19.6802Z" fill="white"/>
            </svg>
            <span class="logo-text">Koii</span>
          </div>
        </div>

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
              <div class="card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="71" height="71" viewBox="0 0 71 71" fill="none">
                  <path d="M25.7321 60.4581C23.9405 60.4581 24.1963 62.5681 24.1963 62.5681H47.4879C47.4879 62.5681 47.5977 61.6622 47.1702 61.0377C46.944 60.709 46.5694 60.4581 45.952 60.4581C44.2883 60.4581 43.9048 59.7136 43.9048 58.9689L44.0325 50.2822C44.0325 47.3034 43.0082 45.3177 41.7282 44.3249C49.0238 43.5801 56.7015 40.8497 56.7015 28.6865C56.7015 25.2126 55.4214 22.358 53.3741 20.124C53.7577 19.3793 54.782 16.1524 52.9905 11.8084C52.9905 11.8084 52.2943 11.5838 50.7843 11.9015C49.3272 12.2093 47.112 13.0235 44.0325 15.0353C38.6579 13.546 33.0262 13.546 27.6515 15.0353C21.3817 10.9396 18.6937 11.8084 18.6937 11.8084C16.9021 16.1524 17.9264 19.3793 18.3101 20.124C16.2628 22.358 14.9827 25.2126 14.9827 28.6865C14.9827 40.8497 22.5326 43.5801 29.8267 44.3249C28.9316 45.1937 28.0351 46.5589 27.7794 48.6686C25.86 49.4134 21.1246 50.7773 18.3101 45.9382C18.3101 45.9382 16.5185 42.9594 13.1911 42.7113C13.1911 42.7113 9.99162 42.7113 13.0633 44.697C13.0633 44.697 13.7504 44.9888 14.6275 45.958C15.2643 46.6618 16.0005 47.723 16.6464 49.2893C16.6464 49.2893 18.5658 54.7489 27.6515 52.7632L27.7794 58.9689C27.7794 59.7136 27.3958 60.4581 25.7321 60.4581Z" fill="white"/>
                </svg>
              </div>
              <div class="card-content">
                <h2>Link Github</h2>
                <p>Create an account<br>to contribute to projects</p>
              </div>
            </div>
          </div>
        </div>

        <div class="section">
          <h2 class="section-title">Paid Accounts</h2>
          <p class="section-description">Some tasks require paid subscriptions, and often have greater rewards.</p>
          <div class="cards-container">
            <div class="card" id="anthropic-card" data-type="claude">
              <div class="card-icon">
                <svg width="67" height="46" viewBox="0 0 67 46" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <rect width="67" height="46" fill="url(#pattern0_13048_3731)"/>
                <defs>
                <pattern id="pattern0_13048_3731" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlink:href="#image0_13048_3731" transform="scale(0.00333333 0.00485507)"/>
                </pattern>
                <image id="image0_13048_3731" width="300" height="206" preserveAspectRatio="none" xlink:href="data:image/png;base64,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"/>
                </defs>
                </svg>

              </div>
              <div class="card-content">
                <h2>Link Anthropic</h2>
                <p>Connect Anthropic's AI Agent to build apps.</p>
              </div>
            </div>

            <div class="card disabled" id="chatgpt-card">
              <div class="card-icon">
                <svg width="71" height="71" viewBox="0 0 71 71" fill="white">
                  <path d="M35.5 0C16 0 0 16 0 35.5C0 55 16 71 35.5 71C55 71 71 55 71 35.5C71 16 55 0 35.5 0ZM47.5 53.25H23.5V47.5H47.5V53.25ZM51.75 41.75H19.25V36H51.75V41.75ZM51.75 30.25H19.25V24.5H51.75V30.25ZM51.75 18.75H19.25V13H51.75V18.75Z"/>
                </svg>
              </div>
              <div class="card-content">
                <h2>Link ChatGPT</h2>
                <p>Coming Soon</p>
              </div>
            </div>

            <div class="card disabled" id="gemini-card">
              <div class="card-icon">
                <svg width="71" height="71" viewBox="0 0 71 71" fill="white">
                  <path d="M35.5 0C16 0 0 16 0 35.5C0 55 16 71 35.5 71C55 71 71 55 71 35.5C71 16 55 0 35.5 0ZM35.5 64C19.9 64 7 51.1 7 35.5C7 19.9 19.9 7 35.5 7C51.1 7 64 19.9 64 35.5C64 51.1 51.1 64 35.5 64Z"/>
                  <path d="M35.5 14C23.6 14 14 23.6 14 35.5C14 47.4 23.6 57 35.5 57C47.4 57 57 47.4 57 35.5C57 23.6 47.4 14 35.5 14ZM35.5 50C27.5 50 21 43.5 21 35.5C21 27.5 27.5 21 35.5 21C43.5 21 50 27.5 50 35.5C50 43.5 43.5 50 35.5 50Z"/>
                </svg>
              </div>
              <div class="card-content">
                <h2>Link Gemini</h2>
                <p>Coming Soon</p>
              </div>
            </div>
          </div>
        </div>

        <div class="secure-footer">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 17C11.4696 17 10.9609 16.7893 10.5858 16.4142C10.2107 16.0391 10 15.5304 10 15C10 13.89 10.89 13 12 13C12.5304 13 13.0391 13.2107 13.4142 13.5858C13.7893 13.9609 14 14.4696 14 15C14 15.5304 13.7893 16.0391 13.4142 16.4142C13.0391 16.7893 12.5304 17 12 17ZM18 20V10H6V20H18ZM18 8C18.5304 8 19.0391 8.21071 19.4142 8.58579C19.7893 8.96086 20 9.46957 20 10V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V10C4 9.46957 4.21071 8.96086 4.58579 8.58579C4.96086 8.21071 5.46957 8 6 8H7V6C7 4.67392 7.52678 3.40215 8.46447 2.46447C9.40215 1.52678 10.6739 1 12 1C12.6566 1 13.3068 1.12933 13.9134 1.3806C14.52 1.63188 15.0712 2.00017 15.5355 2.46447C15.9998 2.92876 16.3681 3.47995 16.6194 4.08658C16.8707 4.69321 17 5.34339 17 6V8H18ZM12 3C11.2044 3 10.4413 3.31607 9.87868 3.87868C9.31607 4.44129 9 5.20435 9 6V8H15V6C15 5.20435 14.6839 4.44129 14.1213 3.87868C13.5587 3.31607 12.7956 3 12 3Z" fill="#2EA44F"/>
          </svg>
          <div class="text">
            <span>No Strings Attached</span>
            <span>This page is secured by Koii, and running 100% on your computer</span>
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