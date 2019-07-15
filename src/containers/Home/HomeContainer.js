import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { HomeView } from '../../components';
import { GET_WEATHER } from '../../reducers/weather';

const HomeContainer = () => {
  const { weatherInfo } = useSelector(state => state.weather);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: GET_WEATHER,
    });
  }, []);

  return (
    <div>
      <HomeView weather={weatherInfo} />
    </div>
  );
};

export default HomeContainer;
