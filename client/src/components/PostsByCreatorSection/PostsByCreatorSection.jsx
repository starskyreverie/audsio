import React, { useState, useEffect } from "react";
import { RedSmallButton } from "../../globalStyles.js";
import { Pagination, Posts } from "../index.js";
import { SearchContainer, SearchBar } from "./PostsByCreatorSection.elements";
import { useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPostsByCreator } from "../../store/actions/posts.js";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const PostsByCreatorSection = () => {
  const { username } = useParams();
  const query = useQuery();
  const location = useLocation();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const [currentPage, setCurrentPage] = useState(
    parseInt(query.get("pg")) || 1
  );
  const [postsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);

  const searchQuery = query.get("q");
  const tagQuery = query.get("tags");

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      await dispatch(getPostsByCreator(username));
      setLoading(false);
    };
    fetchData();
  }, [location]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <SearchContainer>
        <Posts posts={currentPosts} loading={loading} />
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={paginate}
          currentPage={currentPage}
          loading={loading}
          username={username}
        />
      </SearchContainer>
    </>
  );
};

export default PostsByCreatorSection;
