import { DO_LOGIN, DO_LOGOUT } from 'actions';
import { TOKEN } from '../utils/constants';

const initialState = {
  token: localStorage.getItem(TOKEN),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default function authReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case DO_LOGIN: 
      return {...state, isAuthenticated: true, user: payload.user };
    case DO_LOGOUT: return {
      ...state, 
      isAuthenticated: null,
      loading: true,
      user: null
    };
    default: return state;
  }
}
