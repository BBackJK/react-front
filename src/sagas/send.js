import { all, fork, takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';

import {
  SEND_MESSAGE,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAILURE,
  GET_RECIEVE_MESSAGE,
  GET_RECIEVE_MESSAGE_SUCCESS,
  GET_RECIEVE_MESSAGE_FAILURE,
  GET_RECIEVE_MESSAGE_INFO,
  GET_RECIEVE_MESSAGE_INFO_SUCCESS,
  GET_RECIEVE_MESSAGE_INFO_FAILURE,
  READ_RECIEVE_MESSAGE,
  READ_RECIEVE_MESSAGE_SUCCESS,
  READ_RECIEVE_MESSAGE_FAILURE,
} from '../reducers/send';

// send message
function sendMessageAPI(apiData) {
  return axios.post('http://localhost:8000/send/', apiData.postData, {
    headers: { 'x-access-token': apiData.token },
  });
}

function* sendMessage(action) {
  try {
    yield call(sendMessageAPI, action.data);
    yield put({
      type: SEND_MESSAGE_SUCCESS,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: SEND_MESSAGE_FAILURE,
      error: err.response.status,
    });
  }
}

// get recieve message list
function* watchSendMessage() {
  yield takeEvery(SEND_MESSAGE, sendMessage);
}

function getRecieveMessageAPI(tokenData) {
  return axios.get('http://localhost:8000/send/recieve', {
    headers: { 'x-access-token': tokenData.token },
  });
}

function* getRecieveMessage(action) {
  try {
    const result = yield call(getRecieveMessageAPI, action.data);
    yield put({
      type: GET_RECIEVE_MESSAGE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: GET_RECIEVE_MESSAGE_FAILURE,
      error: err.response.status,
    });
  }
}

function* watchGetRecieveMessage() {
  yield takeEvery(GET_RECIEVE_MESSAGE, getRecieveMessage);
}

// get recieve message info
function getRecieveMessageInfoAPI(apiData) {
  return axios.get(`http://localhost:8000/send/recieve/${apiData.id}`, {
    headers: { 'x-access-token': apiData.token },
  });
}

function* getRecieveMessageInfo(action) {
  try {
    const result = yield call(getRecieveMessageInfoAPI, action.data);
    yield put({
      type: GET_RECIEVE_MESSAGE_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: GET_RECIEVE_MESSAGE_INFO_FAILURE,
      error: err.response.status,
    });
  }
}

function* watchGetRecieveMessageInfo() {
  yield takeEvery(GET_RECIEVE_MESSAGE_INFO, getRecieveMessageInfo);
}

// read recieve message
function readRecieveMessageAPI(apiData) {
  return axios.put('http://localhost:8000/send', apiData.putData, {
    headers: { 'x-access-token': apiData.token },
  });
}

function* readRecieveMessage(action) {
  try {
    yield call(readRecieveMessageAPI, action.data);
    yield put({
      type: READ_RECIEVE_MESSAGE_SUCCESS,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: READ_RECIEVE_MESSAGE_FAILURE,
      error: err.response.status,
    });
  }
}

function* watchReadRecieveMessage() {
  yield takeEvery(READ_RECIEVE_MESSAGE, readRecieveMessage);
}

export default function* sendSaga() {
  yield all([
    fork(watchSendMessage),
    fork(watchGetRecieveMessage),
    fork(watchGetRecieveMessageInfo),
    fork(watchReadRecieveMessage),
  ]);
}
