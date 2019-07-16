/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { FollowMainView, Button, Lists } from '../../components';
import {
  GET_FOLLOWER,
  GET_FOLLOWED,
  DELETE_FOLLOWER,
  DELETE_FOLLOWER_FAILURE,
} from '../../reducers/follow';

const FollowMainContainer = () => {
  const { token } = useSelector(state => state.user);
  const { follower, isDeletedFollow, followed } = useSelector(
    state => state.follow,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch({
        type: DELETE_FOLLOWER_FAILURE,
      });
      dispatch({
        type: GET_FOLLOWER,
        data: {
          token,
        },
      });
      dispatch({
        type: GET_FOLLOWED,
        data: {
          token,
        },
      });
    }
  }, [isDeletedFollow]);

  if (isDeletedFollow) {
    alert('삭제 성공');
  }

  return (
    <div>
      <FollowMainView>
        {!token ? (
          <div>
            아직 서비스를 이용할 수 없습니다.
            <p>로그인 하시고 서비스를 이용하세요!</p>
          </div>
        ) : follower.length === 0 ? (
          <div>
            등록된 친구가 없습니다.
            <p>[친구검색]탭을 눌러 친구를 검색하여 추가하세요!</p>
          </div>
        ) : (
          follower.map(i => (
            <Lists key={i.id} lists={i} theme="user">
              <Button
                type="button"
                ment="삭제"
                func={() => {
                  const deleteData = {
                    id: i.id,
                  };

                  const apiData = { deleteData, token };

                  dispatch({
                    type: DELETE_FOLLOWER,
                    data: apiData,
                  });
                }}
              />
            </Lists>
          ))
        )}
        {!token ? (
          <Link to="/login">
            <Button type="button" ment="로그인" func={null} />
          </Link>
        ) : (
          <div>
            <Link to="/follow/search">
              <Button type="button" ment="친구검색" func={null} />
            </Link>
            {'                                    '}
            {followed.length > 0 ? (
              <Link to="/follow/followed">
                <Button type="alarm" ment="요청알림" func={null} />
              </Link>
            ) : (
              <Link to="/follow/followed">
                <Button type="button" ment="요청알림" func={null} />
              </Link>
            )}
          </div>
        )}
      </FollowMainView>
      {isDeletedFollow && <Redirect to="/follow" />}
    </div>
  );
};

export default FollowMainContainer;
