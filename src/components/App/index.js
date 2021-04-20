import { Redirect, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import LoginPageContainer from "../../containers/LoginPageContainer";
import ProjectsContainer from "../../containers/ProjectsContainer";
import Layout from "../../Layout";
import theme from "../../Layout/theme/theme";
import Dummy from "../../pages/dummy";
import Interview from "../../pages/Interview";
import Projects from "../../pages/Projects";
import VoiceToTextTestPage from "../../pages/VoiceToTextTestPage";
import AuthRoute from "../AuthRoute";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route path="/" exact>
          <LoginPageContainer />
        </Route>
        <AuthRoute path="/projects">
          <ProjectsContainer />
        </AuthRoute>
        <AuthRoute path="/projects/:id">
          <Dummy />
        </AuthRoute>
        <AuthRoute path="/result/:id">
          <Dummy />
        </AuthRoute>
        <AuthRoute path="/interview">
          <Dummy />
        </AuthRoute>
        <AuthRoute path="/search">
          <Dummy />
        </AuthRoute>
        <Redirect to="/" />
      </Switch>
    </ThemeProvider>
  );
}

export default App;
