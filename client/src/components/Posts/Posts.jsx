import React from "react";
import Post from "./Post/Post.jsx";
import { Box, CircularProgress } from "@chakra-ui/react";
import { useSelector } from "react-redux";

import { GoodUl } from "./Posts.elements.js";

const Posts = () => {
  const posts = useSelector((state) => state.posts);

  console.log(posts);

  return !posts.length ? (
    <Box mt={60}>
      <CircularProgress isIndeterminate color="#fd4d4d" />
    </Box>
  ) : (
    <>
      <GoodUl>
        {posts?.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </GoodUl>
    </>
  );
};

export default Posts;
