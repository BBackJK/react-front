import { combineReducers } from 'redux';

import user from './user';
import weather from './weather';
import follow from './follow';
import alarm from './alarm';

const rootReducer = combineReducers({
  user,
  weather,
  follow,
  alarm,
});

export default rootReducer;
