import { Redirect, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import Dummy from "../../pages/Dummy";
import theme from "../../theme/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route path="/" exact>
          <Dummy />
        </Route>
        <Route path="/login">
          <Dummy />
        </Route>
        <Route path="/interview">
          <Dummy />
        </Route>
        <Route path="/project/:id">
          <Dummy />
        </Route>
        <Route path="/search">
          <Dummy />
        </Route>
        <Route path="/result/:id">
          <Dummy />
        </Route>
        <Redirect to="/login" />
      </Switch>
    </ThemeProvider>
  );
}

export default App;
