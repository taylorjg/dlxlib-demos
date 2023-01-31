import { createTheme, CssBaseline, ThemeProvider } from "@mui/material"
import { Global } from "@emotion/react"
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom"

import * as Sudoku from "demos/sudoku"
import * as NQueens from "demos/n-queens"
import { PlaceholderDrawing } from "pages/demo-page/placeholder-drawing"
import { HomePage } from "pages/home-page"
import { DemoPage } from "pages/demo-page"
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
            <Route path="/demo/sudoku" exact>
              <DemoPage
                shortName="sudoku"
                puzzle={Sudoku.puzzles[0]}
                Drawing={Sudoku.SudokuDrawing}
              />
            </Route>
            <Route path="/demo/n-queens" exact>
              <DemoPage
                shortName="n-queens"
                puzzle={NQueens.puzzles[NQueens.puzzles.length - 1]}
                Drawing={NQueens.NQueensDrawing}
              />
            </Route>
            <Route path="/demo/:shortName" exact>
              <DemoPage
                puzzle={{}}
                Drawing={PlaceholderDrawing}
              />
            </Route>
          </Switch>
        </Router>
      </StyledContainer>
    </ThemeProvider>
  )
}
