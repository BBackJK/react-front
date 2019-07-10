import { all, fork } from 'redux-saga/effects';

import user from './user';
import weather from './weather';

export default function* rootSage() {
  yield all([fork(user), fork(weather)]);
}
