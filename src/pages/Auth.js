import React from 'react';
import { useSelector } from 'react-redux';

import { SignInContainer, SignUpContainer } from '../containers';

const Auth = () => {
  const { loginErrorReason } = useSelector(state => state.user);

  return loginErrorReason === 404 ? <SignUpContainer /> : <SignInContainer />;
};

export default Auth;
