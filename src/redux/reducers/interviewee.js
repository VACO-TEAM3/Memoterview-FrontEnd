import { takeLatest, takeLeading } from "@redux-saga/core/effects";

import { addNewIntervieweeAPI } from "../lib/mockApi";
import { createPromiseSaga } from "../lib/sagaUtils";

const BASE_PATH = "INTERVIWEE/";

export const ADD_NEW_INTERVIEWEE = BASE_PATH + "ADD_NEW_INTERVIEWEE";
export const ADD_NEW_INTERVIEWEE_SUCCESS = BASE_PATH + "ADD_NEW_INTERVIEWEE_SUCCESS";
export const ADD_NEW_INTERVIEWEE_FAILURE = BASE_PATH + "ADD_NEW_INTERVIEWEE_FAILURE";

export const OPEN_INTERVIEW_ROOM = BASE_PATH + "OPEN_INTERVIEW_ROOM";
export const OPEN_INTERVIEW_ROOM_SUCCESS = BASE_PATH + "OPEN_INTERVIEW_ROOM_SUCCESS";
export const OPEM_INTERVIEW_ROOM_FAILURE = BASE_PATH + "OPEN_INTERVIEW_ROOM_FAILURE";

export const openInterviewRoom = (interviewee) => ({ type: OPEN_INTERVIEW_ROOM, payload: interviewee, meta: interviewee });
export const addNewInterviewee = (interviewee) => ({ type: ADD_NEW_INTERVIEWEE, payload: interviewee, meta: interviewee });

export const openInterviewRoomSaga = createPromiseSaga(ADD_NEW_INTERVIEWEE, addNewIntervieweeAPI);
export const addNewIntervieweeSaga = createPromiseSaga(OPEN_INTERVIEW_ROOM);

export function* intervieweeSaga() {
  yield takeLeading(ADD_NEW_INTERVIEWEE, addNewIntervieweeAPI);
  yield takeLeading(OPEN_INTERVIEW_ROOM);
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
  email: "",
  interviewDate: "",
  resumePath: "",
  filterScore: [],
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
