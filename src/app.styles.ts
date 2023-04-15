import { css } from "@emotion/react";

export const GlobalStyles = css`
  body,
  html,
  #root {
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh; /* fallback */
    @supports (height: 100dvh) {
      height: 100dvh;
    }
  }
`;
