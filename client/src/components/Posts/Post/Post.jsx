import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { useMediaQuery } from "react-responsive";
import { likePost } from "../../../store/actions/posts.js";
import { AudioPlayer, Modal } from "../../index.js";

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
  TitleLink,
  ImageFlexContainer,
  StyledImage,
} from "./Post.elements.js";

const Post = ({ post }) => {
  const history = useHistory();
  const shouldTagsShow = useMediaQuery({ query: "(max-width: 1200px)" });
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
            smallFont={post.title.length > 23}
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
          <FlexContainer>
            {post.tags[0].length > 0 && (
              <>
                <TagLabel>{`#${post.tags[0]}`}</TagLabel>
                {post.tags[1] && <TagLabel>{`#${post.tags[1]}`}</TagLabel>}
              </>
            )}
            {post.tags.length > 2 && (
              <TagLabel>{`+${post.tags.length - 2}`}</TagLabel>
            )}
          </FlexContainer>
        )}
        {!isTabletOrMobile ? (
          <FlexContainer>
            <AudioContainer>
              <AudioPlayer fileUrl={post.fileUrl} />
            </AudioContainer>
          </FlexContainer>
        ) : (
          <></>
        )}
        <FlexContainer>
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
              small={isTabletOrMobile}
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
              small={isTabletOrMobile}
            />
          )}
        </FlexContainer>
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
