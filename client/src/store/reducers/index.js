import { combineReducers } from "redux";

import posts from "./posts.js";
import auth from "./auth.js";

export default combineReducers({
  posts: posts,
  auth: auth,
});
