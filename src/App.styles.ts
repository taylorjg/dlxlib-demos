import { Container } from "@mui/material"
import styled from "@emotion/styled"
import { css } from "@emotion/react"

export const GlobalStyles = css`
  body, html, #root {
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
  }
`

export const StyledContainer = styled(Container)`
  width: 100%;
  height: 100%;
`;
