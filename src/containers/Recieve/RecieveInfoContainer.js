import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { RecieveInfoView, Button } from '../../components';
import {
  GET_RECIEVE_MESSAGE_INFO,
  READ_RECIEVE_MESSAGE,
} from '../../reducers/send';

const RecieveInfoContainer = ({ infoId }) => {
  const { token } = useSelector(state => state.user);
  const { recieveMessageInfo, isReaded } = useSelector(state => state.send);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch({
        type: GET_RECIEVE_MESSAGE_INFO,
        data: {
          token,
          id: infoId,
        },
      });
    }
  }, [isReaded]);

  if (recieveMessageInfo && !recieveMessageInfo.readed) {
    const putData = {
      id: infoId,
      send_id: recieveMessageInfo.send_id,
    };
    const apiData = { putData, token };
    dispatch({
      type: READ_RECIEVE_MESSAGE,
      data: apiData,
    });
  }

  return (
    <div>
      <RecieveInfoView recieveInfo={recieveMessageInfo}>
        <Button type="normal" ment="뒤로가기" />
      </RecieveInfoView>
    </div>
  );
};

RecieveInfoContainer.propTypes = {
  infoId: PropTypes.string,
};

export default RecieveInfoContainer;
