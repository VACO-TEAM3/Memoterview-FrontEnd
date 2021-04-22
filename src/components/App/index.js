import { Redirect, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import IntervieweePageContainer from "../../containers/IntervieweePageContainer";
import InterviewContainerHelper from "../../containers/interviewContainerHelper";
import InterviewPageContainer from "../../containers/InterviewPageContainer";
import LoginPageContainer from "../../containers/LoginPageContainer";
import ProjectsContainer from "../../containers/ProjectsContainer";
import TotalResultContainer from "../../containers/TotalResultContainer";
import WelcomeContainer from "../../containers/WelcomeContainer";
import theme from "../../Layout/theme/theme";
import Dummy from "../../pages/dummy";
import Projects from "../../pages/Projects";
import VoiceToTextTestPage from "../../pages/VoiceToTextTestPage";
import AuthRoute from "../AuthRoute";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route path="/" exact>
          <LoginPageContainer />
        </Route>
        <Route path="/welcome/:projectId/:intervieweeId" exact>
          <WelcomeContainer />
        </Route>
        <AuthRoute path="/projects">
          <ProjectsContainer />
        </AuthRoute>
        <AuthRoute path="/interview/:projectId/:intervieweeId">
          <InterviewPageContainer />
        </AuthRoute>
        <AuthRoute path="/interviewee">
          <IntervieweePageContainer />
        </AuthRoute>
        <AuthRoute path="/result/:id">
          <TotalResultContainer />
        </AuthRoute>
        <AuthRoute path="/interview/:projectId/:intervieweeId">
          <InterviewContainerHelper />
        </AuthRoute>
        <AuthRoute path="/search">
          <Dummy />
        </AuthRoute>
        <AuthRoute path="/voiceTest">
          <VoiceToTextTestPage />
        </AuthRoute>
        <Redirect to="/" />
      </Switch>
    </ThemeProvider>
  );
}
