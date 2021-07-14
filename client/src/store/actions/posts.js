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
} from "./actionTypes.js";

import * as api from "../api/index.js";

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);

    dispatch({ type: CREATE, payload: data });

    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const queryPosts = (query) => async (dispatch) => {
  try {
    const { data } = await api.queryPosts(query);
    dispatch({ type: QUERY_POSTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getLikedPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchLikedPosts();
    dispatch({ type: FETCH_LIKED_POSTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getTaggedPosts = (tag) => async (dispatch) => {
  try {
    const { data } = await api.fetchTaggedPosts(tag);
    dispatch({ type: FETCH_TAGGED_POSTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getPostsByCreator = (creatorUsername) => async (dispatch) => {
  try {
    const { data } = await api.fetchPostsByCreator(creatorUsername);
    dispatch({ type: FETCH_POSTS_BY_CREATOR, payload: data });
  } catch (error) {}
};
