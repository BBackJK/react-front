import React from 'react';
import { useSelector } from 'react-redux';

import { Header, Footer, NavBar, App } from '../../components';

import '../../index.css';

const MainContainer = () => {
  const { token } = useSelector(state => state.user);
  return (
    <div>
      {token === null ? (
        <Header link="login" menu="login" />
      ) : (
        <Header link="profile" menu="my page" />
      )}
      <div className="app-contents">
        <NavBar />
        <App />
      </div>
      <Footer />
    </div>
  );
};

export default MainContainer;
