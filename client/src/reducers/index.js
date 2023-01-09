import { combineReducers } from "redux";

import posts from './posts';
import auth from './auth';

// 结合所有的reducers
export default combineReducers({
  posts,
  auth
})