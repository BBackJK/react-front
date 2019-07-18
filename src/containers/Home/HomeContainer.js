/* eslint-disable no-unused-expressions */
import React, { useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { MainView, Button } from '../../components';
import { GET_WEATHER } from '../../reducers/weather';
import { GET_RECIEVE_MESSAGE } from '../../reducers/send';

let findReaded = [];

const HomeContainer = () => {
  const { weatherInfo } = useSelector(state => state.weather);
  const { token } = useSelector(state => state.user);
  const { recieveMessageLists } = useSelector(state => state.send);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch({
        type: GET_WEATHER,
      });
      dispatch({
        type: GET_RECIEVE_MESSAGE,
        data: {
          token,
        },
      });
    }
  }, []);

  if (recieveMessageLists.length > 0) {
    recieveMessageLists.find(i => i.readed === false) === undefined
      ? (findReaded = [])
      : (findReaded = recieveMessageLists.find(i => i.readed === false));
  }

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
        {'                                                    '}
        {findReaded.length !== 0 ? (
          <Link to="/messages/recieve">
            <Button type="alarm" ment="메세지함" func={null} />
          </Link>
        ) : (
          <Link to="/messages/recieve">
            <Button type="button" ment="메세지 함" func={null} />
          </Link>
        )}
      </MainView>
      {!token && <Redirect to="/login" />}
    </div>
  );
};

export default HomeContainer;
