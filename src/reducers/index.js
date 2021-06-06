import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import taskReducer from './task.reducer';
import loadingReducer from './loading.reducer';
import messageReducer from './message.reducer';
import userReducer from './user.reducer';

export default combineReducers({
  auth: authReducer,
  task: taskReducer,
  loading: loadingReducer,
  message: messageReducer,
  users: userReducer
});
