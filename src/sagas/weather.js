import { all, fork, takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';

import {
  GET_WEATHER,
  GET_WEATHER_SUCCESS,
  GET_WEATHER_FAILURE,
} from '../reducers/weather';

function getWeatherAPI() {
  return axios.get(
    `http://api.openweathermap.org/data/2.5/weather?q=Seoul&APPID=${
      process.env.REACT_APP_OPEN_WEATHER_KEY
    }`,
  );
}

function* getWeather() {
  try {
    const result = yield call(getWeatherAPI);
    yield put({
      type: GET_WEATHER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: GET_WEATHER_FAILURE,
      error: err.response.status,
    });
  }
}

function* watchGetWeather() {
  yield takeEvery(GET_WEATHER, getWeather);
}

export default function* userSaga() {
  yield all([fork(watchGetWeather)]);
}
