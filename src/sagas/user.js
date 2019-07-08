import { all, fork, takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';

import {
  LOG_IN,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
} from '../reducers/user';

function loginAPI(loginData) {
  return axios.post('http://localhost:8000/auth', loginData);
}

function* login(action) {
  try {
    const result = yield call(loginAPI, action.data);
    console.log(result);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    const json = `${err.response.config.data}`;
    const obj = JSON.parse(json);
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.status,
      data: obj.sns_email,
    });
  }
}

function* watchLogin() {
  yield takeEvery(LOG_IN, login);
}

function logoutAPI() {
  return 'success';
}

function* logout(action) {
  try {
    yield call(logoutAPI, action.data);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: LOG_OUT_FAILURE,
    });
  }
}

function* watchLogout() {
  yield takeEvery(LOG_OUT, logout);
}

function signUpAPI(signUpData) {
  console.log('in signupAPI signUpData:', signUpData);
  return axios.post('http://localhost:8000/user', signUpData);
}

function* signUp(action) {
  try {
    console.log('in signup action.data:', action.data);
    yield call(signUpAPI, action.data);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.status,
    });
  }
}

function* watchSignUp() {
  yield takeEvery(SIGN_UP, signUp);
}

export default function* userSaga() {
  yield all([fork(watchLogin), fork(watchSignUp), fork(watchLogout)]);
}
