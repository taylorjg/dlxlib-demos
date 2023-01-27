import { createTheme, CssBaseline, ThemeProvider } from "@mui/material"
import { Global } from "@emotion/react"
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom"

import { HomePage } from "./pages/home-page"
import { DemoPage } from "./pages/demo-page"
import { GlobalStyles, StyledContainer } from "./app.styles"

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
      <StyledContainer>
        <Router>
          <Switch>
            <Route path="/" exact>
              <HomePage />
            </Route>
            <Route path="/demo/:id" exact>
              <DemoPage />
            </Route>
          </Switch>
        </Router>
      </StyledContainer>
    </ThemeProvider>
  )
}
