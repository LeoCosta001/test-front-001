import { combineReducers } from 'redux';

import themeOptions from './themeOptions';
import userInfo from './userInfo';
import editMode from './editMode';
import alerts from './alerts';

export default combineReducers({
  themeOptions,
  userInfo,
  editMode,
  alerts,
});
