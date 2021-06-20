import { combineReducers } from "redux";

import posts from "./posts.js";

export default combineReducers({
  posts: posts,
});
