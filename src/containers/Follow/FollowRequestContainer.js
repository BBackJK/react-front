import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { FollowRequestView, Button, Lists, Modals } from '../../components';
import {
  GET_FOLLOWED,
  ACCEPT_FOLLOWED,
  ACCEPT_FOLLOWED_FAILURE,
} from '../../reducers/follow';

const FollowRequestContainer = () => {
  const { token } = useSelector(state => state.user);
  const { followed, isAccepted } = useSelector(state => state.follow);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: GET_FOLLOWED,
      data: {
        token,
      },
    });
    dispatch({
      type: ACCEPT_FOLLOWED_FAILURE,
    });
  }, [isAccepted]);

  if (isAccepted) {
    alert('요청 수락 성공');
  }

  return (
    <div>
      <FollowRequestView>
        {followed.length === 0 ? (
          <div>
            친구 요청이 없습니다 <br />
            친구가 없으시다면 먼저 요청해보세요!
          </div>
        ) : (
          followed.map(i => (
            <Lists key={i.id} lists={i}>
              <Button
                type="button"
                ment="요청수락"
                func={() => {
                  const putData = {
                    id: i.id,
                    user_id: i.user.id,
                    email: i.user.email,
                    name: i.user.name,
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
        <br />
        <Button type="button" ment="뒤로가기" />
      </FollowRequestView>
      <Modals
        link="/"
        title="잘못된 접근입니다"
        contents="홈페이지로 이동합니다"
        visible={!token}
      />
      {isAccepted && <Redirect to="/follow" />}
    </div>
  );
};

export default FollowRequestContainer;
