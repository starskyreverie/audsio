import express from "express";
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
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const result = await uploadAudioToS3(req.file);
  console.log(result);
  const newPost = new Post({
    title: req.body.title,
    message: req.body.message,
    creator: req.body.creator,
    tags: req.body.tags.split(","),
    fileUrl: result.Location,
  });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (e) {
    res.status(500).json(e);
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await Post.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
};

export const likePost = async (req, res) => {
  const id = req.params.id;
  const value = parseInt(req.params.value);

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const post = await Post.findById(id);

  const updatedPost = await Post.findByIdAndUpdate(
    id,
    { likeCount: post.likeCount + (value === 0 ? -1 : 1) },
    { new: true }
  );

  res.json(updatedPost);
};
