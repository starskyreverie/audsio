import axios from "axios";

const ApiURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "http://eriv.herokuapp.com/";

const API = axios.create({ baseURL: ApiURL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts`);
export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );
export const createPost = (newPost) => {
  const formData = new FormData();

  formData.append("creator", newPost.creator);
  formData.append("title", newPost.title);
  formData.append("message", newPost.message);
  formData.append("tags", newPost.tags);
  formData.append("file", newPost.file);

  console.log(formData);

  return API.post("/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const likePost = (id, value) =>
  API.patch(`/posts/${id}/${value}/likePost`);
export const comment = (value, id) =>
  API.post(`/posts/${id}/commentPost`, { value });
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
