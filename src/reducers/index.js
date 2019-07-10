import { combineReducers } from 'redux';

import user from './user';
import weather from './weather';

const rootReducer = combineReducers({
  user,
  weather,
});

export default rootReducer;
