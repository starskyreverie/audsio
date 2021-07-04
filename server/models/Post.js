// Post object schema

import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
  title: String,
  message: String,
  creator_id: String,
  creator_username: String,
  tags: [String],
  fileUrl: String,
  imageFileUrl: String,
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Post = mongoose.model("Post", PostSchema);

export default Post;
