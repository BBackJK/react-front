/* eslint-disable no-param-reassign */
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SignUpForm, Button, Modals } from '../../components';
import { SIGN_UP, SIGN_UP_FAILURE } from '../../reducers/user';

const SignUpContainer = () => {
  const { isSignedUp, loggingInEmail, signUpErrorReason } = useSelector(
    state => state.user,
  );

  const dispatch = useDispatch();

  const onSignUp = useCallback((signUpData) => {
    signUpData.sns_email = loggingInEmail;

    dispatch({
      type: SIGN_UP_FAILURE,
    });

    dispatch({
      type: SIGN_UP,
      data: signUpData,
    });
  });

  return (
    <div>
      <SignUpForm onFunc={onSignUp}>
        {signUpErrorReason === 409 && (
          <div className="sign-up-error">
            이미 등록된 회원입니다
            <br /> 이메일을 확인해주세요
          </div>
        )}
        <Button type="submit" ment="등록" />
      </SignUpForm>
      <Modals
        link="/"
        title="회원 등록 성공"
        contents="홈페이지로 이동하세요!"
        visible={isSignedUp === true}
        tag="register"
      />
    </div>
  );
};

export default SignUpContainer;
