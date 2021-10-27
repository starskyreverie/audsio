import axios from "axios";

const ApiURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://eriv.herokuapp.com/";

const API = axios.create({ baseURL: ApiURL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("user")).token
    }`;
  }

  return req;
});

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts`);
export const fetchLikedPosts = () => API.get(`/posts/liked`);
export const fetchTaggedPosts = (tag) => API.get(`/posts/t/${tag}`);
export const fetchPostsByCreator = (creatorUsername) =>
  API.get(`/posts/byCreator/${creatorUsername}`);
export const queryPosts = (query) =>
  API.get(
    `/posts/search?q=${query.keywordQuery || '""'}&tags=${query.tagQuery}`
  );
export const createPost = (newPost) => {
  const formData = new FormData();

  formData.append("creator_username", newPost.creatorUsername);
  formData.append("title", newPost.title);
  formData.append("message", newPost.message);
  formData.append("tags", newPost.tags.split(" ").join(","));
  formData.append("files", newPost.file);
  formData.append("files", newPost.imageFile);

  return API.post("/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value, id) =>
  API.post(`/posts/${id}/commentPost`, { value });
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const login = (formData) => API.post("/users/login", formData);
export const signUp = (formData) => API.post("/users/signup", formData);
export const getUser = (username) => API.get(`/users/${username}`);
