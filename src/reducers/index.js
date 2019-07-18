import { combineReducers } from 'redux';

import user from './user';
import weather from './weather';
import follow from './follow';
import alarm from './alarm';
import message from './message';
import send from './send';
import email from './email';

const rootReducer = combineReducers({
  user,
  weather,
  follow,
  alarm,
  message,
  send,
  email,
});

export default rootReducer;
