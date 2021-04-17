import React from "react";
import styled from "styled-components";

import ProjectsSideNavMenu from "../ProjectsSideNavMenu";
import UserInfo from "../UserInfo";

const ProjectsSideNavBarWrapper = styled.div`
  position: relative;
  padding: 60px 30px;
  background-color: ${({ theme }) => theme.SideBarBackground};
`;

const LogoutBtn = styled.div`
  position: absolute;
  left: 0;
  bottom: 60px;
  width: 100%;
  text-align: center;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.Aero};
  }
`;

export default function ProjectsSideNavBar({ userInfo, onSideMenuChange, onLogoutBtnClick }) {
  return (
    <ProjectsSideNavBarWrapper>
      <UserInfo userInfo={userInfo}/>
      <ProjectsSideNavMenu onMenuChange={onSideMenuChange}/>
      <LogoutBtn onClick={onLogoutBtnClick}>Logout</LogoutBtn>
    </ProjectsSideNavBarWrapper>
  );
}
