import Post from "../models/Post.js";
import { uploadAudioToS3 } from "./s3.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
  try {
    const Posts = await Post.find();
    res.status(200).json(Posts);
  } catch (e) {
    res.status(404).json(e);
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ errorMessage: error.message });
  }
};

export const createPost = async (req, res) => {
  if (!req.userId) {
    res.status(401).json({ errorMessage: "Unauthorized." });
  }
  const result = await uploadAudioToS3(req.file);

  const newPost = new Post({
    title: req.body.title,
    message: req.body.message,
    creator_id: req.userId,
    creator_username: req.body.creator_username,
    tags: req.body.tags.split(","),
    fileUrl: result.Location,
    createdAt: new Date().toISOString(),
  });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};

export const deletePost = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await Post.findByIdAndRemove(id);

  res.status(200).json({
    successMessage: "Post successfully deleted.",
  });
};

export const likePost = async (req, res) => {
  if (!req.userId) {
    res.status(401).json({ errorMessage: "Unauthorized." });
  }
  const postId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(postId))
    return res.status(404).send(`No post with id: ${postId}`);

  const post = await Post.findById(postId);

  const index = post.likes.findIndex((value) => value === String(req.userId));

  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((value) => value !== String(req.userId));
  }

  const updatedPost = await Post.findByIdAndUpdate(postId, post, { new: true });

  res.status(200).json(updatedPost);
};
