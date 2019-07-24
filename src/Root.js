import { hot } from 'react-hot-loader/root';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { MainContainer } from './containers';
import store from './store/store';

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <MainContainer />
    </BrowserRouter>
  </Provider>
);

export default hot(Root);
