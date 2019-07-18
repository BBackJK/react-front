import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MessageSendForm, Button, Modals } from '../../components';
import { GET_FOLLOWER } from '../../reducers/follow';
import { GET_MSG } from '../../reducers/message';
import { SEND_MESSAGE, SEND_MESSAGE_FAILURE } from '../../reducers/send';

const MessageSendContainer = () => {
  const { token } = useSelector(state => state.user);
  const { follower } = useSelector(state => state.follow);
  const { messages } = useSelector(state => state.message);
  const { isSended } = useSelector(state => state.send);

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      if (follower.length === 0) {
        dispatch({
          type: GET_FOLLOWER,
          data: {
            token,
          },
        });
      }

      if (messages.length === 0) {
        dispatch({
          type: GET_MSG,
          data: {
            token,
          },
        });
      }

      dispatch({
        type: SEND_MESSAGE_FAILURE,
      });
    }
  }, []);

  const onSendSubmit = useCallback((postData) => {
    const apiData = { postData, token };

    dispatch({
      type: SEND_MESSAGE,
      data: apiData,
    });
  }, []);

  return (
    <div>
      <MessageSendForm
        followLists={follower}
        messageLists={messages}
        onFunc={onSendSubmit}
      >
        <Button type="submit" ment="전송" />
        {'                                                    '}
        <Button type="normal" ment="뒤로가기" />
      </MessageSendForm>
      <Modals
        link="/"
        title="메세지 전송 성공"
        contents="홈페이지로 이동하세요"
        visible={isSended}
      />
    </div>
  );
};

export default MessageSendContainer;
