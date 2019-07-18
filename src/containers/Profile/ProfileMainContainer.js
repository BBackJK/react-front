import React, { useEffect, useCallback, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ProfileForm, Modals, Button, EmailInput } from '../../components';
import { GET_INFO, LOG_OUT } from '../../reducers/user';
import {
  SEND_EMAIL,
  SEND_EMAIL_FAILURE,
  AUTH_EMAIL,
  AUTH_EMAIL_FAILURE,
} from '../../reducers/email';

const ProfileMainContainer = () => {
  const [onEmail, setOnEmail] = useState(false);
  const { token, info, isLoggedOut, isDeletedUser } = useSelector(
    state => state.user,
  );

  const { isSendedEmail, isSendingEmail, isAuthedEmail } = useSelector(
    state => state.email,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: GET_INFO,
      data: {
        token,
      },
    });
  }, [isSendedEmail, isAuthedEmail]);

  const onLogout = useCallback(() => {
    dispatch({
      type: LOG_OUT,
    });
  });

  const onAuthEmail = () => {
    dispatch({
      type: SEND_EMAIL,
      data: {
        token,
      },
    });
  };

  const onAuthSubmit = useCallback((putData) => {
    const apiData = { putData, token };
    dispatch({
      type: AUTH_EMAIL,
      data: apiData,
    });
  });

  if (isSendedEmail && !onEmail) {
    alert('해당 계정으로 들어가 메일에서 인증번호를 입력하세요!');
    setOnEmail(true);
    dispatch({
      type: SEND_EMAIL_FAILURE,
    });
  }

  if (
    info
    && !info.auth_email
    && !onEmail
    && !isSendedEmail
    && !isSendingEmail
  ) {
    alert(
      '인증되지 않은 이메일입니다. [메일인증]탭을 눌러 이메일 인증해주세요!',
    );
  }

  if (isAuthedEmail) {
    alert('인증 성공');
    setOnEmail(false);
    dispatch({
      type: AUTH_EMAIL_FAILURE,
    });
  }

  return (
    <div>
      <ProfileForm userInfo={info}>
        {onEmail && (
          <EmailInput onFunc={onAuthSubmit}>
            <Button type="submit" ment="인증" />
          </EmailInput>
        )}
        <br />
        <Link to="/profile/update">
          <Button type="normal" ment="변경" func={null} />
        </Link>
        {'                                '}
        <Button type="normal" ment="로그아웃" func={onLogout} />
        {'                                '}
        {info && !info.auth_email && (
          <Button type="normal" ment="메일인증" func={onAuthEmail} />
        )}
      </ProfileForm>
      <Modals
        link="/"
        title="잘못된 접근입니다"
        contents="홈페이지로 이동합니다"
        visible={!token && !isLoggedOut}
      />
      <Modals
        link="/"
        title="로그아웃 성공"
        contents="홈페이지로 이동합니다"
        visible={isLoggedOut}
      />
      {isDeletedUser && <Redirect to="/" />}
      {isAuthedEmail && <Redirect to="/profile" />}
    </div>
  );
};

export default ProfileMainContainer;
