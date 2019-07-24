import { all, fork, takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';

import {
  SEND_MESSAGE,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAILURE,
  GET_RECEIVE_MESSAGE,
  GET_RECEIVE_MESSAGE_SUCCESS,
  GET_RECEIVE_MESSAGE_FAILURE,
  GET_RECEIVE_MESSAGE_INFO,
  GET_RECEIVE_MESSAGE_INFO_SUCCESS,
  GET_RECEIVE_MESSAGE_INFO_FAILURE,
  READ_RECEIVE_MESSAGE,
  READ_RECEIVE_MESSAGE_SUCCESS,
  READ_RECEIVE_MESSAGE_FAILURE,
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

// get receive message list
function* watchSendMessage() {
  yield takeEvery(SEND_MESSAGE, sendMessage);
}

function getReceiveMessageAPI(tokenData) {
  return axios.get('http://localhost:8000/send/receive', {
    headers: { 'x-access-token': tokenData.token },
  });
}

function* getReceiveMessage(action) {
  try {
    const result = yield call(getReceiveMessageAPI, action.data);
    yield put({
      type: GET_RECEIVE_MESSAGE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: GET_RECEIVE_MESSAGE_FAILURE,
      error: err.response.status,
    });
  }
}

function* watchGetReceiveMessage() {
  yield takeEvery(GET_RECEIVE_MESSAGE, getReceiveMessage);
}

// get receive message info
function getReceiveMessageInfoAPI(apiData) {
  return axios.get(`http://localhost:8000/send/receive/${apiData.id}`, {
    headers: { 'x-access-token': apiData.token },
  });
}

function* getReceiveMessageInfo(action) {
  try {
    const result = yield call(getReceiveMessageInfoAPI, action.data);
    yield put({
      type: GET_RECEIVE_MESSAGE_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: GET_RECEIVE_MESSAGE_INFO_FAILURE,
      error: err.response.status,
    });
  }
}

function* watchGetReceiveMessageInfo() {
  yield takeEvery(GET_RECEIVE_MESSAGE_INFO, getReceiveMessageInfo);
}

// read receive message
function readReceiveMessageAPI(apiData) {
  return axios.put('http://localhost:8000/send', apiData.putData, {
    headers: { 'x-access-token': apiData.token },
  });
}

function* readReceiveMessage(action) {
  try {
    yield call(readReceiveMessageAPI, action.data);
    yield put({
      type: READ_RECEIVE_MESSAGE_SUCCESS,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: READ_RECEIVE_MESSAGE_FAILURE,
      error: err.response.status,
    });
  }
}

function* watchReadReceiveMessage() {
  yield takeEvery(READ_RECEIVE_MESSAGE, readReceiveMessage);
}

export default function* sendSaga() {
  yield all([
    fork(watchSendMessage),
    fork(watchGetReceiveMessage),
    fork(watchGetReceiveMessageInfo),
    fork(watchReadReceiveMessage),
  ]);
}
