import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { ReceiveInfoView, Button } from '../../components';
import {
  GET_RECEIVE_MESSAGE_INFO,
  READ_RECEIVE_MESSAGE,
} from '../../reducers/send';

const ReceiveInfoContainer = ({ infoId }) => {
  const [readFlag, setReadFlag] = useState(false);
  const { token } = useSelector(state => state.user);
  const { receiveMessageInfo } = useSelector(state => state.send);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch({
        type: GET_RECEIVE_MESSAGE_INFO,
        data: {
          token,
          id: infoId,
        },
      });
    }
  }, [readFlag]);

  if (receiveMessageInfo && !receiveMessageInfo.readed && !readFlag) {
    setReadFlag(true);
    const putData = {
      id: infoId,
      send_id: receiveMessageInfo.send_id,
    };
    const apiData = { putData, token };
    dispatch({
      type: READ_RECEIVE_MESSAGE,
      data: apiData,
    });
  }

  return (
    <div>
      <ReceiveInfoView receiveInfo={receiveMessageInfo}>
        <Button type="normal" ment="뒤로가기" />
      </ReceiveInfoView>
    </div>
  );
};

ReceiveInfoContainer.propTypes = {
  infoId: PropTypes.string,
};

export default ReceiveInfoContainer;
