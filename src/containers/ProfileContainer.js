/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { ProfileForm, ProfileModForm, Modals, Button } from '../components';
import {
  GET_INFO,
  LOG_OUT,
  INFO_UPDATE,
  INFO_UPDATE_FAILURE,
  DELETE_USER,
} from '../reducers/user';

const ProfileContainer = () => {
  const [isModify, setIsModify] = useState(false);

  const { token, info, isLoggedOut, isUpdated, isDeleted } = useSelector(
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

  // change view
  const onModify = () => {
    setIsModify(true);
  };

  // log-out
  const onLogout = () => {
    dispatch({
      type: LOG_OUT,
    });
  };

  // update submit
  const onUpdateSubmit = (updateData) => {
    const apiData = { updateData, token };
    dispatch({
      type: INFO_UPDATE,
      data: apiData,
    });
  };

  // delete user
  const onDelete = () => {
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
  };

  // auth email
  const onAuthEmail = () => {
    console.log('이메일 인증하자!');
  };

  // rechange view
  const onCancel = () => {
    setIsModify(false);
  };

  // update trigger
  if (isUpdated) {
    alert('변경 성공');
    setIsModify(false);
    dispatch({
      type: INFO_UPDATE_FAILURE,
    });
  }

  return (
    <div>
      {!isModify ? (
        <div>
          <ProfileForm userInfo={info}>
            <br />
            <Button type="button" ment="변경" func={onModify} />
            {'                                '}
            <Button type="button" ment="로그아웃" func={onLogout} />
            {'                                '}
            <Button type="button" ment="탈퇴" func={onDelete} />
            {'                                '}
            <Button type="button" ment="취소" />
          </ProfileForm>
        </div>
      ) : !isDeleted ? (
        <div>
          <ProfileModForm userInfo={info} onFunc={onUpdateSubmit}>
            <br />
            <Button type="submit" ment="등록" />
            {'                                '}
            {!info.auth_email && (
              <Button type="button" ment="인증" func={onAuthEmail} />
            )}
            {'                                '}
            <Button type="button" ment="취소" func={onCancel} />
          </ProfileModForm>
        </div>
      ) : (
        <Redirect to="/" />
      )}
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
    </div>
  );
};

export default ProfileContainer;
