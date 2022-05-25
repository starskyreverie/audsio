import React, { useState, useEffect } from "react";
import { RedSmallButton } from "../../globalStyles.js";
import { Pagination, Posts } from "../index.js";
import { SearchContainer, SearchBar } from "./LikedPostsSection.elements";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getLikedPosts, queryPosts } from "../../store/actions/posts.js";
import {
  HeaderText,
  HeaderTextContainer,
  ProfileContainer,
} from "../../pages/ProfilePage/Profile.elements.js";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const LikedPostSection = () => {
  const history = useHistory();
  const query = useQuery();
  const location = useLocation();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);

  const numPosts = useSelector((state) => state.posts.numPosts);
  const [currentPage, setCurrentPage] = useState(
    parseInt(query.get("pg")) || 1
  );
  const [postsPerPage] = useState(5);
  const [keywordSearch, setKeywordSearch] = useState("");
  const [tagSearch, setTagSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const searchQuery = query.get("q");
  const tagQuery = query.get("tags");

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      await dispatch(getLikedPosts(5, currentPage));
      setLoading(false);
    };
    fetchData();
  }, [location, currentPage]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <ProfileContainer>
        <HeaderTextContainer>
          <HeaderText>Your Liked Posts</HeaderText>
        </HeaderTextContainer>
        <Posts posts={posts} loading={loading} numPosts={numPosts} />
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={numPosts}
          paginate={paginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          loading={loading}
          keywordSearch={searchQuery}
          tagSearch={tagQuery}
        />
      </ProfileContainer>
    </>
  );
};

export default LikedPostSection;
