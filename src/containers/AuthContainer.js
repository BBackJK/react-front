import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SignInForm, SignUpForm, Modals } from '../components';
import { LOG_IN } from '../reducers/user';

let snsEmail = '';

const AuthContainer = () => {
  const { loginErrorReason, info } = useSelector(state => state.user);
  const dispatch = useDispatch();

  console.log(`loginErrorReason : ${loginErrorReason}, info : ${info}`);

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

  return loginErrorReason === 404 ? (
    <div>
      <SignUpForm sns={snsEmail} />
      <Modals
        link="/"
        title="회원 등록 성공"
        contents="홈페이지로 이동하세요!"
        visible={info != null}
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
        visible={info != null}
      />
    </div>
  );
};

export default AuthContainer;
