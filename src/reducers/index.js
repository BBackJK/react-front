import { combineReducers } from 'redux';

import user from './user';
import weather from './weather';
import follow from './follow';

const rootReducer = combineReducers({
  user,
  weather,
  follow,
});

export default rootReducer;
