import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../store/actions/posts.js";
import {
  CoolText,
  CoolTextContainer,
} from "../NotFoundPage/NotFound.elements.js";
import {
  HeaderText,
  HeaderTextContainer,
} from "../ProfilePage/Profile.elements.js";

import { RedSmallButton } from "../../globalStyles.js";
import { ProfileContainer } from "../ProfilePage/Profile.elements.js";
import { Box, CircularProgress } from "@chakra-ui/react";
import { AudioPlayer, PostsByCreatorSection } from "../../components/index.js";

const getMatchingPostId = (state, id) => {
  let bob;
  state.forEach((post) => {
    if (post._id === id) {
      bob = post;
    }
  });

  return bob;
};

const PostDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [userDataLoading, setUserDataLoading] = useState(false);
  const [error, setError] = useState(false);
  const post = useSelector((state) => state.posts);

  useEffect(() => {
    setUserDataLoading(true);
    const fetchData = async () => {
      const data = await dispatch(getPosts(id));
      setUserDataLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      {error ? (
        <CoolTextContainer>
          <CoolText>Sorry, no post with that ID exists.</CoolText>
        </CoolTextContainer>
      ) : (
        <>
          <ProfileContainer>
            {userDataLoading ? (
              <Box mt={30}>
                <CircularProgress isIndeterminate color="#fd4d4d" />
              </Box>
            ) : (
              <HeaderTextContainer>
                <HeaderText>{getMatchingPostId(post, id)?.title}</HeaderText>
                <AudioPlayer fileUrl={getMatchingPostId(post, id)?.fileUrl} />
              </HeaderTextContainer>
            )}
          </ProfileContainer>
        </>
      )}
    </>
  );
};

export default PostDetails;
