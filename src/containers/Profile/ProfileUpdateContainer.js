import React, { useCallback, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ProfileUpdateForm, Button, Modals } from '../../components';
import { INFO_UPDATE, INFO_UPDATE_FAILURE } from '../../reducers/user';

const ProfileUpdateContainer = () => {
  const { token, info, isUpdatedUser } = useSelector(state => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: INFO_UPDATE_FAILURE,
    });
    if (info && !info.auth_email && !isUpdatedUser) {
      alert('인증되지 않은 이메일입니다. [인증]탭을 눌러 이메일 인증해주세요!');
    }
  }, [isUpdatedUser]);

  const onUpdateSubmit = useCallback((putData) => {
    const apiData = { putData, token };
    dispatch({
      type: INFO_UPDATE,
      data: apiData,
    });
  });

  const onAuthEmail = () => {
    console.log('이메일 인증 클릭');
  };

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
        {!info.auth_email && (
          <Button type="button" ment="인증" func={onAuthEmail} />
        )}
        {'                                  '}
        <Button type="button" ment="뒤로가기" />
      </ProfileUpdateForm>
      {isUpdatedUser && <Redirect to="/profile" />}
    </div>
  );
};

export default ProfileUpdateContainer;
