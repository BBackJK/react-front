import { all, fork } from 'redux-saga/effects';

import user from './user';
import weather from './weather';
import follow from './follow';

export default function* rootSage() {
  yield all([fork(user), fork(weather), fork(follow)]);
}
