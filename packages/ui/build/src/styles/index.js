import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { css, Global, useTheme } from "@emotion/react";
const normalize = css `
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
  }

  body {
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  a {
    color: unset;
  }

  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }

  input,
  button,
  textarea,
  select {
    all: unset;
    font: inherit;
    box-sizing: border-box;
  }

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
  }

  p {
    text-wrap: pretty;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    text-wrap: balance;
  }

  #root {
    isolation: isolate;
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;
const scrollbar = (theme) => css `
  .windows ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
    background: ${theme.controls.dim.base};
  }

  .windows ::-webkit-scrollbar-thumb {
    background: ${theme.controls.solid.activeHover};
    border-radius: 4px;
  }

  .windows ::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 4px;
  }

  .windows ::-webkit-scrollbar-corner {
    background: transparent;
  }

  .firefox {
    scrollbar-width: thin;
  }
`;
const globalStyles = (theme) => css `
  ${normalize}
  ${scrollbar(theme)}

  /* Responsive UI scaling using CSS custom property + rem */
  /* All rem values scale proportionally with --ui-scale */
  /* Base: 1280px = 1x, scales up proportionally */
  :root {
    --ui-scale: 1.1;
  }

  /* 1440px+ screens */
  @media (min-width: 1440px) {
    :root {
      --ui-scale: 1.1; /* 1440/1280 */
    }
  }

  /* 1680px+ screens */
  @media (min-width: 1680px) {
    :root {
      --ui-scale: 1.1; /* 1680/1280 */
    }
  }

  /* 1920px+ screens (1080p) */
  @media (min-width: 1920px) {
    :root {
      --ui-scale: 1.2; /* 1920/1280 */
    }
  }

  /* 2560px+ screens (1440p) */
  @media (min-width: 2560px) {
    :root {
      --ui-scale: 1.5; /* 2560/1280 */
    }
  }

  /* 3840px+ screens (4K) */
  @media (min-width: 3840px) {
    :root {
      --ui-scale: 3; /* 3840/1280 */
    }
  }

  html {
    /* Base font-size scales with --ui-scale, affects all rem values */
    font-size: calc(16px * var(--ui-scale));
  }

  body {
    font-family: ${theme.fontFamilies1.secondary};
    font-size: 0.875rem; /* 14px at base, scales with root */
    font-weight: 400;

    background-color: ${theme.surfaces.themeBasePalette.background};
    color: ${theme.text.high};
  }

  ::selection {
    background-color: ${theme.text.tint.secondary};
    color: ${theme.buttons.primary.medium.onButton};
  }
`;
export const GlobalStyles = () => {
    const theme = useTheme();
    return _jsx(Global, { styles: globalStyles(theme) });
};
