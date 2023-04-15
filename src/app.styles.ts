import { css } from "@emotion/react";

export const GlobalStyles = css`
  body,
  html,
  #root {
    margin: 0;
    padding: 0;
    width: 100vw; /* fallback */
    width: 100dvw;
    height: 100vh; /* fallback */
    height: 100dvh;
  }
`;
