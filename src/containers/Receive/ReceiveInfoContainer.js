import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ReceiveInfoView, Button } from '../../components';
import {
  GET_RECEIVE_MESSAGE_INFO,
  READ_RECEIVE_MESSAGE,
} from '../../reducers/send';

let locationData = null;

const ReceiveInfoContainer = ({ infoId }) => {
  const [queryFlag, setQueryFlag] = useState(false);
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

  if (receiveMessageInfo && !queryFlag) {
    locationData = [receiveMessageInfo.lat, receiveMessageInfo.lng];
    setQueryFlag(true);
  }

  return (
    <div>
      <ReceiveInfoView receiveInfo={receiveMessageInfo}>
        <Link
          to={`/messages/receive/info/${infoId}/locations?latlng=${locationData}`}
        >
          <Button type="normal" ment="위치확인" func={null} />
        </Link>
        {'                                    '}
        <Button type="normal" ment="뒤로가기" />
      </ReceiveInfoView>
    </div>
  );
};

ReceiveInfoContainer.propTypes = {
  infoId: PropTypes.string,
};

export default ReceiveInfoContainer;
