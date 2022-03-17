import { css } from '@linaria/core';

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
css`
  :global() {
    :root {
      --color-purple: #da68f5;
      --color-red: #f25f5b;
      --color-yellow: #f4ce4a;
      --color-green: #3bd05a;
      --color-blue: #0bccf7;
      --color-dark-blue: #042548;
      --color-gray: #8196a4;
      --color-white: white;
      --color-violet: #c061e0;
      --color-orange: #fe7b17;
      --color-corn-flower-blue: #4da3e6
      --color-black: #000000;
      
      --color-rgba-blue: rgba(77,163,230, 0.2)


      --color-popup: white;
      --color-select: #184469;

      --color-disabled: #8da1ad;
    }

    @font-face {
      font-family: 'Visby';
      src: url('/assets/fonts/VisbyRegular.otf');
      font-weight: 400;
      font-style: normal;
    }
    
    @font-face {
      font-family: 'Visby';
      src: url('/assets/fonts/VisbyMedium.otf');
      font-weight: 500;
      font-style: medium;
    }

    @font-face {
      font-family: 'Visby';
      src: url('/assets/fonts/VisbyItalic.otf');
      font-weight: 400;
      font-style: italic;
    }

    @font-face {
      font-family: 'Visby';
      src: url('/assets/fonts/VisbySemiBold.otf');
      font-weight: 600;
      font-style: bold;
    }

    @font-face {
      font-family: 'Visby';
      src: url('/assets/fonts/VisbyBold.otf');
      font-weight: 700;
      font-style: bold;
    }
    @font-face {
      font-family: 'Visby';
      src: url('/assets/fonts/VisbyExtrabold.otf');
      font-weight: 800;
      font-style: extra bold;
    }
    @font-face {
      font-family: 'Visby';
      src: url('/assets/fonts/VisbyHeavy.otf');
      font-weight: 900;
      font-style: heavy bold;
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
      font-family: 'Visby', sans-serif;
    }

    body {
      background-color: rgba(0,0,0, 0.03);
      font-size: 14px;
      color: black;
    }

    p {
      font-weight: 500;
      margin: 0;
      margin-bottom: 24px;
    }

    ul,
    ol {
      list-style: none;
      margin: 0;
      padding: 0;
    }
  }
`;
