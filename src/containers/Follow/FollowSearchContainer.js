/* eslint-disable no-nested-ternary */
import React, { useCallback, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  FollowSearchView,
  SearchForm,
  Lists,
  Button,
  Modals,
} from '../../components';
import { SEARCH_USER, SEARCH_USER_FAILURE } from '../../reducers/user';
import { ADD_FOLLOW, ADD_FOLLOW_FAILURE } from '../../reducers/follow';

const FollowSearchContainer = () => {
  const { token, searchUserData } = useSelector(state => state.user);
  const { addErrorReason, isAddedFollow } = useSelector(state => state.follow);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: SEARCH_USER_FAILURE,
    });
    dispatch({
      type: ADD_FOLLOW_FAILURE,
    });
  }, [isAddedFollow]);

  const onSearchSubmit = useCallback((searchData) => {
    dispatch({
      type: SEARCH_USER,
      data: searchData,
    });
    dispatch({
      type: ADD_FOLLOW_FAILURE,
    });
  }, []);

  if (isAddedFollow) {
    alert('요청 성공');
  }

  return (
    <div>
      <SearchForm onFunc={onSearchSubmit}>
        <Button type="submit" ment="search" />
      </SearchForm>
      <br />
      {!searchUserData ? (
        <FollowSearchView searchData={searchUserData} error={addErrorReason}>
          <div />
        </FollowSearchView>
      ) : (
        <FollowSearchView searchData={searchUserData} error={addErrorReason}>
          {searchUserData.map(i => (
            <Lists key={i.id} lists={i} theme="user">
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
          ))}
        </FollowSearchView>
      )}
      <br />
      <div style={{ textAlign: 'center' }}>
        <Button type="button" ment="뒤로가기" />
      </div>
      <Modals
        link="/"
        title="잘못된 접근입니다"
        contents="홈페이지로 이동합니다"
        visible={!token}
      />
      {isAddedFollow && <Redirect to="/follow" />}
    </div>
  );
};

export default FollowSearchContainer;
