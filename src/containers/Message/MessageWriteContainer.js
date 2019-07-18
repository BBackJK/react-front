import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { MessageWriteForm, Button } from '../../components';
import { ADD_MSG, ADD_MSG_FAILURE } from '../../reducers/message';

const MessageWriteContainer = () => {
  const { token } = useSelector(state => state.user);
  const { isAddedMsg } = useSelector(state => state.message);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: ADD_MSG_FAILURE,
    });
  }, [isAddedMsg]);

  const onAddMessage = useCallback((postData) => {
    const apiData = { postData, token };
    dispatch({
      type: ADD_MSG,
      data: apiData,
    });
  });

  if (isAddedMsg) {
    alert('등록 성공');
  }

  return (
    <div>
      <MessageWriteForm onFunc={onAddMessage}>
        <Button type="submit" ment="등록" />
        {'                                '}
        <Button type="normal" ment="뒤로가기" />
      </MessageWriteForm>
      {isAddedMsg && <Redirect to="/messages" />}
    </div>
  );
};

export default MessageWriteContainer;
