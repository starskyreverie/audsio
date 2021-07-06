import React, { useEffect, useState } from "react";
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
  const [timesRight, setTimesRight] = useState(Math.floor(currentPage / 5));

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    console.log(window.location.href);
    if (currentPage > 0 && currentPage <= pageNumbers.length) {
      paginate(currentPage);
    } else if (!loading) {
      paginate(1);
    }
    if (!window.location.href.includes("pg")) {
      paginate(1);
      setTimesRight(0);
    }
  }, [pageNumbers, window.location.href]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    totalPosts !== 0 && (
      <PaginationContainer>
        <PaginationUl>
          <PaginationLi
            onClick={() => {
              if (currentPage !== 1) {
                setTimesRight(Math.floor((currentPage - 2) / 5));
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
                } else if (
                  window.location.href.startsWith(
                    process.env.NODE_ENV === "development"
                      ? "http://localhost:3000/liked"
                      : "https://eriv.netlify.app/liked"
                  )
                ) {
                  window.history.replaceState(
                    null,
                    "eriv.xyz",
                    `/liked?pg=${currentPage - 1}`
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
          {pageNumbers.map(
            (number, index) =>
              index < 5 &&
              number + 5 * timesRight < pageNumbers.length + 1 && (
                <PaginationLi
                  key={number + 5 * timesRight}
                  onClick={() => {
                    setTimesRight(Math.floor(currentPage / 5));
                    paginate(number + 5 * timesRight);
                    if (keywordSearch || tagSearch) {
                      window.history.replaceState(
                        null,
                        "bob",
                        `/search?q=${keywordSearch}&tags=${tagSearch
                          .trim()
                          .split(" ")
                          .join(",")}&pg=${number + 5 * timesRight}`
                      );
                    } else if (
                      window.location.href.startsWith(
                        process.env.NODE_ENV === "development"
                          ? "http://localhost:3000/liked"
                          : "https://eriv.netlify.app/liked"
                      )
                    ) {
                      window.history.replaceState(
                        null,
                        "eriv.xyz",
                        `/liked?pg=${number + 5 * timesRight}`
                      );
                    } else {
                      window.history.replaceState(
                        null,
                        "eriv.xyz",
                        `/?pg=${number + 5 * timesRight}`
                      );
                    }
                  }}
                  active={
                    currentPage === number + 5 * timesRight ? "true" : "false"
                  }
                >
                  {number + 5 * timesRight}
                </PaginationLi>
              )
          )}
          <PaginationLi
            onClick={() => {
              if (currentPage !== pageNumbers[pageNumbers.length - 1]) {
                setTimesRight(Math.floor(currentPage / 5));
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
                } else if (
                  window.location.href.startsWith(
                    process.env.NODE_ENV === "development"
                      ? "http://localhost:3000/liked"
                      : "https://eriv.netlify.app/liked"
                  )
                ) {
                  window.history.replaceState(
                    null,
                    "eriv.xyz",
                    `/liked?pg=${currentPage + 1}`
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
    )
  );
};

export default Pagination;
