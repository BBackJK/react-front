/* eslint-disable consistent-return */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
import React, { useCallback, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ProfileUpdateForm, Button, Modals } from '../../components';
import {
  INFO_UPDATE,
  INFO_UPDATE_FAILURE,
  DELETE_USER,
} from '../../reducers/user';

const ProfileUpdateContainer = () => {
  const { token, info, isUpdatedUser } = useSelector(state => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: INFO_UPDATE_FAILURE,
    });
  }, [isUpdatedUser]);

  const onUpdateSubmit = useCallback((putData) => {
    const apiData = { putData, token };
    dispatch({
      type: INFO_UPDATE,
      data: apiData,
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

  if (isUpdatedUser) {
    alert('변경 성공');
  }

  return !info ? (
    <Modals
      link="/"
      title="잘못된 접근입니다"
      contents="홈페이지로 이동합니다"
      visible={!info}
    />
  ) : (
    <div>
      <ProfileUpdateForm userInfo={info} onFunc={onUpdateSubmit}>
        <br />
        <Button type="submit" ment="등록" />
        {'                                  '}
        <Button type="normal" ment="회원탈퇴" func={onDelete} />
        {'                                  '}
        <Button type="normal" ment="뒤로가기" />
      </ProfileUpdateForm>
      {isUpdatedUser && <Redirect to="/profile" />}
    </div>
  );
};

export default ProfileUpdateContainer;
