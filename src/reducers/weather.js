/* eslint-disable no-param-reassign */
/* eslint-disable indent */
import produce from 'immer';

const initialState = {
  gettingWeather: false, // 날씨 정보 받아노는 중
  getWeather: false, // 날씨 정보 받아오기 성공
  getErrorReason: '', // 날씨 정보 받아오기 실패 사유
  weatherInfo: null, // 날씨 정보
};

export const GET_WEATHER = 'GET_WEATHER';
export const GET_WEATHER_SUCCESS = 'GET_WEATHER_SUCCESS';
export const GET_WEATHER_FAILURE = 'GET_WEATHER_FAILURE';

export default (state = initialState, action) => produce(state, (draft) => {
    switch (action.type) {
      case GET_WEATHER: {
        draft.gettingWeather = true;
        draft.getErrorReason = '';
        draft.getWeather = false;
        draft.weatherInfo = null;
        break;
      }

      case GET_WEATHER_SUCCESS: {
        draft.gettingWeather = false;
        draft.getErrorReason = '';
        draft.getWeather = true;
        draft.weatherInfo = action.data;
        break;
      }

      case GET_WEATHER_FAILURE: {
        draft.gettingWeather = false;
        draft.getErrorReason = action.error;
        draft.getWeather = false;
        draft.weatherInfo = null;
        break;
      }

      default: {
        break;
      }
    }
  });
