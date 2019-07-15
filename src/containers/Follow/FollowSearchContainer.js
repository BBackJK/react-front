/* eslint-disable no-nested-ternary */
import React, { useCallback, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { SearchForm, Lists, Button, Modals } from '../../components';
import { SEARCH_USER, SEARCH_USER_FAILURE } from '../../reducers/user';
import { ADD_FOLLOW, ADD_FOLLOW_FAILURE } from '../../reducers/follow';

const FollowSearchContainer = () => {
  const { token, searchUserData } = useSelector(state => state.user);
  const { addErrorReason, isAdded } = useSelector(state => state.follow);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: SEARCH_USER_FAILURE,
    });
    dispatch({
      type: ADD_FOLLOW_FAILURE,
    });
  }, [isAdded]);

  const onSearchSubmit = useCallback((searchData) => {
    dispatch({
      type: SEARCH_USER,
      data: searchData,
    });
  }, []);

  if (isAdded) {
    alert('요청 성공');
  }

  return (
    <div>
      <SearchForm onFunc={onSearchSubmit}>
        <Button type="submit" ment="search" />
      </SearchForm>
      <div style={{ textAlign: 'center' }}>
        {!searchUserData ? (
          <div />
        ) : searchUserData.length > 0 ? (
          searchUserData.map(i => (
            <Lists key={i.id} lists={i}>
              <Button
                type="button"
                ment="친구요청"
                func={() => {
                  const postData = {
                    id: i.id,
                    email: i.email,
                    name: i.name,
                  };

                  const apiData = { postData, token };
                  dispatch({
                    type: ADD_FOLLOW,
                    data: apiData,
                  });
                }}
              />
            </Lists>
          ))
        ) : (
          <div style={{ color: 'red', textAlign: 'center' }}>
            찾으시는 번호는 등록되어있지 않은 번호입니다
            <p>다시 확인하여 검색해주세요</p>
          </div>
        )}
        {addErrorReason === 400 ? (
          <div style={{ color: 'red', textAlign: 'center' }}>
            자신을 추가할 수 없습니다
          </div>
        ) : addErrorReason === 409 ? (
          <div style={{ color: 'red', textAlign: 'center' }}>
            이미 친구로 등록된 중복된 요청입니다
            <p>친구가 아니시라면 요청수락을 기다리시거나 요청을 수락하세요!</p>
          </div>
        ) : (
          <div />
        )}
        <br />
        <Button type="button" ment="뒤로가기" />
      </div>
      <Modals
        link="/"
        title="잘못된 접근입니다"
        contents="홈페이지로 이동합니다"
        visible={!token}
      />
      {isAdded && <Redirect to="/follow" />}
    </div>
  );
};

export default FollowSearchContainer;
