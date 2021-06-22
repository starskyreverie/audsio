import React, { useState } from "react";
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

const Post = ({ post, key }) => {
  const [isLiked, setLiked] = useState(false);
  const dispatch = useDispatch();

  return (
    <GoodLi key={key}>
      <FlexContainer>
        <span>{post.title}</span>
        <BottomDiv>
          Posted {moment(post.createdAt).fromNow()} by&nbsp;
          <CreatorLink to={`/users/${post.creator}`}>
            {post.creator}
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
          {Intl.NumberFormat("en-US").format(post.likeCount)}
        </LikeCountContainer>
        {!isLiked ? (
          <HeartIcon
            onClick={() => {
              setLiked(!isLiked);
              dispatch(likePost(post._id, 1));
            }}
          />
        ) : (
          <FilledHeartIcon
            onClick={() => {
              setLiked(!isLiked);
              dispatch(likePost(post._id, 0));
            }}
          />
        )}
      </FlexContainer>
    </GoodLi>
  );
};

export default Post;
