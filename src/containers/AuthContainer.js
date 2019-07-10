import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SignInForm, SignUpForm, Modals, Button } from '../components';
import { LOG_IN, SIGN_UP } from '../reducers/user';

let snsEmail = '';

const AuthContainer = () => {
  const { loginErrorReason, token, isSignedUp } = useSelector(
    state => state.user,
  );
  const dispatch = useDispatch();

  const successGoogle = useCallback((res) => {
    snsEmail = res.w3.U3;
    dispatch({
      type: LOG_IN,
      data: {
        sns_email: snsEmail,
      },
    });
  });

  const responseFailure = (err) => {
    console.error(err);
    alert('구글 로그인 실패! 다시 시도해 주세요.');
  };

  const onSignUp = (signUpData) => {
    console.log(signUpData);
    return dispatch({
      type: SIGN_UP,
      data: signUpData,
    });
  };

  return loginErrorReason === 404 ? (
    <div>
      <SignUpForm sns={snsEmail} onFunc={onSignUp}>
        <Button type="submit" ment="등록" />
      </SignUpForm>
      <Modals
        link="/"
        title="회원 등록 성공"
        contents="홈페이지로 이동 하세요!"
        visible={isSignedUp === true}
        tag="register"
      />
    </div>
  ) : (
    <div>
      <SignInForm
        successGoogle={successGoogle}
        responseFailure={responseFailure}
      />
      <Modals
        link="/"
        title="로그인 성공"
        contents="홈페이지로 이동하세요!"
        visible={token != null}
      />
    </div>
  );
};

export default AuthContainer;
