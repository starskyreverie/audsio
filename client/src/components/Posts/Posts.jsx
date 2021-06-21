import React from "react";
import Post from "./Post/Post.jsx";
import { Box, CircularProgress } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const Posts = () => {
  const posts = useSelector((state) => state.posts);

  return !posts.length ? (
    <Box mt={60}>
      <CircularProgress isIndeterminate color="#fd4d4d" />
    </Box>
  ) : (
    <>
      <ul>
        {posts?.map((post) => (
          <Post post={post} />
        ))}
      </ul>
    </>
  );
};

export default Posts;
