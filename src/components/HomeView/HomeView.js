import React from 'react';
import Clock from 'react-live-clock';
import PropTypes from 'prop-types';

import './HomeView.css';

const HomeView = ({ weather }) => (
  <div className="home-main">
    <br />
    <h3>안녕하세요 좋은 하루 입니다!</h3>
    <br />
    <Clock
      format="YYYY 년 MM 월 DD 일 HH : mm : ss"
      ticking
      timezone="Asia/Seoul"
    />
    <br />
    <br />
    {!weather ? (
      <br />
    ) : (
      <div>
        <h2> 오늘의 서울 날씨 </h2>
        {weather.weather[0].icon === '' ? (
          'Loading... Please Wait...'
        ) : (
          <img
            alt="weather_icon"
            src={`http://openweathermap.org/img/w/${
              weather.weather[0].icon
            }.png`}
          />
        )}
        <h3>온도 : {Math.floor(weather.main.temp - 273.15)} °C</h3>
        <h3>날씨 : {weather.weather[0].main} </h3>
      </div>
    )}
  </div>
);

HomeView.propTypes = {
  weather: PropTypes.object,
};

export default HomeView;
