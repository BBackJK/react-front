import { all, fork, takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';

import {
  ADD_FOLLOW,
  ADD_FOLLOW_SUCCESS,
  ADD_FOLLOW_FAILURE,
  GET_FOLLOWER,
  GET_FOLLOWER_SUCCESS,
  GET_FOLLOWER_FAILURE,
  GET_FOLLOWED,
  GET_FOLLOWED_SUCCESS,
  GET_FOLLOWED_FAILURE,
  ACCEPT_FOLLOWED,
  ACCEPT_FOLLOWED_SUCCESS,
  ACCEPT_FOLLOWED_FAILURE,
  DELETE_FOLLOWER,
  DELETE_FOLLOWER_SUCCESS,
  DELETE_FOLLOWER_FAILURE,
} from '../reducers/follow';

// add follow
function addFollowAPI(apiData) {
  return axios.post('http://localhost:8000/follow/', apiData.postData, {
    headers: { 'x-access-token': apiData.token },
  });
}

function* addFollow(action) {
  try {
    yield call(addFollowAPI, action.data);
    yield put({
      type: ADD_FOLLOW_SUCCESS,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: ADD_FOLLOW_FAILURE,
      error: err.response.status,
    });
  }
}

function* watchAddFollow() {
  yield takeEvery(ADD_FOLLOW, addFollow);
}

// get follower
function getFollowerAPI(tokenData) {
  return axios.get('http://localhost:8000/follow/', {
    headers: { 'x-access-token': tokenData.token },
  });
}

function* getFollower(action) {
  try {
    const result = yield call(getFollowerAPI, action.data);
    yield put({
      type: GET_FOLLOWER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: GET_FOLLOWER_FAILURE,
      error: err.response.status,
    });
  }
}

function* watchGetFollower() {
  yield takeEvery(GET_FOLLOWER, getFollower);
}

// get followed
function getFollowedAPI(tokenData) {
  return axios.get('http://localhost:8000/follow/my/', {
    headers: { 'x-access-token': tokenData.token },
  });
}

function* getFollowed(action) {
  try {
    const result = yield call(getFollowedAPI, action.data);
    yield put({
      type: GET_FOLLOWED_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: GET_FOLLOWED_FAILURE,
      error: err.response.status,
    });
  }
}

function* watchGetFollowed() {
  yield takeEvery(GET_FOLLOWED, getFollowed);
}

// accept followed
function acceptFollowedAPI(apiData) {
  return axios.put('http://localhost:8000/follow/', apiData.putData, {
    headers: { 'x-access-token': apiData.token },
  });
}

function* acceptFollowed(action) {
  try {
    yield call(acceptFollowedAPI, action.data);
    yield put({
      type: ACCEPT_FOLLOWED_SUCCESS,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: ACCEPT_FOLLOWED_FAILURE,
      error: err.response.status,
    });
  }
}

function* watchAcceptFollowed() {
  yield takeEvery(ACCEPT_FOLLOWED, acceptFollowed);
}

// delete follower
function deleteFollowerAPI(apiData) {
  return axios.delete(`http://localhost:8000/follow/${apiData.deleteData.id}`, {
    headers: { 'x-access-token': apiData.token },
  });
}

function* deleteFollower(action) {
  try {
    yield call(deleteFollowerAPI, action.data);
    yield put({
      type: DELETE_FOLLOWER_SUCCESS,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: DELETE_FOLLOWER_FAILURE,
      error: err.response.status,
    });
  }
}

function* watchDeleteFollower() {
  yield takeEvery(DELETE_FOLLOWER, deleteFollower);
}

export default function* userSaga() {
  yield all([
    fork(watchAddFollow),
    fork(watchGetFollower),
    fork(watchGetFollowed),
    fork(watchAcceptFollowed),
    fork(watchDeleteFollower),
  ]);
}
