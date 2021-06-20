import React from "react";
import Post from "./Post/Post.jsx";
import { CircularProgress } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts);

  return !posts.length ? (
    <CircularProgress isIndeterminate color="#fd4d4d" />
  ) : (
    <>
      <ul>
        {posts?.map((post) => (
          <Post post={post} setCurrentId={setCurrentId} />
        ))}
      </ul>
    </>
  );
};

export default Posts;
