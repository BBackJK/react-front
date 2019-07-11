import {
  all,
  fork,
  takeEvery,
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
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
  GET_INFO,
  GET_INFO_SUCCESS,
  GET_INFO_FAILURE,
  INFO_UPDATE,
  INFO_UPDATE_SUCCESS,
  INFO_UPDATE_FAILURE,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  SEARCH_USER,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_FAILURE,
} from '../reducers/user';

// login
function loginAPI(loginData) {
  return axios.post('http://localhost:8000/auth', loginData);
}

function* login(action) {
  try {
    const result = yield call(loginAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.status,
    });
  }
}

function* watchLogin() {
  yield takeEvery(LOG_IN, login);
}

// logout
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

// sign up
function signUpAPI(signUpData) {
  return axios.post('http://localhost:8000/user', signUpData);
}

function* signUp(action) {
  try {
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

// get info
function getInfoAPI(tokenData) {
  return axios.get('http://localhost:8000/auth/me', {
    headers: { 'x-access-token': tokenData.token },
  });
}

function* getInfo(action) {
  try {
    const result = yield call(getInfoAPI, action.data);
    yield put({
      type: GET_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: GET_INFO_FAILURE,
      error: err.response.status,
    });
  }
}

function* watchGetInfo() {
  yield takeLatest(GET_INFO, getInfo);
}

// info update
function infoUpdateAPI(apiData) {
  return axios.put('http://localhost:8000/user', apiData.updateData, {
    headers: { 'x-access-token': apiData.token },
  });
}

function* infoUpdate(action) {
  try {
    const result = yield call(infoUpdateAPI, action.data);
    yield put({
      type: INFO_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: INFO_UPDATE_FAILURE,
      error: err.response.status,
    });
  }
}

function* watchUpdateInfo() {
  yield takeEvery(INFO_UPDATE, infoUpdate);
}

// delete user
function deleteUserAPI(tokenData) {
  return axios.delete('http://localhost:8000/user', {
    headers: { 'x-access-token': tokenData.token },
  });
}

function* deleteUser(action) {
  try {
    yield call(deleteUserAPI, action.data);
    yield put({
      type: DELETE_USER_SUCCESS,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: DELETE_USER_FAILURE,
      error: err.response.status,
    });
  }
}

function* watchDeleteUser() {
  yield takeEvery(DELETE_USER, deleteUser);
}

// search user
function searchUserAPI(searchData) {
  return axios.get(`http://localhost:8000/user/${searchData}`);
}

function* searchUser(action) {
  try {
    const result = yield call(searchUserAPI, action.data);
    yield put({
      type: SEARCH_USER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: SEARCH_USER_FAILURE,
      error: err.response.status,
    });
  }
}

function* watchSearchUser() {
  yield takeEvery(SEARCH_USER, searchUser);
}

export default function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchSignUp),
    fork(watchLogout),
    fork(watchGetInfo),
    fork(watchUpdateInfo),
    fork(watchDeleteUser),
    fork(watchSearchUser),
  ]);
}
