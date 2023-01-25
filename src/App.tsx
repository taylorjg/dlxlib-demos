import { createTheme, CssBaseline, ThemeProvider } from "@mui/material"
import { Global } from "@emotion/react"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

import { HomePage } from "./Pages/HomePage"
import { DemoPage } from "./Pages/DemoPage"
import { GlobalStyles, StyledContainer } from "./App.styles"

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
            <Route path="/demo" exact>
              <DemoPage />
            </Route>
          </Switch>
        </Router>
      </StyledContainer>
    </ThemeProvider>
  )
}
