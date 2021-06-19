import Post from "../models/Post.js";

export const getPosts = async (req, res) => {
  try {
    const Posts = await Post.find();
    res.status(200).json(Posts);
  } catch (e) {
    res.status(404).json(e);
  }
};

export const createPost = async (req, res) => {
  const newPost = new Post(req.body);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (e) {
    res.status(500).json(e);
  }
};
