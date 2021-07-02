import React from "react";
import { useParams } from "react-router-dom";
import { PostDetailsContainer } from "./PostDetails.elements.js";

const PostDetails = () => {
  const { id } = useParams();
  return (
    <PostDetailsContainer>
      post id:
      <div>{id}</div>
    </PostDetailsContainer>
  );
};

export default PostDetails;
