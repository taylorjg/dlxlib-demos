import { createTheme, Container, CssBaseline, ThemeProvider } from "@mui/material"
import { Global } from "@emotion/react"

import { HomePage } from "./Pages/HomePage"
import { GlobalStyles } from "./App.styles"

const darkTheme = createTheme({
  palette: {
    mode: "dark"
  }
})

export const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Global styles={GlobalStyles} />
      <CssBaseline />
      <Container sx={{ mt: "2rem" }}>
        <HomePage />
      </Container>
    </ThemeProvider>
  )
}
