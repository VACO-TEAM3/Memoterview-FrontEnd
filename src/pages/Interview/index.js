import { faChevronLeft, faFile, faQuestion, faVideo, faVideoSlash, faVolumeMute, faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";

import CircleButton from "../../components/CircleButton";
import InterviewButton from "../../components/InterviewButton";
import InterviewMenuButton from "../../components/InterviewMenuButton";
import InterviewQuestionModalView from "../../components/InterviewQuestionModalView";
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
  background: linear-gradient(50deg, #1572B2, #8CCED7) fixed;

  .interview-content {
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
  }
`;

export default function Interview({
  user,
  userData,
  interviewers,
  recordBtnElementRef,
  recordStateType,
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
}) {
  // 이 부분들은 컨테이너로 다 빠질 것입니다. 컨테이너에서 소켓 작업을 하기 위해 임의로 올리지 않았습니다.
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isResumeOpen, setIsResumeOpend] = useState(false);
  const [question, setQuestion] = useState("");
  const [questions, setQuestions] = useState([]);
  const [isQuestionBoardOpen, setIsQuestionBoardOpen] = useState(false);

  function handleAudio() {
    onAudioBtnClick(isAudioOn);
    setIsAudioOn((prev) => !prev);
  }

  function handleVideo() {
    onVideoBtnClick(isVideoOn);
    setIsVideoOn((prev) => !prev);
  }

  function handleOpenResumeButton() {
    setIsResumeOpend((prev) => !prev);
  }

  function handleOpenQuestionBoardOpen() {
    setIsQuestionBoardOpen((prev) => !prev);
  }

  function handleQuestionSubmit(ev) {
    ev.preventDefault();

    setQuestions((prev) => [...prev, question]);
    setQuestion("");
  }

  function handleQuestionInputChange(ev) {
    const { target: { value } } = ev;

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
            isOpened={isResumeOpen}
          >
            <div>이력서다!</div>
          </InterviewTab>
          <InterviewTab 
            tabName="Questions" 
            tabIcon={faQuestion} 
            onClick={handleOpenQuestionBoardOpen} 
            isOpened={isQuestionBoardOpen}
          >
            <QuestionBoard
              question={question}
              questions={questions}
              onChange={handleQuestionInputChange}
              onSubmit={handleQuestionSubmit}
            />
          </InterviewTab>
        </StyledSideBar>
        <Profile />
        <Timer />
        <div className="interview-content">
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
                videoRef={recordBtnElementRef} 
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
        </div>
      </PageWrapper>
    </>
  );
}
