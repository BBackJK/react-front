/* eslint-disable no-param-reassign */
import React, { useEffect, useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { MessageInfoView, Modals, Button } from '../../components';
import {
  GET_MSG_INFO,
  UPDATE_MSG,
  UPDATE_MSG_FAILURE,
  DELETE_MSG,
  DELETE_MSG_FAILURE,
} from '../../reducers/message';

const MessageInfoContainer = ({ infoId }) => {
  const { token } = useSelector(state => state.user);
  const { messageInfo, isUpdatedMsg, isDeletedMsg } = useSelector(
    state => state.message,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch({
        type: DELETE_MSG_FAILURE,
      });
      dispatch({
        type: UPDATE_MSG_FAILURE,
      });
      dispatch({
        type: GET_MSG_INFO,
        data: {
          token,
          id: infoId,
        },
      });
    }
  }, [isDeletedMsg, isUpdatedMsg]);

  const onUpdateSubmit = useCallback((putData) => {
    putData.id = infoId;
    const apiData = { putData, token };
    dispatch({
      type: UPDATE_MSG,
      data: apiData,
    });
  });

  const onDelete = useCallback(() => {
    const deleteData = {
      id: infoId,
    };

    const apiData = { deleteData, token };

    dispatch({
      type: DELETE_MSG,
      data: apiData,
    });
  });

  if (isUpdatedMsg) {
    alert('변경 성공');
  }

  if (isDeletedMsg) {
    alert('삭제 성공');
  }

  return (
    <div>
      <MessageInfoView messageInfo={messageInfo} onFunc={onUpdateSubmit}>
        <Button type="submit" ment="변경" />
        {'                                  '}
        <Button type="button" ment="삭제" func={onDelete} />
        {'                                   '}
        <Button type="button" ment="뒤로가기" />
      </MessageInfoView>
      <Modals
        link="/"
        title="잘못된 접근입니다"
        contents="홈페이지로 이동합니다"
        visible={!token}
      />
      {(isUpdatedMsg || isDeletedMsg) && <Redirect to="/messages" />}
    </div>
  );
};

MessageInfoContainer.propTypes = {
  infoId: PropTypes.string,
};

export default MessageInfoContainer;
