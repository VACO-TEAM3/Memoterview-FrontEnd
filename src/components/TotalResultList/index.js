import React from "react";
import styled from "styled-components";

import TotalResultEntry from "./TotalResultEntry";
import TotalResultListHeader from "./TotalResultListHeader";

const TotalResultListWrapper = styled.div`
  width: 100%;
`;

export default function TotalResultList({
  interviewees,
  onFilterBtnClick,
  onFilterSortBtnClick,
  filters,
}) {
  return (
    <TotalResultListWrapper>
      <TotalResultListHeader
        columnList={filters}
        onFilterSortBtnClick={onFilterSortBtnClick}
        onFilterBtnClick={onFilterBtnClick}
      />
      <TotalResultEntry interviewees={interviewees} columnList={filters} />
    </TotalResultListWrapper>
  );
}
