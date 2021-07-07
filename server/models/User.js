// User object schema

import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  posts: [String],
  likedPosts: [String],
});

const User = mongoose.model("User", UserSchema);

export default User;
