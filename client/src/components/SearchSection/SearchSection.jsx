import React, { useState } from "react";
import { RedSmallButton } from "../../globalStyles";
import { Pagination, Posts } from "../index.js";
import { SearchContainer, SearchBar } from "./SearchSection.elements";
import { useSelector } from "react-redux";

const SearchSection = () => {
  const posts = useSelector((state) => state.posts);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <SearchContainer>
        <SearchBar placeholder="Search by title or keywords" />
        <SearchBar placeholder="Tags separated by space" />
        <RedSmallButton>Search</RedSmallButton>
        <Posts posts={currentPosts} />
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </SearchContainer>
    </>
  );
};

export default SearchSection;
