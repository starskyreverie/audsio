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
  const query = useQuery();
  const location = useLocation();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);

  const numPosts = useSelector((state) => state.posts.numPosts);
  const [username, setUsername] = useState(query.get("name"));
  const [currentPage, setCurrentPage] = useState(
    parseInt(query.get("pg")) || 1
  );
  const [postsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);

  const searchQuery = query.get("q");
  const tagQuery = query.get("tags");

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      await dispatch(getPostsByCreator(username, 5, currentPage));
      setLoading(false);
    };
    fetchData();
  }, [currentPage]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <SearchContainer>
        <Posts posts={posts} loading={loading} numPosts={numPosts} />
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={numPosts}
          paginate={paginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          loading={loading}
          username={username}
        />
      </SearchContainer>
    </>
  );
};

export default PostsByCreatorSection;
