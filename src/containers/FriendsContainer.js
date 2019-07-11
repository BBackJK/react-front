/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FriendView, FriendsRequest, Button, SearchForm } from '../components';
import { SEARCH_USER, SEARCH_USER_FAILURE } from '../reducers/user';

const FriendsContainer = () => {
  const [searchFlag, setSearchFlag] = useState(false);
  const [requestFlag, setRequestFlag] = useState(false);

  const { token, searchUserData } = useSelector(state => state.user);

  const dispatch = useDispatch();

  const onSearchFlag = () => {
    setSearchFlag(true);
  };

  const onCheckRequestFlag = () => {
    setRequestFlag(true);
  };

  const onAccept = () => {
    console.log('친구 요청 수락!');
  };

  const onAddUser = () => {
    console.log('친구 요청!!');
  };

  const onSearchSubmit = (searchData) => {
    dispatch({
      type: SEARCH_USER,
      data: searchData,
    });
  };

  const onCancel = () => {
    if (searchFlag) {
      dispatch({
        type: SEARCH_USER_FAILURE,
      });
      return setSearchFlag(false);
    }

    if (requestFlag) return setRequestFlag(false);

    return null;
  };

  return (
    <div>
      {searchFlag ? (
        <div>
          <SearchForm onFunc={onSearchSubmit}>
            <Button type="submit" ment="search" />
          </SearchForm>
          <br />
          <div style={{ textAlign: 'center' }}>
            <Button type="button" ment="친구추가" func={onAddUser} />
            {'                                                '}
            <Button type="button" ment="취소" func={onCancel} />
          </div>
        </div>
      ) : requestFlag ? (
        <FriendsRequest>
          <Button type="button" ment="요청수락" func={onAccept} />
          {'                                                '}
          <Button type="button" ment="취소" func={onCancel} />
        </FriendsRequest>
      ) : (
        <FriendView>
          <Button type="button" ment="친구검색" func={onSearchFlag} />
          {'                                                '}
          <Button type="button" ment="요청알림" func={onCheckRequestFlag} />
        </FriendView>
      )}
    </div>
  );
};

export default FriendsContainer;
