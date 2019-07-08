import React from 'react';
import { useSelector } from 'react-redux';

import { Header, Footer, NavBar, App } from '../components';

import '../index.css';

const MainContainer = () => {
  const { info } = useSelector(state => state.user);
  return (
    <div>
      {info === null ? (
        <Header link="signin" menu="sign in" />
      ) : (
        <Header link="mypage" menu="my page" />
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
