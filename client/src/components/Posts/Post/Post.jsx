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

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setLiked(post.likes.includes(user?.result._id));
  }, [post.likes, user?.result._id]);

  return (
    <GoodLi>
      <FlexContainer>
        <span>{post.title}</span>
        <BottomDiv>
          Posted {moment(post.createdAt).fromNow()} by&nbsp;
          <CreatorLink to={`/u/${post.creator_username}`}>
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
              if (user) {
                setLiked(!isLiked);
                dispatch(likePost(post._id));
              } else {
                window.alert("u need to be logged in to do that");
              }
            }}
          />
        ) : (
          <FilledHeartIcon
            onClick={() => {
              if (user) {
                setLiked(!isLiked);
                dispatch(likePost(post._id));
              } else {
                window.alert("u need to be logged in to do that");
              }
            }}
          />
        )}
      </FlexContainer>
    </GoodLi>
  );
};

export default Post;
