import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  PaginationContainer,
  PaginationUl,
  PaginationLi,
  StyledLeftChevron,
  StyledRightChevron,
} from "./Pagination.elements.js";

const Pagination = ({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
  loading,
  keywordSearch,
  tagSearch,
}) => {
  const location = useLocation();

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    if (currentPage > 0 && currentPage <= pageNumbers.length) {
      paginate(currentPage);
    } else if (!loading) {
      paginate(1);
    }
  }, [pageNumbers, location]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <PaginationContainer>
      <PaginationUl>
        <PaginationLi
          onClick={() => {
            if (currentPage !== 1) {
              paginate(currentPage - 1);
              if (keywordSearch || tagSearch) {
                window.history.replaceState(
                  null,
                  "eriv.xyz",
                  `/search?q=${keywordSearch}&tags=${tagSearch
                    .trim()
                    .split(" ")
                    .join(",")}&pg=${currentPage - 1}`
                );
              } else {
                window.history.replaceState(
                  null,
                  "eriv.xyz",
                  `/?pg=${currentPage - 1}`
                );
              }
            }
          }}
        >
          <StyledLeftChevron />
        </PaginationLi>
        {pageNumbers.map((number) => (
          <PaginationLi
            key={number}
            onClick={() => {
              paginate(number);
              if (keywordSearch || tagSearch) {
                window.history.replaceState(
                  null,
                  "bob",
                  `/search?q=${keywordSearch}&tags=${tagSearch
                    .trim()
                    .split(" ")
                    .join(",")}&pg=${number}`
                );
              } else {
                window.history.replaceState(null, "eriv.xyz", `/?pg=${number}`);
              }
            }}
            active={currentPage === number ? "true" : "false"}
          >
            {number}
          </PaginationLi>
        ))}
        <PaginationLi
          onClick={() => {
            if (currentPage !== pageNumbers[pageNumbers.length - 1]) {
              paginate(currentPage + 1);
              if (keywordSearch || tagSearch) {
                window.history.replaceState(
                  null,
                  "eriv.xyz",
                  `/search?q=${keywordSearch}&tags=${tagSearch
                    .trim()
                    .split(" ")
                    .join(",")}&pg=${currentPage + 1}`
                );
              } else {
                window.history.replaceState(
                  null,
                  "eriv.xyz",
                  `/?pg=${currentPage + 1}`
                );
              }
            }
          }}
        >
          <StyledRightChevron />
        </PaginationLi>
      </PaginationUl>
    </PaginationContainer>
  );
};

export default Pagination;
