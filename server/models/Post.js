import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
  title: String,
  message: String,
  creator_id: Number,
  creator_username: String,
  tags: [String],
  fileUrl: String,
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
