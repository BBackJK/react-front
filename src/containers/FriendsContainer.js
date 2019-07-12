/* eslint-disable no-nested-ternary */
import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  FriendView,
  FriendsRequest,
  Button,
  SearchForm,
  Lists,
  Modals,
} from '../components';
import { SEARCH_USER, SEARCH_USER_FAILURE } from '../reducers/user';
import {
  ADD_FOLLOW,
  ADD_FOLLOW_FAILURE,
  GET_FOLLOWER,
  GET_FOLLOWED,
  ACCEPT_FOLLOWED,
} from '../reducers/follow';

let _followed = null;
let _follower = null;

const FriendsContainer = () => {
  const [searchFlag, setSearchFlag] = useState(false);
  const [requestFlag, setRequestFlag] = useState(false);

  const { token, searchUserData } = useSelector(state => state.user);
  const { addErrorReason, follower, followed, isAdded } = useSelector(
    state => state.follow,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: ADD_FOLLOW_FAILURE,
    });
    dispatch({
      type: SEARCH_USER_FAILURE,
    });
    dispatch({
      type: GET_FOLLOWER,
      data: {
        token,
      },
    });
  }, []);

  const onSearchFlag = useCallback(() => {
    setSearchFlag(true);
  }, []);

  const onCheckRequestFlag = useCallback(() => {
    dispatch({
      type: GET_FOLLOWED,
      data: {
        token,
      },
    });
    setRequestFlag(true);
  }, []);

  const onAddUser = useCallback(() => {
    if (!searchUserData) {
      return null;
    }

    const postData = {
      id: searchUserData[0].id,
      email: searchUserData[0].email,
      name: searchUserData[0].name,
    };
    const apiData = { postData, token };
    return dispatch({
      type: ADD_FOLLOW,
      data: apiData,
    });
  }, [searchUserData]);

  const onSearchSubmit = useCallback((searchData) => {
    dispatch({
      type: SEARCH_USER,
      data: searchData,
    });
    dispatch({
      type: ADD_FOLLOW_FAILURE,
    });
  }, []);

  const onCancel = useCallback(() => {
    if (searchFlag) {
      dispatch({
        type: SEARCH_USER_FAILURE,
      });
      dispatch({
        type: ADD_FOLLOW_FAILURE,
      });
      return setSearchFlag(false);
    }

    if (requestFlag) return setRequestFlag(false);

    return null;
  }, [searchFlag, requestFlag]);

  if (isAdded) {
    alert('요청 성공');
    setSearchFlag(false);
    dispatch({
      type: ADD_FOLLOW_FAILURE,
    });
    dispatch({
      type: SEARCH_USER_FAILURE,
    });
  }

  if (follower.length > 0) {
    _follower = follower.map(i => i.user);
  }

  if (followed.length > 0) {
    _followed = followed.map(i => i.user);
  }

  return (
    <div>
      {searchFlag ? (
        <div>
          <SearchForm onFunc={onSearchSubmit}>
            <Button type="submit" ment="search" />
          </SearchForm>
          <div style={{ textAlign: 'center' }}>
            {searchUserData ? (
              searchUserData.map(i => <Lists key={i.id} lists={i} />)
            ) : (
              <div />
            )}
            {addErrorReason === 400 ? (
              <div style={{ color: 'red', textAlign: 'center' }}>
                자신을 추가할 수 없습니다
              </div>
            ) : addErrorReason === 409 ? (
              <div style={{ color: 'red', textAlign: 'center' }}>
                중복된 요청입니다
                <p>요청수락을 기다리시거나 요청을 수락하세요!</p>
              </div>
            ) : (
              <div />
            )}
            <Button type="button" ment="친구요청" func={onAddUser} />
            {'                                                '}
            <Button type="button" ment="취소" func={onCancel} />
          </div>
        </div>
      ) : requestFlag ? (
        <FriendsRequest>
          {!_followed ? (
            <div>
              친구 요청이 없습니다.
              <p>먼저 요청해 보세요!</p>
            </div>
          ) : (
            _followed.map(i => (
              <Lists key={i.id} lists={i}>
                <Button
                  type="button"
                  ment="요청수락"
                  func={() => {
                    const putData = {
                      id: i.id,
                      email: i.email,
                      name: i.name,
                    };
                    const apiData = { putData, token };
                    dispatch({
                      type: ACCEPT_FOLLOWED,
                      data: apiData,
                    });
                  }}
                />
              </Lists>
            ))
          )}
          <Button type="button" ment="취소" func={onCancel} />
        </FriendsRequest>
      ) : (
        <FriendView>
          {!_follower ? (
            <div>
              등록된 친구가 없습니다.{' '}
              <p>[친구검색]탭을 눌러 친구를 검색하여 추가하세요!</p>
            </div>
          ) : (
            _follower.map(i => <Lists key={i.id} lists={i} />)
          )}
          <Button type="button" ment="친구검색" func={onSearchFlag} />
          {'                                                '}
          <Button type="button" ment="요청알림" func={onCheckRequestFlag} />
        </FriendView>
      )}
      <Modals
        link="/"
        title="잘못된 접근입니다"
        contents="홈페이지로 이동합니다"
        visible={!token}
      />
    </div>
  );
};

export default FriendsContainer;
