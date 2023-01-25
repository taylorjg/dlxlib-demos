import { createTheme, Container, CssBaseline, ThemeProvider } from "@mui/material"
import { Global } from "@emotion/react"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

import { HomePage } from "./Pages/HomePage"
import { DemoPage } from "./Pages/DemoPage"
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
      </Container>
    </ThemeProvider>
  )
}
