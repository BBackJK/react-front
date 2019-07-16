import { all, fork, takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';

import {
  ADD_MSG,
  ADD_MSG_SUCCESS,
  ADD_MSG_FAILURE,
  GET_MSG,
  GET_MSG_SUCCESS,
  GET_MSG_FAILURE,
  GET_MSG_INFO,
  GET_MSG_INFO_SUCCESS,
  GET_MSG_INFO_FAILURE,
  UPDATE_MSG,
  UPDATE_MSG_SUCCESS,
  UPDATE_MSG_FAILURE,
  DELETE_MSG,
  DELETE_MSG_SUCCESS,
  DELETE_MSG_FAILURE,
} from '../reducers/message';

// add message
function addMsgAPI(apiData) {
  return axios.post('http://localhost:8000/messages/', apiData.postData, {
    headers: { 'x-access-token': apiData.token },
  });
}

function* addMsg(action) {
  try {
    yield call(addMsgAPI, action.data);
    yield put({
      type: ADD_MSG_SUCCESS,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: ADD_MSG_FAILURE,
      error: err.response.status,
    });
  }
}

function* watchAddMsg() {
  yield takeEvery(ADD_MSG, addMsg);
}

// get message list
function getMsgAPI(tokenData) {
  return axios.get('http://localhost:8000/messages/', {
    headers: { 'x-access-token': tokenData.token },
  });
}

function* getMsg(action) {
  try {
    const result = yield call(getMsgAPI, action.data);
    yield put({
      type: GET_MSG_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: GET_MSG_FAILURE,
      error: err.response.status,
    });
  }
}

function* watchGetMsg() {
  yield takeEvery(GET_MSG, getMsg);
}

// get message info
function getMsgInfoAPI(apiData) {
  return axios.get(`http://localhost:8000/messages/${apiData.id}`, {
    headers: { 'x-access-token': apiData.token },
  });
}

function* getMsgInfo(action) {
  try {
    const result = yield call(getMsgInfoAPI, action.data);
    yield put({
      type: GET_MSG_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: GET_MSG_INFO_FAILURE,
      error: err.response.status,
    });
  }
}

function* watchGetMsgInfo() {
  yield takeEvery(GET_MSG_INFO, getMsgInfo);
}

// update message
function updateMsgAPI(apiData) {
  return axios.put('http://localhost:8000/messages/', apiData.putData, {
    headers: { 'x-access-token': apiData.token },
  });
}

function* updateMsg(action) {
  try {
    yield call(updateMsgAPI, action.data);
    yield put({
      type: UPDATE_MSG_SUCCESS,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: UPDATE_MSG_FAILURE,
      error: err.response.status,
    });
  }
}

function* watchUpdateMsg() {
  yield takeEvery(UPDATE_MSG, updateMsg);
}

// delete message
function deleteMsgAPI(apiData) {
  return axios.delete(
    `http://localhost:8000/messages/${apiData.deleteData.id}`,
    {
      headers: { 'x-access-token': apiData.token },
    },
  );
}

function* deleteMsg(action) {
  try {
    yield call(deleteMsgAPI, action.data);
    yield put({
      type: DELETE_MSG_SUCCESS,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: DELETE_MSG_FAILURE,
      error: err.response.status,
    });
  }
}

function* watchDeleteMsg() {
  yield takeEvery(DELETE_MSG, deleteMsg);
}

export default function* messageSaga() {
  yield all([
    fork(watchAddMsg),
    fork(watchGetMsg),
    fork(watchGetMsgInfo),
    fork(watchUpdateMsg),
    fork(watchDeleteMsg),
  ]);
}
