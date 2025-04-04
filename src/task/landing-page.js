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
            position: relative;
            background: transparent;
            border: 1px solid rgba(255, 255, 255, 0.76);
            border-radius: 10px;
            padding: 20px;
            width: 300px;
            height: 75px;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 20px;
            z-index: 1;
          }
          .card:not(.disabled):hover {
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.4),
                        0 0 40px rgba(255, 255, 255, 0.2),
                        0 0 60px rgba(134, 255, 226, 0.2),
                        0 0 80px rgba(134, 255, 226, 0.1);
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
            content: "";
            position: absolute;
            top: -14px;  /* Half of SVG height to center it */
            right: -28px; /* Half of SVG width to center it */
            width: 56px;
            height: 56px;
            background-image: url("data:image/svg+xml,%3Csvg width='56' height='56' viewBox='0 0 56 56' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg filter='url(%23filter0_d_13107_11684)'%3E%3Cpath d='M52 26C52 39.2548 41.2548 50 28 50C14.7452 50 4 39.2548 4 26C4 12.7452 14.7452 2 28 2C41.2548 2 52 12.7452 52 26Z' fill='%239BE7C4'/%3E%3C/g%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M28.1239 10.4322C19.5369 10.3363 12.5283 17.2446 12.4322 25.8386C12.3363 34.4292 19.2474 41.4823 27.8347 41.5302L27.8386 41.5303C36.4292 41.6262 43.4822 34.7151 43.5302 26.1278L43.5303 26.1239C43.6262 17.5333 36.7151 10.4802 28.1278 10.4323L28.1239 10.4322ZM28.1376 9.03231C18.7714 8.92872 11.1369 16.4635 11.0323 25.823C10.9277 35.1859 18.4591 42.8768 27.8249 42.9302C37.187 43.0337 44.8768 35.5028 44.9302 26.1376C45.0337 16.7755 37.5028 9.08569 28.1376 9.03231Z' fill='%239BE7C4'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M34.6651 21.6354C34.9404 21.9068 34.9435 22.35 34.6721 22.6253L26.8348 30.5735C26.1674 31.2503 25.1312 31.2539 24.4599 30.5844L21.1949 27.5241C20.9129 27.2598 20.8985 26.8168 21.1629 26.5347C21.4273 26.2526 21.8703 26.2383 22.1523 26.5027L25.4261 29.5713C25.4329 29.5776 25.4394 29.584 25.4459 29.5905C25.5686 29.7149 25.7152 29.7149 25.8379 29.5905L33.6752 21.6424C33.9466 21.3671 34.3898 21.364 34.6651 21.6354Z' fill='%23171753'/%3E%3Cdefs%3E%3Cfilter id='filter0_d_13107_11684' x='0' y='0' width='56' height='56' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3E%3CfeOffset dy='2'/%3E%3CfeGaussianBlur stdDeviation='2'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0'/%3E%3CfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_13107_11684'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_13107_11684' result='shape'/%3E%3C/filter%3E%3C/defs%3E%3C/svg%3E");
            background-size: contain;
            background-repeat: no-repeat;
            z-index: 2;
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
          }
          .card.disabled:hover {
            opacity: 0.3;
          }
          .card.disabled:hover .disabled-tooltip {
            display: block;
            opacity: 1;
          }
          .disabled-tooltip {
            display: none;
            position: absolute;
            left: calc(100% + 20px);
            top: 50%;
            transform: translateY(-50%);
            background: rgba(255, 255, 255, 0.9);
            border-radius: 4px;
            padding: 8px 12px;
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.4);
            font-family: system-ui, -apple-system, sans-serif;
            color: #41465D;
            font-size: 12px;
            white-space: nowrap;
            z-index: 100;
          }
          .disabled-tooltip::before {
            content: '';
            position: absolute;
            left: -8px;
            top: 50%;
            transform: translateY(-50%);
            width: 0;
            height: 0;
            border-top: 8px solid transparent;
            border-bottom: 8px solid transparent;
            border-right: 8px solid rgba(255, 255, 255, 0.9);
          }
          .header {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 40px;
          }
          
          .header .logo {
            position: fixed;
            top: 28px;
            left: 28px;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          
          .secure-footer {
            position: fixed;
            bottom: 120px;
            left: 40px;
            display: flex;
            align-items: center;
            border-radius: 10px;
            background: rgba(137, 137, 199, 0.15);
            padding: 12px;
            gap: 10px;
            border: none;
            backdrop-filter: blur(100px);
          }
          
          .secure-footer::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 100%;
            border-radius: 10px;
            border-bottom: 1px solid rgba(229, 229, 229, 0.8);
            border-left: 1px solid rgba(229, 229, 229, 0.8);
            border-right: 1px solid rgba(229, 229, 229, 0.8);
            mask-image: linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
            -webkit-mask-image: linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
            pointer-events: none;
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
          .card.completed {
            border: 1px solid var(--Green-1, #49CE8B);
          }
          
          .card.completed .card-content h2,
          .card.completed .card-content p {
            color: var(--Green-1, #9BE7C4);
          }
          .card.highlight {
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.4),
                        0 0 40px rgba(255, 255, 255, 0.2),
                        0 0 60px rgba(134, 255, 226, 0.2),
                        0 0 80px rgba(134, 255, 226, 0.1);
            transition: box-shadow 0.3s ease;
          }
          .tooltip {
            position: absolute;
            left: calc(100% + 20px);
            top: 50%;
            transform: translateY(-50%);
            background: rgba(255, 255, 255, 0.9);
            border-radius: 4px;
            padding: 8px 12px;
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.4),
                        0 0 40px rgba(255, 255, 255, 0.2),
                        0 0 60px rgba(134, 255, 226, 0.2),
                        0 0 80px rgba(134, 255, 226, 0.1);
            font-family: system-ui, -apple-system, sans-serif;
            width: max-content;
            z-index: 1000;
          }
          .step-info {
            position: absolute;
            left: calc(100% + 20px);
            top: 50%;
            transform: translateY(-50%);
            background: rgba(255, 255, 255, 0.9);
            border-radius: 4px;
            padding: 8px 12px;
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.4),
                        0 0 40px rgba(255, 255, 255, 0.2),
                        0 0 60px rgba(134, 255, 226, 0.2),
                        0 0 80px rgba(134, 255, 226, 0.1);
            font-family: system-ui, -apple-system, sans-serif;
            z-index: 1000;
            width: max-content;
          }
          .step-info::before {
            content: '';
            position: absolute;
            left: -8px;
            top: 50%;
            transform: translateY(-50%);
            width: 0;
            height: 0;
            border-top: 8px solid transparent;
            border-bottom: 8px solid transparent;
            border-right: 8px solid rgba(255, 255, 255, 0.9);
          }
          .disabled-tooltip::before {
            content: '';
            position: absolute;
            left: -8px;
            top: 50%;
            transform: translateY(-50%);
            width: 0;
            height: 0;
            border-top: 8px solid transparent;
            border-bottom: 8px solid transparent;
            border-right: 8px solid rgba(255, 255, 255, 0.9);
          }
          .card-container {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
          .card-row {
            position: relative;
            display: flex;
            align-items: center;
          }
          .mandatory-label {
            width: 241px;
            text-align: center;
            color: #FFC78F;
            font-size: 12px;
            font-family: Sora;
            font-weight: 400;
            line-height: 18px;
            margin-left: 30px;
          }
          .card.temp-disabled {
            opacity: 0.3;
            cursor: not-allowed;
          }
          .card.temp-disabled:hover {
            opacity: 1;
            transition: opacity 0.3s ease;
          }
          .card.temp-disabled:hover .disabled-tooltip {
            display: block;
          }
          .card.fully-disabled {
            opacity: 0.3;
            cursor: not-allowed;
            pointer-events: none;
            z-index: 0;
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
          </div>
        </div>

        <h1 class="heading">Get Set Up to Build with Prometheus</h1>
 <div style="text-align: center"><span style="color: rgba(255, 255, 255, 0.80); font-size: 16px; font-family: Sora; font-weight: 400; line-height: 24px; word-wrap: break-word"> To activate Prometheus Builder, connect your tools and unlock full functionality.<br/>Step 1 – Link your </span><span style="color: rgba(255, 255, 255, 0.80); font-size: 16px; font-family: Sora; font-weight: 600; text-decoration: underline; line-height: 24px; word-wrap: break-word; position: relative; cursor: pointer;" class="tooltip-trigger" data-type="github">GitHub account</span><br/><span style="color: rgba(255, 255, 255, 0.80); font-size: 16px; font-family: Sora; font-weight: 400; line-height: 24px; word-wrap: break-word">Step 2 – Add your </span><span style="color: rgba(255, 255, 255, 0.80); font-size: 16px; font-family: Sora; font-weight: 700; text-decoration: underline; line-height: 24px; word-wrap: break-word; position: relative; cursor: pointer;" class="tooltip-trigger" data-type="claude">Anthropic Key (AI Agent)</span><br/><span style="color: rgba(255, 255, 255, 0.80); font-size: 16px; font-family: Sora; font-weight: 400; line-height: 24px; word-wrap: break-word">💡 Link additional items to earn Super Contributor rewards and gain access to advanced features.</span></div>
        
        <div class="section">
          <h2 class="section-title">Free Accounts</h2>
          <p class="section-description">Connect popular tools to complete more tasks and participate in governance.</p>
          <div class="cards-container">
          <div class="card-container">
            <div class="card-row">
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
              <div class="step-info">
                <div style="
                  color: #41465D;
                  font-weight: 700;
                  font-size: 12px;
                  margin-bottom: 1px;
                ">Step 1</div>
                <div style="
                  color: #41465D;
                  font-weight: 500;
                  font-size: 12px;
                ">Log In or Sign Up to your Github account</div>
              </div>
            </div>
            <div class="mandatory-label">*Mandatory for Prometheus Task</div>
          </div>
          </div>
        </div>

        <div class="section">
          <h2 class="section-title">Paid Accounts</h2>
          <p class="section-description">Some tasks require paid subscriptions, and often have greater rewards.</p>
          <div class="cards-container">
          <div class="card-container">
            <div class="card-row">
              <div class="card" id="anthropic-card" data-type="claude">
                <div class="card-icon">
                  <svg width="67" height="46" viewBox="0 0 67 46" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <rect width="67" height="46" fill="url(#pattern0_13048_3731)"/>
                  <defs>
                  <pattern id="pattern0_13048_3731" patternContentUnits="objectBoundingBox" width="1" height="1">
                  <use xlink:href="#image0_13048_3731" transform="scale(0.00333333 0.00485507)"/>
                  </pattern>
                  <image id="image0_13048_3731" width="300" height="206" preserveAspectRatio="none" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAADOCAYAAACEhj9IAAAAAXNSR0IArs4c6QAAExlJREFUeF7tnb+OHMcRxnv2CAJ3iRMDAhwpMnBLLqONTECwAvIBCBCgnNtOnCgxAz2B6Dewc1mAAT2AGYgwQEWM+OcI8AEMEHDC5C66HWPIu+Pe7uxOdXdVd3/dn1J1V898VfV1z+9mh53jf9EKvH379rer1eon59yvo4NlCND3/be3b9/+Z4alvZcE1fp/s9nswfHx8TvvG+aEawp01CNegZOTk7/2ff99fKQ8Ebque3p6evpwuVx+yHMF8lVfvHjxq6Ojo3/1fX9PPiv/yL7v/4CyKeRXa/cV0LAiszM00OHh4XPn3K3IUDmnv1+tVo8Wi8WznBchXfv169ffdF33g3R8CeOQNoUS9Np1DTSsyOwgNs/YLZ+fn//jzp07f4qUI8n0tcdCpE0CalNIksiARWhYAaKtT3n58uXfDw4O/hgZpoTpb87Ozu4iPBYOYiHqjrQplFCQY9dAw4rIzMVO/x/n3BcRYYqZisRZXr169fvZbPYjmPZvCN/jyp2GFaEfOmzfvHUkzkL4HlG4wFNpWIHJqwS2b949FGdB5IdIm0Jga5hOo2EFyovYLJJb7bru8Xw+fyIZm3sM4XvuDKRfn4YVqDki9BXeKuG7UKjQYYTvoco5R8MK0K422L4pAeF7QFH4TSF899PrajQNK0C42mA74XtAEUROQdoUIm9VdToNy1POSmE74btnHcQOJ3wPU5CG5albrbB95JRF+O5ZG57Dof4i63lvZsNpWJ7SVgzbN5UgfPesDd/hhO++ihG6eylWO2wnfPcqB43BhO+eKvKE5SFY7bB9DL7P5/P7HhJlG8o337NJn3RhGpZQ7kZgO+G7sB60hhG++ylJwxLq1QpsJ3wXFoTeMMJ3Dy1pWEKxGoLthO/CmtAaRvguV5KGJdCqNdhO+C4oCt0hhO9CPWlYAqFag+1j8J3ffBcUSsQQvvkuE4+GNaFTo7Cd8F3WP2qjCN9lUtKwJnRqFbYTvssaSHEU4btATBrWhEgNw3bCd0EDaQ4hfJ9Wk4a1R6PWYTvh+3QDKY8gfJ8QlIa1R6DWYfsYfOeb78oWtRGO8H2/vjSsHfqg/tTDtp3c+9ls9hXKP7mOyB8J32lYQT2MWOxBN+o5id989xTMfzjh+x7NeMLaIQ5h+86q4Wdn/E3Iawbh+265aFgj2hC27+8vJM7Cf3DVyyuLH0zDGkkRYfsER+i6p4Tvtr2NtCnYKnE9Og1rQ22+2S4qPyjOgsgjCd/H65CGtaELYnGLLEZ5EOG7sqDb4aA2BXM1LhagYW0oTdguLj3Cd7FUYQMJ37d1o2GtaULY7tdYSJyF8N0vt6WOpmGtZYaw3a9MB85C+O6nme9opE3B995CxtOwLlTjm+0h5cM334NU85hE+M6/Eo6WC2G7RxetDSV8D9PNYxbh+3q9eQhX9VDC9uD0Er4HSyebSPj+WSc+EjrnCNtljbNrFBJnIXy3rQXt6E0aFmG7dhldj0f4bqvvEB1pU9BUoznDAoXtb5xztzQTbxyLb74bC9wqfG/OsABh+/u+77/tuu47JNMifDd2LOeahO/NGRYabL/cSY+Ojv7c9/335m2gtwDhu56Wo5FahO9NGRYibL9kFYhwGImzIOrrnHszm80eHB8fvzP2xmLCN2VYgLD9qiAR2Rvhu32fI20KGmo0Y1iIDb955Af8sgThu0aX7onRGnxvxrAQYftqtXq0WCyeXdbrxSPtT4TvNi6AqK9rDL43Y1iosH25XH5Yb0+0+xg4y9nZ2d3N+7CxnPiogPo29eZ7E4aFCNt3vRaACIeROAuivi3B9yYMCxC272Q/NbC4+HOQXQREfVt68716w0IswKn3a2oyYDvrCY8M+McN1wp8r96wAGH75O/EEOEw33wPN1DhzCbefK/esAAhqghS13pfwuY0Hwao73DKejyfz5+Yi5NxgaoNqybYvlkjNZ4cM/bB1tKo8B3pL7Ih+a7asGpmPTWyuZACtpqDqG8L8L1aw0IsON+fstRsyFZG5BOX8N1HrTRjqzWsFh6Zan7kTVP++1dB/ONG7W++V2tYgNBUBNs3W6yV+8xlYID6Vv3me5WGhXjymHr3alfDIj628M13c/sN2vzMr0phgSoNC5HtbP7QWZrbgdUdHh4+R/pBdKg5SzXRHIfIQmuG79UZFmKBxb6ljGjQs9nsK5QPzyGeYmNrStP0NWNVZ1gtwPYd72T96Jz7QrM4LGMhveRI+G5ZCX6xqzMsQEga/ZlbxFMlPzvj16gho5E2Ben9VWVYLcH2zQQjPrYQvkvbNHhcdfC9KsNCZDmhsH2zhBEfWwjfg41IPBFpU5DcVDWGhfhYpA1GAR+H+c13SZdGjNGusYhLUZlajWEhwnZtxoD4g11tDVS6YkcQxFNsbW++V2NYPF04h3jKJHy3tNhPsZE2hSk1qjCslmH7ZoIBOd7kBwunijjl/0c8xaJtCvvyWYVhsUk/pxjxsYXw3d5ya4Hv8IbFx6DtYufjsa0BIG6QtcB3eMMibN9uTmpia1iIp9ha4Du8YfE0sd2cPHXaGtYQHbDuqoDv0IaFCNt9vyoa2nqIjy1InIXwPbQy4+ZBGxabcnfyEc2c8D2umSWzkTaFsfuBNSw+9kyXJ+BjC9Sb74gbZqoT/nR1ho2ANSzEI3nqEwTiD6KRXnIkfA8znZhZsIaFeHrQ+qGzNOGIXyNFe8kRsA6h4TukYSHymVzvwSA+tiBxFsSTPtqmsL5BQxoWm1B6xnIOsaFSPzrL1azmFRKon0NBGxYqbJ/NZg9yfMMcVC/C9xgXFczNdeIXXNreIXAnLMS3uHOfGAjfY9tk/3zCd1t9oU9YgJDzfWrYvlk+oA0F9XlfwLqEhO9QJyzC9vCdDLGhCN/D8y2cCbUpDPcEZViIsL2U94oI34UtHDgMlBXCwXcYwwItiGLgMfULdCKPaaAb6tP5fH7f4zazDoUxLJ4Q4usEtKEez+fzJ/F3bx8BlBVmZ6w+mYExLDIYn7SOjwVtKCjOglinpWALSYVDGBYibC/1bWLEhiJ8l7Ry1BiYTQHCsPgoE1WM1ybzPTY9LccigbJCGPhevGGBFkAxsH2zqainrWEN0UE3WAj4XrxhIcL20r85BNpQhO+2XgsB34s3LDIX/SolE9TXdDMiYt0iwPeiDYuNZddYiA1F+G5XDxeRi4fvRRsW4qNL7h86S0sa8QfRKNoOOQBlhcXD92INCzThEBzgsqEODw+fO+duSU2ugHHF/jFjTBvEDbd0/lqsYaHC9tPT04fL5fJDAc09eQmgDUX4PpnZqAFFbwrFGhYZS1TRiSZzUxDJFDUIsY5Lhu9FGhbqT0hyfVU0tKNAH7uL5yzr+UDcFEr9lcaga5GGhfioggSE1xuK8D3U7mXzuCnIdJKOKs6wQBMMA9s3CwP0NFs0Z9nUGHEDLhW+F2dYiEdo1A/6XzYWOYt0fw8bx00hTLexWcUZFptHL7nSSIibRMmcZUx31rW0GvePK8qwuBPpJNU3CuhjOOG7b6L9xxf35ntRhoX4rI8K22vgLEjac1Pwd8uiHwmZUJ2Ehkbh6TZUOfk8xA25NPhezAmLHEVe+FYjyVmslP0Ul5tCvL7FGBabJT6ZsREQv0aK9hda1nlclRZhWNx54pKoNZuP5VpK7o7DJ4k4jYswLD7bxyVRczZiLgjfNStgPFYp3yLLbljc1e2LzWcF0I8m8s13nyQHjC0Fvmc3LB6RA6rHeAo5i63ARCDh+mY3LMTmGN6yPj8//yVc9rJn3rhx48u+7++VfZXXr47w3T5bJXx2Jqthge409pXBFYIUKIWzSC6eTxYSlbbHZDUsRMAbJjNnpVCA8N1e5dybQjbDQoXt9iXBFSIUIHyPEE8yNfemkM2wQI/EkpxyTEYFSuAs0tsHRSJZN4VshgUK26W1yHGZFCB8txc+56aQxbBAdxb7SuAKKgqsVquvF4vFM5VgxkFAnzSyfXYmi2ERtht3QePhc3MWH/lRWW4u+J7csFAT5FOEHJtdgaycxffuETfwXJtCcsMCPQL71iDHZ1YgJ2fxvXX+HEquWHLDImyXJ4cjwxUgfA/XTjozx6aQ1LAI26WlwHEaChC+a6i4N0Zy+J7UsBCf1c1TzgXMFMjFWUJuCJXtpobvyQwLNSEhxcc5xShA+G6citSbQjLDImw3rhyGH1UgB2cJTQXh+7RyyQyLsH06GRyhrwDhu76mmxFTbgpJDIuw3b5ouMJuBQjfzasjGXxPYliE7eYFwwX2KJCas8QkA5X1poLv5oaFmoCYouPc4hQgfDdOSapNwdywCNuNK4XhRQqk5CyiC9oziPB9tzjmhkXYHlu+nK+hAOG7hor7Y6TYFEwNi7Ddvki4glwBwne5VoEjzeG7qWERtgemndNMFEjFWTQuHpX9WsN3M8NCFVyj2BijWAUI341TY70pmBkWYbtxZTB8kAIpOEvQhY1MInzfFsXMsAjbtcqWcTQVIHzXVHM8luWmYGJYhO32RcEVwhUgfA/XTjjTDL6bGNbr16+/6bruB+HNcRgVSKqANWfRvBlUFmwF39UNC1VgzSJjrOIVIHw3TpHVpqBuWITtxpXA8CoKWHIWlQtcC0L4/lkMdcMibNcuV8azUIDw3ULV6zEtNgVVwyJsty8CrqCnACB8/1nv7pNEUofvqobFN9uTFAEXUVLAirMoXd61MKhsWBu+qxkWqqAWxcWYMAoQvhunSntTUDMswnbjzDO8iQIWnMXkQp1zhO/OqRkWYbtVmTKupQKE75bqfoqtuSmoGBZhu33SuYKdAoTvdtpeRFaD7yqGxTfbzRPOBQwV0OYshpfqUFmxFnyPNixUAZ1zb87Pz3+xLK4WY9+4cePLvu/vgd074btxwrQ2hWjDQoXtWo5vnGe48Kj1oMlZrJPWMnyPNixQ2P5mNps9OD4+fmddXK3FRz1xE77bV6rGphBlWKiwXet4ap9izBVQmSbhu3m9RcP3KMMCLcz3q9Xq0WKxeGaenkYX4EZmn3jUk2wsigk2LFTB0I7+9qVvswIoKiB8tymHq6ixTzfBhkW4apxZ8PCsD/sEtgjfgw2LO6h9QSKvwBN4muwh9mEMfA8yLDKKNMWIvgro1zugGOfFSbaZz84EGRYobHexwA/dQFJfPzc2e8VRT7KhvehtWKgCDW+2n52d3V0ulx/sy4grXCqA+MjinCN8Ny7hUPjubViEqcaZrCw86COL6hcGrFPaEnz3NizumNblV1d81BM52usviH0ZAt+9DAuVSQzFN5/P79dlBTh3Q/hunyvQk6w3pvEyLMJ2+8KrcQXQRxYXylly5BD1JOsL38WGhSoIYXuO9tleE/GRhfDdvnZ8NwWxYaHCdl9B7FPU5gqop/MQzpIrw6AnWa+/yIoNC3WH5A+dc7XP9XWHE/rh4eFz59ytMq5IdhWE7zKdYkb5bAoiw0KG7aenpw/57lVMOenNJXzX03JXpNrhu8iwUI/zvkDPvpzaXoFYwT7/qKxZ2quThoUqwADb+VVR+wbxWYG15KNW+FjEk6yUNU8aFnfF8MLhzG0FUE/rPpwld95rhu+ThkXYnrv86lqfPDRNPhH7VrIp7DUsFlea4mptFcRmGt7JQvqLM+hJdvLN972GBXrTUD9cbc2shvslZrDPOiovnILvOw0L9YbR3k62L93yVmBtpclJjfB9p2FxF0xTVK2ugthMQ64knKWUnNYI33caFihn4FdFS+mWiesgH02TKMQ+3rcpjBoWajHxh85pmkBrFcRmQoPvtb35PmpYhO1aLck4+xQAbSZ+diZBWe+C71uGRSCaIBtc4qMCwLUG9SsKRF646833LcNChe38qiimCyI2E+F7klob/ezMlmGBcgXC9iQ1pL8I6F+yhr8WPkX6EghiX4/B92uGRdiu35CMOK0AYjOhwXdELj22KVwzLMSbGtpB+kvv6dbhiBwKsO7sVUflhZvw/cqwUG8IbaezL028FVC/Ror2CSNEXrh5GLkyLGTYjsQS8OwkzRUjNhPhe5LauAbfrwwLlCMQtiepGftFuGHaazysgNjn6/D9o2Ehw3Z+VTRNoVuvQiRhrfCn+KC88OqzMx8NC/QmCNvT1HiyVViH9lKjbgyr1errxWLxrEO9AcJ2++JOvQJP+mkUR+SFl/C9IztIUyRcRaYAImMhfJflNnLUR/jesUAiZeR0VQW4garKuTMYYt8Pp6zu5OTk333f/yaNTDqrdF33367r/nJ8fPxOJyKjlKLAgChu3rz5t4ODg9+Vck2S60CryQte+J3k3koZM2j8f9oPZtTEpy0LAAAAAElFTkSuQmCC"/>
                  </defs>
                  </svg>

                </div>
                <div class="card-content">
                  <h2>Link Anthropic</h2>
                  <p>Connect Anthropic's AI Agent to build apps.</p>
                </div>
                <div class="disabled-tooltip">You have to complete step 1 first</div>
              </div>
              <div class="step-info">
                <div style="
                  color: #41465D;
                  font-weight: 700;
                  font-size: 12px;
                  margin-bottom: 1px;
                ">Step 2</div>
                <div style="
                  color: #41465D;
                  font-weight: 500;
                  font-size: 12px;
                ">Log In or Sign Up to your Anthropic account</div>
              </div>
            </div>
            <div class="mandatory-label">*Mandatory for Prometheus Task</div>
          </div>

            <div class="card fully-disabled" id="chatgpt-card">
              <div class="card-icon">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMdM9MEQ0ExL1PmInT3U5I8v63YXBEdoIT0Q&s" 
                     alt="ChatGPT Logo"
                     width="71"
                     height="71" />
              </div>
              <div class="card-content">
                <h2>Link ChatGPT</h2>
                <p>Coming Soon</p>
              </div>
            </div>

            <div class="card fully-disabled" id="gemini-card">
              <div class="card-icon">
                <img src="https://www.pngall.com/wp-content/uploads/16/Google-Gemini-Logo-Transparent-thumb.png"
                     alt="Gemini Logo"
                     width="71"
                     height="71" />
              </div>
              <div class="card-content">
                <h2>Link Gemini</h2>
                <p>Coming Soon</p>
              </div>
            </div>
          </div>
        </div>

        <div class="secure-footer">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32.9683 19.7798H15.0825C13.1286 19.7798 11.5254 21.3643 11.5254 23.2955V36.7641C11.5254 38.6952 13.1286 40.2798 15.0825 40.2798H32.9683C34.9222 40.2798 36.5254 38.6952 36.5254 36.7641V23.2955C36.5254 21.3643 34.9222 19.7798 32.9683 19.7798Z" fill="#9BE7C4"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M24.0414 25.8521C23.0711 25.8521 22.2667 26.6545 22.2667 27.6522C22.2667 28.6498 23.0711 29.4521 24.0414 29.4521H24.092C25.0623 29.4521 25.8667 28.6498 25.8667 27.6522C25.8667 26.6545 25.0623 25.8521 24.092 25.8521H24.0414ZM20.8667 27.6522C20.8667 25.8947 22.2845 24.4521 24.0414 24.4521H24.092C25.8489 24.4521 27.2667 25.8947 27.2667 27.6522C27.2667 29.4096 25.8489 30.8521 24.092 30.8521H24.0414C22.2845 30.8521 20.8667 29.4096 20.8667 27.6522Z" fill="#353570"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.7749 14.9764C15.7749 10.3322 19.6545 6.56039 24.3574 6.77907L24.3594 6.77917C28.8041 6.99861 32.1749 10.7766 32.1749 15.1764V19.2751H33.9749C35.7613 19.2751 37.1749 20.6881 37.1749 22.4745V37.4707C37.1749 39.2571 35.7613 40.67 33.9749 40.67H13.9749C12.1885 40.67 10.7749 39.2571 10.7749 37.4707V22.4745C10.7749 20.6881 12.1885 19.2751 13.9749 19.2751H15.7749V14.9764ZM17.1749 19.2751H30.7749V15.1764C30.7749 11.4785 27.9462 8.35849 24.2914 8.17751C20.3948 7.99689 17.1749 11.1232 17.1749 14.9764V19.2751ZM13.9749 20.6751C12.9613 20.6751 12.1749 21.4616 12.1749 22.4745V37.4707C12.1749 38.4836 12.9613 39.27 13.9749 39.27H33.9749C34.9885 39.27 35.7749 38.4836 35.7749 37.4707V22.4745C35.7749 21.4616 34.9885 20.6751 33.9749 20.6751H13.9749Z" fill="#9BE7C4"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M24.0271 29.6516C24.4137 29.6516 24.7271 29.965 24.7271 30.3516V36.3516C24.7271 36.7382 24.4137 37.0516 24.0271 37.0516C23.6405 37.0516 23.3271 36.7382 23.3271 36.3516V30.3516C23.3271 29.965 23.6405 29.6516 24.0271 29.6516Z" fill="#353570"/>
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

          // Add back the updateCardStatus function
          function updateCardStatus() {
            const githubCard = document.getElementById('github-card');
            const anthropicCard = document.getElementById('anthropic-card');
            
            if (window.dbValues?.github?.token && window.dbValues?.github?.username) {
              githubCard.classList.add('completed');
            } else {
              githubCard.classList.remove('completed');
              // Make sure Anthropic is disabled if Github isn't completed
              anthropicCard.classList.add('temp-disabled');
            }
            
            if (window.dbValues?.claude) {
              anthropicCard.classList.add('completed');
            } else {
              anthropicCard.classList.remove('completed');
            }

            // Update UI state
            updateUIState();
          }

          // Update click handler for cards
          document.querySelectorAll('.card:not(.fully-disabled)').forEach(card => {
            card.addEventListener('click', async () => {
              if (card.classList.contains('temp-disabled')) {
                return;
              }
              
              if (window.flowInProgress) {
                alert('⚠️ Please finish the ongoing flow first before starting another one.');
                return;
              }

              const cardType = card.id.replace('-card', '');
              console.log('Card clicked:', cardType);

              try {
                const response = await fetch(\`/task//api/card-click/\${cardType}\`, {
                  method: 'POST',
                });
                const data = await response.json();
                
                if (!data.success) {
                  console.error('Error:', data.error);
                }
              } catch (error) {
                console.error('Error:', error);
              }
            });
          });

          // Update click handler for text triggers
          document.querySelectorAll('.tooltip-trigger').forEach(trigger => {
            // Determine which card to highlight based on data-type
            let cardToHighlight;
            if (trigger.dataset.type === 'github') {
              cardToHighlight = document.getElementById('github-card');
            } else if (trigger.dataset.type === 'claude') {
              cardToHighlight = document.getElementById('anthropic-card');
            }
            
            trigger.addEventListener('mouseenter', () => {
              if (cardToHighlight) {
                cardToHighlight.classList.add('highlight');
              }
            });
            
            trigger.addEventListener('mouseleave', () => {
              if (cardToHighlight) {
                cardToHighlight.classList.remove('highlight');
              }
            });

            trigger.addEventListener('click', () => {
              const cardType = trigger.dataset.type;
              const card = document.getElementById(cardType + '-card');
              
              // Don't trigger flow if corresponding card is temporarily disabled
              if (card.classList.contains('temp-disabled')) {
                alert('⚠️ Please complete Step 1 (Link Github) first before proceeding to Step 2.');
                return;
              }
              
              if (flowState.inProgress) {
                alert('⚠️ Please finish the ongoing flow first before starting another one.');
                return;
              }

              flowState = {
                inProgress: true,
                selectedCard: cardType
              };
            });
          });

          // Expose only what's needed for the task manager
          Object.defineProperty(window, 'lastClickedCard', {
            get: () => flowState.selectedCard,
            set: (value) => {
              flowState.selectedCard = value;
              flowState.inProgress = value !== undefined;
            }
          });

          // Function to update UI state based on completion status
          function updateUIState() {
            const githubCard = document.getElementById('github-card');
            const anthropicCard = document.getElementById('anthropic-card');
            const githubStepInfo = githubCard.parentElement.querySelector('.step-info');
            const anthropicStepInfo = anthropicCard.parentElement.querySelector('.step-info');
            
            const isGithubCompleted = githubCard.classList.contains('completed');
            
            if (!isGithubCompleted) {
              githubStepInfo.style.display = 'block';
              anthropicCard.classList.add('temp-disabled');
              anthropicStepInfo.style.display = 'none';
            } else {
              githubStepInfo.style.display = 'none';
              anthropicCard.classList.remove('temp-disabled');
              if (!anthropicCard.classList.contains('completed')) {
                anthropicStepInfo.style.display = 'block';
              } else {
                anthropicStepInfo.style.display = 'none';
              }
            }
          }

          // Update card status when page loads
          document.addEventListener('DOMContentLoaded', () => {
            // Make sure Anthropic card starts disabled
            const anthropicCard = document.getElementById('anthropic-card');
            anthropicCard.classList.add('temp-disabled');
            
            updateCardStatus();
          });
        </script>
      </body>
    </html>
  `;
}
