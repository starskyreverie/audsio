import React, { useState, useEffect } from "react";
import {
  CoolText,
  CoolTextContainer,
} from "../NotFoundPage/NotFound.elements.js";
import {
  HeaderText,
  HeaderTextContainer,
} from "../ProfilePage/Profile.elements.js";

import { useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { RedSmallButton } from "../../globalStyles.js";
import { ProfileContainer } from "./Profile.elements.js";
import { logout, getUser } from "../../store/actions/auth.js";
import { PostsByCreatorSection } from "../../components";
import { Box, CircularProgress } from "@chakra-ui/react";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Profile = () => {
  const localUser = JSON.parse(localStorage.getItem("user"));
  const query = useQuery();
  const [username, setUsername] = useState(query.get("name"));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [userDataLoading, setUserDataLoading] = useState(false);
  const [error, setError] = useState();
  const user = useSelector((state) => state.auth.authData);

  const handleLogout = async () => {
    setLoading(true);
    await dispatch(logout());
    setLoading(false);
    history.push("/");
  };

  useEffect(() => {
    setUserDataLoading(true);
    const fetchData = async () => {
      const data = await dispatch(getUser(username));
      if (data) {
        setError(data);
        console.log(data);
      }
      setUserDataLoading(false);
    };
    fetchData();
  }, [location]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {error ? (
        <CoolTextContainer>
          <CoolText>Sorry, nobody on eriv goes by that name.</CoolText>
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
                <HeaderText>{user?.username}'s posts</HeaderText>{" "}
                {localUser &&
                  localUser.result.username === username &&
                  (!loading ? (
                    <RedSmallButton onClick={() => handleLogout()}>
                      Logout
                    </RedSmallButton>
                  ) : (
                    <Box mt={60}>
                      <CircularProgress isIndeterminate color="#fd4d4d" />
                    </Box>
                  ))}
              </HeaderTextContainer>
            )}
          </ProfileContainer>
          <PostsByCreatorSection />
        </>
      )}
    </>
  );
};

export default Profile;
