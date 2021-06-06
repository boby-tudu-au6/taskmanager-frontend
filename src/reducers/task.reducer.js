import { DELETE_TASK, DO_LOGOUT, getToken, getUserid, SET_TASK } from "actions";

const initialState = {
  data: null,
  myTask: [],
  myHistory: [],
  otherTask: [],
  otherHistory: []
};

export default function taskReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_TASK: return { ...state, ...payload }
    case DELETE_TASK: return { 
      ...state, 
      data: null,
      myTask: [],
      myHistory: [],
      otherTask: [],
      otherHistory: []}
    case DO_LOGOUT: return { 
      ...state, 
      data: null,
      myTask: [],
      myHistory: [],
      otherTask: [],
      otherHistory: []}
    default:
      return state;
  }
}
