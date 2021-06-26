import React from "react";
import {
  PaginationContainer,
  PaginationUl,
  PaginationLi,
  StyledLeftChevron,
  StyledRightChevron,
} from "./Pagination.elements.js";

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <PaginationContainer>
      <PaginationUl>
        <PaginationLi
          onClick={() => {
            if (currentPage !== 1) {
              paginate(currentPage - 1);
            }
          }}
        >
          <StyledLeftChevron />
        </PaginationLi>
        {pageNumbers.map((number) => (
          <PaginationLi
            key={number}
            onClick={() => paginate(number)}
            active={currentPage === number ? "true" : "false"}
          >
            {number}
          </PaginationLi>
        ))}
        <PaginationLi
          onClick={() => {
            if (currentPage !== pageNumbers[pageNumbers.length - 1]) {
              paginate(currentPage + 1);
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
