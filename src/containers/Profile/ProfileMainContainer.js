/* eslint-disable consistent-return */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
import React, { useEffect, useCallback } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ProfileForm, Modals, Button } from '../../components';
import { GET_INFO, LOG_OUT, DELETE_USER } from '../../reducers/user';

const ProfileMainContainer = () => {
  const { token, info, isLoggedOut, isDeleted } = useSelector(
    state => state.user,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: GET_INFO,
      data: {
        token,
      },
    });
  }, []);

  const onLogout = useCallback(() => {
    dispatch({
      type: LOG_OUT,
    });
  });

  const onDelete = useCallback(() => {
    if (confirm('정말 탈퇴 하시겠습니까??') === true) {
      dispatch({
        type: DELETE_USER,
        data: {
          token,
        },
      });
    } else {
      return false;
    }
  });

  return (
    <div>
      <ProfileForm userInfo={info}>
        <br />
        <Link to="/profile/update">
          <Button type="button" ment="변경" func={null} />
        </Link>
        {'                                '}
        <Button type="button" ment="로그아웃" func={onLogout} />
        {'                                '}
        <Button type="button" ment="탈퇴" func={onDelete} />
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
      {isDeleted && <Redirect to="/" />}
    </div>
  );
};

export default ProfileMainContainer;
