import { css } from "@emotion/react";

export const GlobalStyles = css`
  body,
  html,
  #root {
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh; /* fallback if dvh on next line is not recognised */
    height: 100dvh;
  }
`;
