import React from 'react';
import Body from './routes/Body';
import store from 'store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <Body />
    </Provider>
  );
}

export default App;
