import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';

function configMiddleware() {
  const middleWares = applyMiddleware(thunkMiddleware);
  return compose(middleWares);
}

const initialState = {};
const middleWares = configMiddleware();
const store = createStore(rootReducer, initialState, middleWares);

export default store;
