import React from "react";
import { RedSmallButton } from "../../globalStyles";
import { SearchContainer, SearchBar } from "./SearchSection.elements";

const SearchSection = () => {
  return (
    <>
      <SearchContainer>
        <SearchBar placeholder="Search by title or keywords" />
        <SearchBar placeholder="Tags separated by space" />
        <RedSmallButton>Search</RedSmallButton>
      </SearchContainer>
    </>
  );
};

export default SearchSection;
