import React, { useState, useEffect } from "react";
import { RedSmallButton } from "../../globalStyles.js";
import { Pagination, Posts } from "../index.js";
import { SearchContainer, SearchBar } from "./PostsByCreatorSection.elements";
import { useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  getLikedPosts,
  getPostsByCreator,
  queryPosts,
} from "../../store/actions/posts.js";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const PostsByCreatorSection = () => {
  const { username } = useParams();
  const history = useHistory();
  const query = useQuery();
  const location = useLocation();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const [currentPage, setCurrentPage] = useState(
    parseInt(query.get("pg")) || 1
  );
  const [postsPerPage] = useState(5);
  const [keywordSearch, setKeywordSearch] = useState("");
  const [tagSearch, setTagSearch] = useState("");
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
        <SearchBar
          placeholder="Filter by title, keywords, or user"
          value={keywordSearch}
          onChange={(e) => setKeywordSearch(e.target.value)}
        />
        <SearchBar
          placeholder="Filter by tags"
          value={tagSearch}
          onChange={(e) => setTagSearch(e.target.value)}
        />
        <Posts posts={currentPosts} loading={loading} />
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={paginate}
          currentPage={currentPage}
          loading={loading}
          keywordSearch={searchQuery}
          tagSearch={tagQuery}
        />
      </SearchContainer>
    </>
  );
};

export default PostsByCreatorSection;
