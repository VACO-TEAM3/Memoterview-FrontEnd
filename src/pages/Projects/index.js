import React from "react";
import styled from "styled-components";

import ProjectsContent from "../../components/ProjectsContent";
import ProjectsSideNavBar from "../../components/ProjectsSideNavBar";

const SplitLayout = styled.div`
  display: grid;
  grid-template-columns: 300px .75fr;
  height: 100vh;
`;

export default function Projects() {
  const userInfoSample = {
    userName: "최하영",
    userEmail: "hayeong28@naver.com",
  };

  return (
    <SplitLayout>
      <ProjectsSideNavBar userInfo={userInfoSample}/>
      <ProjectsContent />
    </SplitLayout>
  );
}
