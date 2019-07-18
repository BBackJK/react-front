import React, { useEffect, useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { AlarmInfoView, Modals, Button } from '../../components';
import {
  GET_ALARM_INFO,
  UPDATE_ALARM,
  UPDATE_ALARM_FAILURE,
  DELETE_ALARM,
  DELETE_ALARM_FAILURE,
} from '../../reducers/alarm';

const AlarmInfoContainer = ({ infoId }) => {
  const { token } = useSelector(state => state.user);
  const { alarmInfo, isUpdatedAlarm, isDeletedAlarm } = useSelector(
    state => state.alarm,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch({
        type: DELETE_ALARM_FAILURE,
      });

      dispatch({
        type: UPDATE_ALARM_FAILURE,
      });
      dispatch({
        type: GET_ALARM_INFO,
        data: {
          token,
          id: infoId,
        },
      });
    }
  }, [isDeletedAlarm, isUpdatedAlarm]);

  const onUpdateSubmit = useCallback((title) => {
    const putData = {
      id: infoId,
      title,
    };

    const apiData = { putData, token };

    dispatch({
      type: UPDATE_ALARM,
      data: apiData,
    });
  });

  const onDelete = useCallback(() => {
    const deleteData = {
      id: infoId,
    };

    const apiData = { deleteData, token };

    dispatch({
      type: DELETE_ALARM,
      data: apiData,
    });
  });

  if (isDeletedAlarm) {
    alert('삭제 성공');
  }

  if (isUpdatedAlarm) {
    alert('변경 성공');
  }

  return (
    <div>
      <AlarmInfoView alarmInfo={alarmInfo} onFunc={onUpdateSubmit}>
        <Button type="submit" ment="등록" />
        {'                                      '}
        <Button type="normal" ment="삭제" func={onDelete} />
        {'                                        '}
        <Button type="normal" ment="뒤로가기" />
      </AlarmInfoView>
      <Modals
        link="/"
        title="잘못된 접근입니다"
        contents="홈페이지로 이동합니다"
        visible={!token}
      />
      {(isUpdatedAlarm || isDeletedAlarm) && <Redirect to="/alarms" />}
    </div>
  );
};

AlarmInfoContainer.propTypes = {
  infoId: PropTypes.string.isRequired,
};

export default AlarmInfoContainer;
