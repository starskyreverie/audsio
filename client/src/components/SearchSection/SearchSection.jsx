import React, { useState, useEffect } from "react";
import { RedSmallButton } from "../../globalStyles.js";
import { Pagination, Posts } from "../index.js";
import { SearchContainer, SearchBar, NiceText } from "./SearchSection.elements";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPosts, queryPosts } from "../../store/actions/posts.js";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchSection = () => {
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
      if (searchQuery || tagQuery) {
        console.log(searchQuery);
        await dispatch(
          queryPosts(
            {
              keywordQuery: query.get("q"),
              tagQuery: query.get("tags"),
            },
            5,
            currentPage
          )
        );
        setLoading(false);
      } else {
        await dispatch(getPosts(5, currentPage));
        setLoading(false);
      }
    };
    fetchData();
  }, [location, currentPage]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    console.log(`Current page: ${currentPage}`);
  }, [currentPage]);

  const searchPosts = async () => {
    if (keywordSearch.trim() || tagSearch) {
      setLoading(true);
      await dispatch(
        queryPosts({
          keywordQuery: keywordSearch,
          tagQuery: tagSearch.trim().split(" ").join(","),
        })
      );
      history.push(
        `/search?q=${keywordSearch}&tags=${tagSearch
          .trim()
          .split(" ")
          .join(",")}`
      );
      setLoading(false);
    } else {
      history.push("/");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchPosts();
    }
  };

  return (
    <>
      <SearchContainer>
        <SearchBar
          placeholder="Search by title or keywords"
          value={keywordSearch}
          onChange={(e) => setKeywordSearch(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <SearchBar
          placeholder="Tags separated by space"
          value={tagSearch}
          onChange={(e) => setTagSearch(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <RedSmallButton onClick={searchPosts}>Search</RedSmallButton>
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
      </SearchContainer>
    </>
  );
};

export default SearchSection;
