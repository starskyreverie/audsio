import React, { useState, useEffect } from "react";
import { SearchSection } from "../../components";
import { useDispatch } from "react-redux";
import { getPosts } from "../../store/actions/posts.js";

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <>
      <SearchSection />
    </>
  );
};

export default Home;
