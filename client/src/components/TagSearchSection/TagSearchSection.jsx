import React, { useState, useEffect } from "react";
import { RedSmallButton } from "../../globalStyles.js";
import { Pagination, Posts } from "../index.js";
import { SearchContainer, SearchBar } from "./TagSearchSection.elements.js";
import { useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getTaggedPosts } from "../../store/actions/posts.js";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const TagSearchSection = () => {
  const history = useHistory();
  const query = useQuery();
  const [tag, setTag] = useState(query.get("tag"));
  const location = useLocation();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const [currentPage, setCurrentPage] = useState(
    parseInt(query.get("pg")) || 1
  );
  const [postsPerPage] = useState(5);
  const [tagSearch, setTagSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const searchTag = async () => {
    window.history.replaceState(null, "Audsio", `/t?tag=${tagSearch}`);
    if (tagSearch.trim()) {
      setLoading(true);
      await dispatch(getTaggedPosts(tagSearch));
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      await dispatch(getTaggedPosts(tag));
      setTagSearch(tag);
      setLoading(false);
    };
    fetchData();
  }, [location]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchTag();
    }
  };

  return (
    <>
      <SearchContainer>
        <SearchBar
          placeholder="Filter by tags"
          value={tagSearch}
          onChange={(e) => setTagSearch(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <RedSmallButton onClick={searchTag}>Search</RedSmallButton>
        <Posts posts={currentPosts} loading={loading} />
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={paginate}
          currentPage={currentPage}
          loading={loading}
          tag={tagSearch}
        />
      </SearchContainer>
    </>
  );
};

export default TagSearchSection;
