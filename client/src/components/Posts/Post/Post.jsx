import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";

import { likePost } from "../../../store/actions/posts.js";

import {
  GoodLi,
  BottomDiv,
  CreatorLink,
  LikeCountContainer,
  FlexContainer,
  HeartIcon,
  TagLabel,
  FilledHeartIcon,
} from "./Post.elements.js";

const Post = ({ post }) => {
  const [isLiked, setLiked] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setLiked(
      post.likes.includes(JSON.parse(localStorage.getItem("user"))?.result._id)
    );
  }, [setLiked, post]);

  return (
    <GoodLi>
      <FlexContainer>
        <span>{post.title}</span>
        <BottomDiv>
          Posted {moment(post.createdAt).fromNow()} by&nbsp;
          <CreatorLink to={`/u/${post.creator}`}>
            {post.creator_username}
          </CreatorLink>
        </BottomDiv>
      </FlexContainer>
      <FlexContainer>
        {post.tags.map((tag) => {
          return <TagLabel>#{tag}</TagLabel>;
        })}
      </FlexContainer>
      <FlexContainer>
        <LikeCountContainer>
          {Intl.NumberFormat("en-US").format(post.likes.length)}
        </LikeCountContainer>
        {!isLiked ? (
          <HeartIcon
            onClick={() => {
              setLiked(!isLiked);
              dispatch(likePost(post._id));
            }}
          />
        ) : (
          <FilledHeartIcon
            onClick={() => {
              setLiked(!isLiked);
              dispatch(likePost(post._id));
            }}
          />
        )}
      </FlexContainer>
    </GoodLi>
  );
};

export default Post;
