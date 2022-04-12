import { css } from '@linaria/core';

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
css`
  :global() {
    :root {
      --color-purple: #da68f5;
      --color-red: #EA0000;
      --color-yellow: #f4ce4a;
      --color-green: #3FD05A ;
      --color-blue: #4DA2E6 ;
      --color-dark-blue: #042548;
      --color-gray: rgba(0,0,0, 0.5);
      --color-white: white;
      --color-violet: #c061e0;
      --color-orange: #FF791F ;
      --color-corn-flower-blue: #4DA2E6
      --color-black: #000000;
      --toastify-toast-min-height: 48px;
      --toastify-toast-max-height: 800px;
      --color-currentRole: gray;
      --color-rgba-blue: rgba(77,163,230, 0.2)


      --color-popup: white;
      --color-select: #184469;

      --color-disabled: #8da1ad;
    }
    
    @font-face {
      font-family: 'VisbyCF';
      src: url('/assets/fonts/VisbyCF-Medium.ttf');
      font-weight: 500;
      font-style: normal;
    }

    @font-face {
      font-family: 'VisbyCF';
      src: url('/assets/fonts/VisbyCF-DemiBold.ttf');
      font-weight: 600;
      font-style: normal;
    }

    @font-face {
      font-family: 'VisbyCF';
      src: url('/assets/fonts/VisbyCF-Bold.ttf');
      font-weight: 700;
      font-style: normal;
    }
    @font-face {
      font-family: 'VisbyCF';
      src: url('/assets/fonts/VisbyCF-ExtraBold.ttf');
      font-weight: 800;
      font-style: normal;
    }
    @font-face {
      font-family: 'VisbyCF';
      src: url('/assets/fonts/VisbyHeavy.otf');
      font-weight: 900;
      font-style: normal;
    }
    
    @font-face {
      font-family: 'SFProDisplay';
      src: url('/assets/fonts/SFProDisplay-Regular.ttf');
      font-weight: 400;
      font-style: normal;
    }

    @font-face {
      font-family: 'SFProDisplay';
      src: url('/assets/fonts/SFProDisplay-RegularItalic.ttf');
      font-weight: 400;
      font-style: italic;
    }

    @font-face {
      font-family: 'SFProDisplay';
      src: url('/assets/fonts/SFUIDisplay-Medium.otf');
      font-weight: 600;
      font-style: normal;
    }

    @font-face {
      font-family: 'SFProDisplay';
      src: url('/assets/fonts/SFProDisplay-Bold.ttf');
      font-weight: 700;
      font-style: normal;
    }

    * {
      box-sizing: border-box;
      outline: none;
    }

    html,
    body {
      margin: 0;
      padding: 0;
    }

    html {
      width: 375px;
      height: 600px;
    }

    html * {
      font-family: 'VisbyCF', sans-serif;
    }

    body {
      background-color: rgba(0,0,0, 0.03);
      font-size: 14px;
      color: black;
    }

    p {
      font-weight: 700;
      margin: 0;
      margin-bottom: 24px;
    }
    b {
      font-weight: 900;
      font-size: 14px;
      line-height: 20px;
    }
    span {
      font-weight: 700;
    }

    ul,
    ol {
      list-style: none;
      margin: 0;
      padding: 0;
    }
  }
`;
