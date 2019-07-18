import { all, fork, takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';

import {
  SEND_EMAIL,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_FAILURE,
  AUTH_EMAIL,
  AUTH_EMAIL_SUCCESS,
  AUTH_EMAIL_FAILURE,
} from '../reducers/email';

function sendEmailAPI(tokenData) {
  return axios.get('http://localhost:8000/email/', {
    headers: { 'x-access-token': tokenData.token },
  });
}

function* sendEmail(action) {
  try {
    const result = yield call(sendEmailAPI, action.data);
    console.log(result);
    yield put({
      type: SEND_EMAIL_SUCCESS,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: SEND_EMAIL_FAILURE,
      error: err.response.status,
    });
  }
}

function* watchSendEmail() {
  yield takeEvery(SEND_EMAIL, sendEmail);
}

function authEmailAPI(apiData) {
  return axios.put('http://localhost:8000/email/', apiData.putData, {
    headers: { 'x-access-token': apiData.token },
  });
}

function* authEmail(action) {
  try {
    yield call(authEmailAPI, action.data);
    yield put({
      type: AUTH_EMAIL_SUCCESS,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: AUTH_EMAIL_FAILURE,
      error: err.response.status,
    });
  }
}

function* watchAuthEmail() {
  yield takeEvery(AUTH_EMAIL, authEmail);
}

export default function* emailSaga() {
  yield all([fork(watchSendEmail), fork(watchAuthEmail)]);
}
