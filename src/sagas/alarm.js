import { all, fork, takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';

import {
  GET_ALARM,
  GET_ALARM_SUCCESS,
  GET_ALARM_FAILURE,
  GET_ALARM_INFO,
  GET_ALARM_INFO_SUCCESS,
  GET_ALARM_INFO_FAILURE,
  ADD_ALARM,
  ADD_ALARM_SUCCESS,
  ADD_ALARM_FAILURE,
  UPDATE_ALARM,
  UPDATE_ALARM_SUCCESS,
  UPDATE_ALARM_FAILURE,
  DELETE_ALARM,
  DELETE_ALARM_SUCCESS,
  DELETE_ALARM_FAILURE,
} from '../reducers/alarm';

// get alarm list
function getAlarmAPI(tokenData) {
  return axios.get('http://localhost:8000/alarmList/', {
    headers: { 'x-access-token': tokenData.token },
  });
}

function* getAlarm(action) {
  try {
    const result = yield call(getAlarmAPI, action.data);
    yield put({
      type: GET_ALARM_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: GET_ALARM_FAILURE,
      error: err.response.status,
    });
  }
}

function* watchGetAlarm() {
  yield takeEvery(GET_ALARM, getAlarm);
}

// get alarm info
function getAlarmInfoAPI(apiData) {
  return axios.get(`http://localhost:8000/alarmList/${apiData.id}`, {
    headers: { 'x-access-token': apiData.token },
  });
}

function* getAlarmInfo(action) {
  try {
    const result = yield call(getAlarmInfoAPI, action.data);
    yield put({
      type: GET_ALARM_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: GET_ALARM_INFO_FAILURE,
      error: err.response.status,
    });
  }
}

function* watchGetAlarmInfo() {
  yield takeEvery(GET_ALARM_INFO, getAlarmInfo);
}

// add alarm
function addAlarmAPI(apiData) {
  return axios.post('http://localhost:8000/alarmList/', apiData.postData, {
    headers: { 'x-access-token': apiData.token },
  });
}

function* addAlarm(action) {
  try {
    yield call(addAlarmAPI, action.data);
    yield put({
      type: ADD_ALARM_SUCCESS,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: ADD_ALARM_FAILURE,
      error: err.response.status,
    });
  }
}

function* watchAddAlarm() {
  yield takeEvery(ADD_ALARM, addAlarm);
}

// update alarm
function updateAlarmAPI(apiData) {
  return axios.put('http://localhost:8000/alarmList/', apiData.putData, {
    headers: { 'x-access-token': apiData.token },
  });
}

function* updateAlarm(action) {
  try {
    yield call(updateAlarmAPI, action.data);
    yield put({
      type: UPDATE_ALARM_SUCCESS,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: UPDATE_ALARM_FAILURE,
      error: err.response.status,
    });
  }
}

function* watchUpdateAlarm() {
  yield takeEvery(UPDATE_ALARM, updateAlarm);
}

// delete alarm
function deleteAlarmAPI(apiData) {
  return axios.delete(
    `http://localhost:8000/alarmList/${apiData.deleteData.id}`,
    {
      headers: { 'x-access-token': apiData.token },
    },
  );
}

function* deleteAlarm(action) {
  try {
    yield call(deleteAlarmAPI, action.data);
    yield put({
      type: DELETE_ALARM_SUCCESS,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: DELETE_ALARM_FAILURE,
      error: err.response.status,
    });
  }
}

function* watchDeleteAlarm() {
  yield takeEvery(DELETE_ALARM, deleteAlarm);
}

export default function* alarmSaga() {
  yield all([
    fork(watchGetAlarm),
    fork(watchAddAlarm),
    fork(watchGetAlarmInfo),
    fork(watchUpdateAlarm),
    fork(watchDeleteAlarm),
  ]);
}
