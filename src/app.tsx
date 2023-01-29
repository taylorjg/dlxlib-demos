import { createTheme, CssBaseline, ThemeProvider } from "@mui/material"
import { Global } from "@emotion/react"
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom"

import { SudokuDrawing } from "demos/sudoku/drawing"
import { NQueensDrawing } from "demos/n-queens/drawing"
import { PlaceholderDrawing } from "pages/demo-page/placeholder-drawing"
import { HomePage } from "pages/home-page"
import { DemoPage } from "pages/demo-page"
import { GlobalStyles, StyledContainer } from "./app.styles"
import { NQueensDemo } from "demos/n-queens/demo"
import { IDemo } from "types"

const darkTheme = createTheme({
  palette: {
    mode: "dark"
  }
})

class NullDemo<TInternalRow> implements IDemo<TInternalRow> {
  buildInternalRows(): TInternalRow[] {
    return []
  }
  internalRowToMatrixRow(internalRow: TInternalRow): number[] {
    return []
  }
  getNumPrimaryColumns(): number | undefined {
    return undefined
  }
}

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
              <DemoPage demo={new NullDemo<{}>()} Drawing={SudokuDrawing} shortName="sudoku" />
            </Route>
            <Route path="/demo/n-queens" exact>
              <DemoPage demo={new NQueensDemo()} Drawing={NQueensDrawing} shortName="n-queens" />
            </Route>
            <Route path="/demo/:shortName" exact>
              <DemoPage demo={new NullDemo<{}>()} Drawing={PlaceholderDrawing} />
            </Route>
          </Switch>
        </Router>
      </StyledContainer>
    </ThemeProvider>
  )
}
