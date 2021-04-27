import {
  faChevronLeft,
  faFile,
  faQuestion,
  faVideo,
  faVideoSlash,
  faVolumeMute,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import styled from "styled-components";

import CircleButton from "../../components/CircleButton";
import InterviewButton from "../../components/InterviewButton";
import IntervieweeResumeModalView from "../../components/IntervieweeResumeModalView";
import InterviewMenuButton from "../../components/InterviewMenuButton";
import InterviewQuestionModalView from "../../components/InterviewQuestionModalView";
import InterviewRightTab from "../../components/InterviewRightTab";
import InterviewTab from "../../components/InterviewTab";
import InterviewTotalEvaluationModalView from "../../components/InterviewTotalEvaluationModalView";
import Modal from "../../components/Modal";
import Profile from "../../components/Profile";
import QuestionBoard from "../../components/QuestionBoard";
import StyledSideBar from "../../components/shared/StyledSideBar";
import StyledVideoBottomBar from "../../components/shared/StyledVideoBottomBar";
import Timer from "../../components/Timer";
import VideoContent from "../../components/VideoContent";
import { INTERVIEW_STATE } from "../../constants/recordState";
import { getBorderColor } from "./helper";

const ScriptWrapper = styled.div`
  position: fixed;
  right: 0;
  top: 90px;
  background-color: yellow;
`;

const QuestionWrapper = styled.div`
  position: fixed;
  right: 0;
  background-color: green;
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  margin: 0;
  justify-content: center;
  justify-items: center;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(50deg, #1572b2, #8cced7) fixed;
`;

const InterviewContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: fixed;
  width: 60%;
  height: 82%;
  background: white;
  border-radius: 20px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);

  border: ${({ borderColor }) => borderColor ? `5px solid ${borderColor}` : `5px solid red`};
`;

export default function Interview({
  user,
  userData,
  intervieweeData,
  interviewers,
  isButtonDisabled,
  recordStateType,
  visibilityRecordStateType,
  isInterviewee,
  onAudioBtnClick,
  onVideoBtnClick,
  onProcessBtnClick,
  onQuestionModalClose,
  onIntervieweeResumeShowingBtnClick,
  onQuestionRateChange,
  project,
  onTotalRateChange,
  onFilterRateChange,
  onCommentChange,
  onResultSubmit,
  onTotalResultModalClose,
  isQuestionModalOn,
  isTotalResultModalOn,
  onBackButtonClick,
  onQuestionSubmit,
  time,
}) {
  // 이 부분들은 컨테이너로 다 빠질 것입니다. 컨테이너에서 소켓 작업을 하기 위해 임의로 올리지 않았습니다.
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);

  const [isResumeOpened, setIsResumeOpened] = useState(false);
  const [isQuestionBoardOpened, setIsQuestionBoardOpened] = useState(false);
  const [isScriptBoardOpened, setIsScriptBoardOpened] = useState(false);

  const [question, setQuestion] = useState("");
  const [questions, setQuestions] = useState([]);
<<<<<<< HEAD

=======
  const [isQuestionBoardOpen, setIsQuestionBoardOpen] = useState(false);

  const interviewContentBorderColor = getBorderColor(visibilityRecordStateType);
  console.log(visibilityRecordStateType, interviewContentBorderColor);
>>>>>>> [ADD] apply visibleRecordState, change interview content border color
  function handleAudio() {
    onAudioBtnClick(isAudioOn);
    setIsAudioOn((prev) => !prev);
  }

  function handleVideo() {
    onVideoBtnClick(isVideoOn);
    setIsVideoOn((prev) => !prev);
  }

  function handleOpenScriptBoardButton() {
    setIsScriptBoardOpened((prev) => !prev);
  }

  function handleOpenResumeButton() {
    setIsResumeOpened((prev) => !prev);
  }

  function handleOpenQuestionBoard() {
    setIsQuestionBoardOpened((prev) => !prev);
  }

  function handleQuestionSubmit(ev) {
    ev.preventDefault();

    setQuestions((prev) => [...prev, question]);
    setQuestion("");
  }

  function handleQuestionInputChange(ev) {
    const {
      target: { value },
    } = ev;

    setQuestion(value);
  }

  return (
    <>
      {isTotalResultModalOn && (
        <Modal onBackgroundClick={onTotalResultModalClose}>
          <InterviewTotalEvaluationModalView
            filters={project?.filters}
            onTotalRateChange={onTotalRateChange}
            onFilterRateChange={onFilterRateChange}
            onCommentChange={onCommentChange}
            onResultSubmit={onResultSubmit}
          />
        </Modal>
      )}
      {isQuestionModalOn && (
        <Modal>
          <InterviewQuestionModalView
            onRateChange={onQuestionRateChange}
            onResultSubmit={onQuestionSubmit}
          />
        </Modal>
      )}
      <PageWrapper>
        <StyledSideBar>
          <InterviewMenuButton
            name="BACK"
            onClick={onBackButtonClick}
            icon={faChevronLeft}
          />
          <InterviewTab
            tabName="Resume"
            tabIcon={faFile}
            onClick={handleOpenResumeButton}
            isOpened={isResumeOpened}
          >
            <IntervieweeResumeModalView resume={intervieweeData.resumePath} />
          </InterviewTab>
        </StyledSideBar>
        <Profile />
        <Timer time={time} />
        <InterviewContent borderColor={interviewContentBorderColor}>
          <VideoContent interviewers={interviewers} user={user} />
          <StyledVideoBottomBar>
            <CircleButton
              onClick={handleAudio}
              isClicked={isAudioOn}
              clickedState={faVolumeMute}
              unClickedState={faVolumeUp}
            />
            {!isInterviewee &&
              <InterviewButton
                isButtonDisabled={isButtonDisabled}
                onClick={onProcessBtnClick}
                state={INTERVIEW_STATE[recordStateType]}
              />
            }
            <CircleButton
              onClick={handleVideo}
              isClicked={isVideoOn}
              clickedState={faVideoSlash}
              unClickedState={faVideo}
            />
          </StyledVideoBottomBar>
        </InterviewContent>
        <ScriptWrapper>
          <InterviewRightTab
            tabName="Script"
            tabIcon={faFile}
            onClick={handleOpenScriptBoardButton}
            isOpened={isScriptBoardOpened}
          >
            <div height="1000px">Script section</div>
          </InterviewRightTab>
        </ScriptWrapper>
        <QuestionWrapper>
          <InterviewRightTab
            tabName="Questions"
            tabIcon={faQuestion}
            onClick={handleOpenQuestionBoard}
            isOpened={isQuestionBoardOpened}
          >
            <QuestionBoard
              question={question}
              questions={questions}
              onChange={handleQuestionInputChange}
              onSubmit={handleQuestionSubmit}
            />
          </InterviewRightTab>
        </QuestionWrapper>
      </PageWrapper>
    </>
  );
}
