import React, { useEffect } from "react";
import ReactGa from "react-ga";
import { SearchSection } from "../../components";

const Home = () => {
  useEffect(() => {
    ReactGa.initialize("UA-201429534-1");
    ReactGa.pageview("/");
  }, []);

  return (
    <>
      <SearchSection />
    </>
  );
};

export default Home;
