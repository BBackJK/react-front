import React, { useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { MainView, Button } from '../../components';
import { GET_WEATHER } from '../../reducers/weather';

const HomeContainer = () => {
  const { weatherInfo } = useSelector(state => state.weather);
  const { token } = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: GET_WEATHER,
    });
  }, []);

  return (
    <div>
      <MainView weather={weatherInfo}>
        <Link to="/messages/send">
          <Button type="button" ment="메세지 보내기" func={null} />
        </Link>
        {'                                                    '}
        <Link to="/alarms/setting">
          <Button type="button" ment="알람 설정" func={null} />
        </Link>
      </MainView>
      {!token && <Redirect to="/login" />}
    </div>
  );
};

export default HomeContainer;
