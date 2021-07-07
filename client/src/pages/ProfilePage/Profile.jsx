import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { RedSmallButton } from "../../globalStyles.js";
import { ProfileContainer } from "./Profile.elements.js";
import { logout } from "../../store/actions/auth.js";
import { PostsByCreatorSection } from "../../components";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { username } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await dispatch(logout());
    setLoading(false);
    history.push("/");
  };

  return (
    <>
      <ProfileContainer>
        user profile page
        {user &&
          user.result.username === username &&
          (!loading ? (
            <RedSmallButton onClick={() => handleLogout()}>
              Logout
            </RedSmallButton>
          ) : (
            <div>logging u out...</div>
          ))}
      </ProfileContainer>
      <PostsByCreatorSection />
    </>
  );
};

export default Profile;
