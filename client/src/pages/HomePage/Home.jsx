import React, { useEffect } from "react";
import { SearchSection } from "../../components";
import { useDispatch } from "react-redux";
import { getPosts } from "../../store/actions/posts.js";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <>
      <SearchSection />
    </>
  );
};

export default Home;
