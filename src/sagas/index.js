import { all, fork } from 'redux-saga/effects';
import user from './user';

export default function* rootSage() {
  yield all([fork(user)]);
}
