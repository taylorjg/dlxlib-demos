import { createTheme, CssBaseline, ThemeProvider } from "@mui/material"
import { Global } from "@emotion/react"
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom"

import * as Sudoku from "demos/sudoku"
import * as NQueens from "demos/n-queens"
import * as FlowFree from "demos/flow-free"
import * as Kakuro from "demos/kakuro"
import * as Placeholder from "demos/placeholder"
import { HomePage } from "pages/home-page"
import { DemoPage } from "pages/demo-page"
import { GlobalStyles, StyledContainer } from "./app.styles"
import { first, last } from "utils"

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
            <Route path="/demo/sudoku" exact>
              <DemoPage
                shortName="sudoku"
                puzzle={first(Sudoku.puzzles)}
                Drawing={Sudoku.Drawing}
              />
            </Route>
            <Route path="/demo/n-queens" exact>
              <DemoPage
                shortName="n-queens"
                puzzle={last(NQueens.puzzles)}
                Drawing={NQueens.Drawing}
              />
            </Route>
            <Route path="/demo/flow-free" exact>
              <DemoPage
                shortName="flow-free"
                puzzle={first(FlowFree.puzzles)}
                Drawing={FlowFree.Drawing}
              />
            </Route>
            <Route path="/demo/kakuro" exact>
              <DemoPage
                shortName="kakuro"
                puzzle={first(Kakuro.puzzles)}
                Drawing={Kakuro.Drawing}
              />
            </Route>
            <Route path="/demo/:shortName" exact>
              <DemoPage
                puzzle={{}}
                Drawing={Placeholder.Drawing}
              />
            </Route>
          </Switch>
        </Router>
      </StyledContainer>
    </ThemeProvider>
  )
}
