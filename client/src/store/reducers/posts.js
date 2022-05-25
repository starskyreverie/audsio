import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  QUERY_POSTS,
  FETCH_LIKED_POSTS,
  FETCH_TAGGED_POSTS,
  FETCH_POSTS_BY_CREATOR,
  FETCH_BY_ID,
} from "../actions/actionTypes.js";

const posts = (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case FETCH_BY_ID:
      return { posts: [action.payload] };
    case LIKE:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case CREATE:
      return [...posts, action.payload];
    case UPDATE:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case DELETE:
      return posts.filter((post) => post._id !== action.payload);
    case QUERY_POSTS:
      return action.payload;
    case FETCH_LIKED_POSTS:
      return action.payload;
    case FETCH_TAGGED_POSTS:
      return action.payload;
    case FETCH_POSTS_BY_CREATOR:
      return action.payload;
    default:
      return posts;
  }
};

export default posts;
