import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { useMediaQuery } from "react-responsive";
import { likePost } from "../../../store/actions/posts.js";
import { TestAudioPlayer, Modal } from "../../index.js";

import {
  GoodLi,
  BottomDiv,
  CreatorLink,
  LikeCountContainer,
  FlexContainer,
  HeartIcon,
  TagLabel,
  FilledHeartIcon,
  AudioContainer,
  LikeFlexContainer,
  TitleLink,
  ImageFlexContainer,
  TagFlexContainer,
  StyledImage,
} from "./Post.elements.js";
import Posts from "../Posts.jsx";

const Post = ({ post }) => {
  const history = useHistory();
  const shouldTagsShow = useMediaQuery({ query: "(max-width: 1300px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 960px)" });
  const isSmallPhone = useMediaQuery({ query: "(max-width: 500px)" });
  const [isLiked, setLiked] = useState(false);
  const [numLikes, setLikes] = useState(post.likes.length);
  const [isModalVisible, setModalVisibility] = useState(false);
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setLiked(post.likes.includes(user?.result._id));
  }, [post.likes, user?.result._id]);

  return (
    <>
      <GoodLi>
        <ImageFlexContainer>
          <StyledImage
            src={post.imageFileUrl}
            height={isTabletOrMobile ? "30px" : "50px"}
            width={isTabletOrMobile ? "30px" : "50px"}
            onClick={() => {
              history.push(`/p/${post._id}`);
            }}
            alt="file cover"
          />
        </ImageFlexContainer>
        <FlexContainer>
          <TitleLink
            onClick={() => {
              history.push(`/p/${post._id}`);
            }}
            smallFont={post.title.length > 32}
            verySmallFont={isSmallPhone && post.title.length > 23}
          >
            {post.title}
          </TitleLink>
          <BottomDiv>
            Posted {moment(post.createdAt).fromNow()} by&nbsp;
            <CreatorLink to={`/u/${post.creator_username}`}>
              {post.creator_username}
            </CreatorLink>
          </BottomDiv>
        </FlexContainer>
        {!shouldTagsShow && (
          <TagFlexContainer>
            {post.tags.map((tag, index) => {
              return (
                tag.length > 0 && (
                  <TagLabel
                    key={index}
                    onClick={() => history.push(`/t/${tag}`)}
                  >
                    #{tag}
                  </TagLabel>
                )
              );
            })}
          </TagFlexContainer>
        )}
        {!isTabletOrMobile ? (
          <FlexContainer>
            <TestAudioPlayer fileUrl={post.fileUrl} title={post.title} />
          </FlexContainer>
        ) : (
          <></>
        )}
        <LikeFlexContainer>
          <LikeCountContainer smallFont={isTabletOrMobile}>
            {Intl.NumberFormat("en-US").format(numLikes)}
          </LikeCountContainer>
          {!isLiked ? (
            <HeartIcon
              onClick={() => {
                if (user) {
                  setLiked(!isLiked);
                  setLikes(post.likes.length + 1);
                  dispatch(likePost(post._id));
                } else {
                  setModalVisibility(true);
                }
              }}
            />
          ) : (
            <FilledHeartIcon
              onClick={() => {
                if (user) {
                  setLiked(!isLiked);
                  setLikes(post.likes.length - 1);
                  dispatch(likePost(post._id));
                } else {
                  setModalVisibility(true);
                }
              }}
            />
          )}
        </LikeFlexContainer>
      </GoodLi>
      {isModalVisible && (
        <Modal
          onClose={() => setModalVisibility(false)}
          title="You must be logged in to like a post"
        />
      )}
    </>
  );
};

export default Post;
