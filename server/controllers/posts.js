import mongoose from "mongoose";
import Fuse from "fuse.js";

import Post from "../models/Post.js";
import { uploadAudioToS3, uploadImageToS3 } from "./s3.js";
import User from "../models/User.js";

export const getPosts = async (req, res) => {
  // get all posts from the database and return them
  try {
    const Posts = await Post.find();
    res.status(200).json(Posts);
  } catch (e) {
    res.status(404).json(e);
  }
};

export const getPost = async (req, res) => {
  // get a post given the id and return it
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ errorMessage: error.message });
  }
};

export const createPost = async (req, res) => {
  // store a post in the database; must be authorized
  if (!req.userId) {
    return res
      .status(401)
      .json({ errorMessage: "You must login to create a post." });
  }

  if (req.files.length < 2) {
    return res.status(400).json({
      errorMessage: "The post must contain both an audio and image file.",
    });
  }

  const audioFile = req.files[0];
  const imageFile = req.files[1];

  if (
    audioFile.originalname.split(".").pop() != "ogg" &&
    audioFile.originalname.split(".").pop() != "mp3" &&
    audioFile.originalname.split(".").pop() != "wav"
  ) {
    return res.status(400).json({
      errorMessage:
        "The provided file isn't an accepted filetype. The only allowed file extensions are .mp3, .wav, and .ogg.",
    });
  }

  if (
    imageFile.originalname.split(".").pop().toLowerCase() != "jpg" &&
    imageFile.originalname.split(".").pop().toLowerCase() != "jpeg" &&
    imageFile.originalname.split(".").pop().toLowerCase() != "png" &&
    imageFile.originalname.split(".").pop().toLowerCase() != "svg" &&
    imageFile.originalname.split(".").pop().toLowerCase() != "jfif" &&
    imageFile.originalname.split(".").pop().toLowerCase() != "pjpeg" &&
    imageFile.originalname.split(".").pop().toLowerCase() != "pjp" &&
    imageFile.originalname.split(".").pop().toLowerCase() != "gif"
  ) {
    return res.status(400).json({
      errorMessage:
        "The provided file isn't an accepted filetype. The only allowed file extensions are .jpg, .jpeg, .png, .svg, .gif, .jfif, .pjpeg, and .pjp.",
    });
  }

  if (!req.body.title) {
    return res
      .status(400)
      .json({ errorMessage: "Your post must have a title." });
  }

  if (req.body.title.length < 2 || req.body.title.length > 36) {
    return res.status(400).json({
      errorMessage: `The post title must be between 2 and 36 characters long. It currently has ${req.body.title.length} characters.`,
    });
  }

  const hasTagWithMoreThanXChars = (x) => {
    console.log(req.body.tags);
    console.log(req.body.tags.split(","));
    for (const tag of req.body.tags.split(",")) {
      console.log(tag);
      if (tag.length > x) {
        return true;
      }
    }
    return false;
  };

  if (req.body.tags && req.body.tags.split(",").length > 4) {
    return res.status(400).json({
      errorMessage: `The post must only have up to 4 tags. It currently has ${
        req.body.tags.split(",").length
      } tags.`,
    });
  }

  if (req.body.tags && hasTagWithMoreThanXChars(18)) {
    return res.status(400).json({
      errorMessage: "All tags must be 18 characters or shorter.",
    });
  }

  // upload to S3 and store the URL from result.Location
  const audioFileResult = await uploadAudioToS3(audioFile);
  console.log(audioFileResult);
  const imageFileResult = await uploadImageToS3(imageFile);
  const newPost = new Post({
    title: req.body.title,
    message: req.body.message,
    creator_id: req.userId,
    creator_username: req.body.creator_username,
    tags: req.body.tags.split(","),
    fileUrl: `${audioFileResult.Location}?versionId=${audioFileResult.VersionId}`,
    imageFileUrl: `${imageFileResult.Location}?versionId=${imageFileResult.VersionId}`,
    createdAt: new Date().toISOString(),
  });

  try {
    // save the created post to mongodb and send it back
    const post = await newPost.save();
    const user = await User.findById(req.userId);
    user.posts.push(post._id);
    await User.findByIdAndUpdate(req.userId, user, { new: true });
    res.status(201).json(newPost);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  //make sure the id exists
  if (!mongoose.Types.ObjectId.isValid(id))
    return res
      .status(404)
      .json({ errorMessage: `There's no post with that id ({id: ${id}})` });

  //remove it and send success msg
  await Post.findByIdAndRemove(id);

  res.status(200).json({
    successMessage: "Post successfully deleted.",
  });
};

export const likePost = async (req, res) => {
  //must be authorized
  if (!req.userId) {
    res.status(401).json({ errorMessage: "You must login to like a post.." });
  }

  const postId = req.params.id;
  // check if the post id exists
  if (!mongoose.Types.ObjectId.isValid(postId))
    return res
      .status(404)
      .json({ errorMessage: `There's no post with that id ({id: ${id}})` });

  // find the post, then see if the user has liked it
  const post = await Post.findById(postId);
  const user = await User.findById(req.userId);
  const index = post.likes.findIndex((value) => value === String(req.userId));

  if (index === -1) {
    // user hasn't liked it yet, so this is a liking action
    post.likes.push(req.userId);
    user.likedPosts.push(postId);
  } else {
    // user has already liked it, so this is an unliking action
    post.likes = post.likes.filter((value) => value !== String(req.userId));
    user.likedPosts = user.likedPosts.filter(
      (value) => value !== String(postId)
    );
  }
  // update and return the updated post
  const updatedPost = await Post.findByIdAndUpdate(postId, post, { new: true });
  await User.findByIdAndUpdate(req.userId, user, { new: true });
  res.status(200).json(updatedPost);
};

export const queryPosts = async (req, res) => {
  // get the keyword and tag search
  const { q, tags } = req.query;

  try {
    // filter posts based on whether the title/message contain the keyword or if any of the tags are present
    const posts = await Post.find();

    const options = {
      isCaseSensitive: false,
      shouldSort: true,
      // findAllMatches: false,
      // minMatchCharLength: 1,
      // location: 0,
      // threshold: 0.6,
      // distance: 100,
      // useExtendedSearch: false,
      // ignoreLocation: false,
      // ignoreFieldNorm: false,
      keys: [
        { name: "title", weight: 8 },
        { name: "message", weight: 1 },
        { name: "creator_username", weight: 2 },
        { name: "tags", weight: 64 },
      ],
    };

    const fuse = new Fuse(posts, options);
    const filteredPosts = fuse
      .search({
        $or: [
          { title: q },
          { message: q },
          { creator_username: q },
          { tags: tags },
        ],
      })
      .map((filteredPosts) => filteredPosts.item);

    /*if (tags) {
      posts = await Post.find({
        $or: [
          { title: keyword },
          { tags: { $in: tags.split(",") } },
          { message: keyword },
        ],
      });
    } else {
      posts = await Post.find({
        $or: [{ title: keyword }, { message: keyword }],
      });
    } */

    res.status(200).json(filteredPosts);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const getLikedPosts = async (req, res) => {
  if (!req.userId) {
    return res.status(403).json({
      errorMessage: "You must login to view this page.",
    });
  }
  const user = await User.findById(req.userId);
  try {
    const likedPosts = user.likedPosts;
    const posts = await Post.find({ _id: { $in: likedPosts } });
    res.status(200).json(posts);
  } catch {
    res.status(404).json(e);
  }
};

export const getTaggedPosts = async (req, res) => {
  const { tag } = req.params;
  const regex = new RegExp(tag, "i");
  try {
    const posts = await Post.find({ tags: regex });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const getPostsByCreator = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username: username });
    const posts = await Post.find({ _id: { $in: user.posts } });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
