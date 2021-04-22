import { takeLatest, takeLeading } from "@redux-saga/core/effects";

import { getIntervieweesApi, updateInterviewee } from "../../api";
import { handleAsyncUpdateStateActionsWithNormalize } from "../lib/reducerUtils";
import { createPromiseSaga, createPromiseSagaById } from "../lib/sagaUtils";

const BASE_PATH = "INTERVIWEE/";

// interviewee들 가져오기.. project로 populate
export const GET_INTERVIEWEES = BASE_PATH + "GET_INTERVIEWEES";
export const GET_INTERVIEWEES_SUCCESS = BASE_PATH + "GET_INTERVIEWEES_SUCCESS";
export const GET_INTERVIEWEES_ERROR = BASE_PATH + "GET_INTERVIEWEES_ERROR";

// interviewee 추가 ->
export const ADD_NEW_INTERVIEWEE = BASE_PATH + "ADD_NEW_INTERVIEWEE";
export const ADD_NEW_INTERVIEWEE_SUCCESS = BASE_PATH + "ADD_NEW_INTERVIEWEE_SUCCESS";
export const ADD_NEW_INTERVIEWEE_ERROR = BASE_PATH + "ADD_NEW_INTERVIEWEE_ERROR";

// interview 끝내기 -> interviewee 정보 저장 + interviewed true
export const FINISH_INTERVIEW = BASE_PATH + "FINISH_INTERVIEW";
export const FINISH_INTERVIEW_SUCCESS = BASE_PATH + "FINISH_INTERVIEW_SUCCESS";
export const FINISH_INTERVIEW_ERROR = BASE_PATH + "FINISH_INTERVIEW_ERROR";

export const getInterviewees = ({ projectId, token }) => ({
  type: GET_INTERVIEWEES,
  payload: { projectId, token },
  meta: projectId,
});

export const addNewInterviewee = ({ token, interviewee, projectId }) => ({
  type: ADD_NEW_INTERVIEWEE,
  payload: { token, interviewee, projectId },
  meta: interviewee,
});

export const finishInterview = ({
  token,
  interviewee,
  projectId,
  intervieweeId,
}) => ({
  type: FINISH_INTERVIEW,
  payload: { token, interviewee, projectId, intervieweeId },
  meta: interviewee,
});

export const getIntervieweesSaga = createPromiseSaga(GET_INTERVIEWEES, getIntervieweesApi);
export const addNewIntervieweeSaga = createPromiseSaga(ADD_NEW_INTERVIEWEE);
export const finishInterviewSaga = createPromiseSaga(FINISH_INTERVIEW, updateInterviewee);

export function* intervieweeSaga() {
  yield takeLeading(GET_INTERVIEWEES, getIntervieweesSaga);
  // yield takeLatest(ADD_NEW_INTERVIEWEE, addNewIntervieweeAPI);
  yield takeLatest(FINISH_INTERVIEW, finishInterviewSaga);
}

const commentInitialState = {
  comment: "",
  score: 0,
  commentor: "",
};

const questionInitialState = {
  quistion: "",
  answer: "",
  score: 0,
  questioner: "",
};

const intervieweeInitialState = {
  id: "",
  name: "",
  email: "",å
  interviewDate: "",
  resumePath: "",
  filterScore: [], // 백엔드 스키마 수정해야함
  isInterviewed: false,
  questioner: questionInitialState,
  comments: commentInitialState,
};

const initialState = {
  loading: false,
  byId: {},
  allIds: [],
  error: null,
};

export default function interviewee(state = initialState, action) {
  switch (action.type) {
    case ADD_NEW_INTERVIEWEE:
    case ADD_NEW_INTERVIEWEE_SUCCESS:
    case ADD_NEW_INTERVIEWEE_ERROR:
      return handleAsyncUpdateStateActionsWithNormalize(ADD_NEW_INTERVIEWEE, true)(state, action);
    case OPEN_INTERVIEW_ROOM:
    case OPEN_INTERVIEW_ROOM_SUCCESS:
    case OPEN_INTERVIEW_ROOM_ERROR:
      return handleAsyncUpdateStateActionsWithNormalize(OPEN_INTERVIEW_ROOM, true)(state, action);
    case GET_INTERVIEWEES:
    case GET_INTERVIEWEES_SUCCESS:
    case GET_INTERVIEWEES_ERROR:
      console.log(action.payload);
      return handleAsyncUpdateStateActionsWithNormalize(GET_INTERVIEWEES, true)(state, action);
    case FINISH_INTERVIEW:
    case FINISH_INTERVIEW_SUCCESS:
    case FINISH_INTERVIEW_ERROR:
      return handleAsyncUpdateStateActionsWithNormalize(FINISH_INTERVIEW, true)(state, action);
    default:
      return state;
  }
}
