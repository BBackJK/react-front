import { combineReducers } from 'redux';

import user from './user';
import weather from './weather';
import follow from './follow';
import alarm from './alarm';
import message from './message';

const rootReducer = combineReducers({
  user,
  weather,
  follow,
  alarm,
  message,
});

export default rootReducer;
