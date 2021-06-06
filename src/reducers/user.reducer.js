import { DO_LOGOUT, SET_USERS } from "actions";

const initialState = {
    data: null
  };
  
  export default function userReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case SET_USERS: return { ...state, data: payload }
      case DO_LOGOUT: return { data: null }
      default:
        return state;
    }
  }
  