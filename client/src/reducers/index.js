import { combineReducers } from "redux";

import posts from './posts';

// 结合所有的reducers
export default combineReducers({
  posts,
})