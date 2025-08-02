import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Global } from "@emotion/react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import * as Sudoku from "demos/sudoku";
import * as Pentominoes from "demos/pentominoes";
import * as DraughtboardPuzzle from "demos/draughtboard-puzzle";
import * as NQueens from "demos/n-queens";
import * as TetraSticks from "demos/tetrasticks";
import * as AztecDiamond from "demos/aztec-diamond";
import * as RippleEffect from "demos/ripple-effect";
import * as FlowFree from "demos/flow-free";
import * as Kakuro from "demos/kakuro";
import * as Nonogram from "demos/nonogram";
import * as Crossword from "demos/crossword";
import * as AristotleNumbers from "demos/aristotle-numbers";
import * as Placeholder from "demos/placeholder";
import { HomePage } from "pages/home-page";
import { Header } from "header";
import { GlobalStyles } from "app.styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Global styles={GlobalStyles} />
      <CssBaseline />
      <Header />
      <Router>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/demo/sudoku" exact>
            <Sudoku.DemoPage />
          </Route>
          <Route path="/demo/pentominoes" exact>
            <Pentominoes.DemoPage />
          </Route>
          <Route path="/demo/draughtboard-puzzle" exact>
            <DraughtboardPuzzle.DemoPage />
          </Route>
          <Route path="/demo/n-queens" exact>
            <NQueens.DemoPage />
          </Route>
          <Route path="/demo/tetrasticks" exact>
            <TetraSticks.DemoPage />
          </Route>
          <Route path="/demo/aztec-diamond" exact>
            <AztecDiamond.DemoPage />
          </Route>
          <Route path="/demo/ripple-effect" exact>
            <RippleEffect.DemoPage />
          </Route>
          <Route path="/demo/flow-free" exact>
            <FlowFree.DemoPage />
          </Route>
          <Route path="/demo/kakuro" exact>
            <Kakuro.DemoPage />
          </Route>
          <Route path="/demo/nonogram" exact>
            <Nonogram.DemoPage />
          </Route>
          <Route path="/demo/crossword" exact>
            <Crossword.DemoPage />
          </Route>
          <Route path="/demo/aristotle-numbers" exact>
            <AristotleNumbers.DemoPage />
          </Route>
          <Route path="/demo/:shortName" exact>
            <Placeholder.DemoPage />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};
