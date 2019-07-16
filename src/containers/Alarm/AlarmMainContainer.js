import React, { useEffect, useCallback } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { AlarmMainView, Button, Lists } from '../../components';
import { ADD_ALARM, GET_ALARM, ADD_ALARM_FAILURE } from '../../reducers/alarm';

const AlarmMainContainer = () => {
  const { token } = useSelector(state => state.user);
  const { alarmLists, isAddedAlarm } = useSelector(state => state.alarm);

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch({
        type: GET_ALARM,
        data: {
          token,
        },
      });
    }

    dispatch({
      type: ADD_ALARM_FAILURE,
    });
  }, [isAddedAlarm]);

  const onAddAlarm = useCallback((title) => {
    const postData = {};
    postData.title = title;
    const apiData = { postData, token };

    dispatch({
      type: ADD_ALARM,
      data: apiData,
    });
  });

  if (isAddedAlarm) {
    alert('알람 추가 성공');
  }

  return !token ? (
    <div style={{ textAlign: 'center' }}>
      <h1>알람 목록</h1>
      <div>
        아직 서비스를 이용할 수 없습니다.
        <p>로그인 하시고 서비스를 이용하세요!</p>
      </div>
      <Link to="/login">
        <Button type="button" ment="로그인" func={null} />
      </Link>
    </div>
  ) : (
    <div>
      <AlarmMainView onFunc={onAddAlarm}>
        {alarmLists.length > 0 ? (
          alarmLists.map(i => (
            <Lists key={i.id} lists={i}>
              <Link to={`/alarms/info/${i.id}`}>
                <Button type="info" ment="i" func={null} />
              </Link>
            </Lists>
          ))
        ) : (
          <div>데이터가 없습니다.</div>
        )}
        <Button type="submit" ment="추가" />
      </AlarmMainView>
      {isAddedAlarm && <Redirect to="/alarms" />}
    </div>
  );
};

export default AlarmMainContainer;
