import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, fetchPost } from "../../store/actions/posts.js";
import { useMediaQuery } from "react-responsive";
import { useLocation } from "react-router";
import {
  CoolText,
  CoolTextContainer,
} from "../NotFoundPage/NotFound.elements.js";
import {
  HeaderText,
  HeaderTextContainer,
  AudioContainer,
} from "../ProfilePage/Profile.elements.js";

import { RedSmallButton } from "../../globalStyles.js";
import { ProfileContainer } from "../ProfilePage/Profile.elements.js";
import { Box, CircularProgress } from "@chakra-ui/react";
import {
  TestAudioPlayer,
  PostsByCreatorSection,
} from "../../components/index.js";
import { StyledImage } from "../../components/Posts/Post/Post.elements.js";

const getMatchingPostId = (state, id) => {
  if (state && state[0]._id === id) {
    return state[0];
  }
  return null;
};

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const PostDetails = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 580px)" });
  const query = useQuery();
  const [id, setId] = useState(query.get("postId"));
  const dispatch = useDispatch();
  const [userDataLoading, setUserDataLoading] = useState(false);
  const [error, setError] = useState(false);
  const post = useSelector((state) => state.posts.posts);

  useEffect(() => {
    setUserDataLoading(true);
    const fetchData = async () => {
      const data = await dispatch(fetchPost(id));
      if (data) {
        setError(true);
      }
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
              <>
                {getMatchingPostId(post, id) ? (
                  <>
                    {isTabletOrMobile ? (
                      <>
                        <HeaderTextContainer>
                          <StyledImage
                            src={getMatchingPostId(post, id).imageFileUrl}
                            height="50px"
                            width="50px"
                          />
                          <HeaderText>
                            {getMatchingPostId(post, id)?.title}
                          </HeaderText>
                        </HeaderTextContainer>
                        <AudioContainer>
                          <TestAudioPlayer
                            fileUrl={getMatchingPostId(post, id)?.fileUrl}
                          />
                        </AudioContainer>
                      </>
                    ) : (
                      <>
                        <HeaderTextContainer>
                          <StyledImage
                            src={getMatchingPostId(post, id).imageFileUrl}
                            height="50px"
                            width="50px"
                          />
                          <HeaderText>
                            {getMatchingPostId(post, id)?.title}
                          </HeaderText>

                          <TestAudioPlayer
                            fileUrl={getMatchingPostId(post, id)?.fileUrl}
                          />
                        </HeaderTextContainer>
                        {getMatchingPostId(post, id).message}{" "}
                      </>
                    )}
                  </>
                ) : (
                  <CoolTextContainer>
                    <CoolText>Sorry, no post with that ID exists.</CoolText>
                  </CoolTextContainer>
                )}
              </>
            )}
          </ProfileContainer>
        </>
      )}
    </>
  );
};

export default PostDetails;
