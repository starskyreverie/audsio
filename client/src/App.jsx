import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import GlobalStyle from "./globalStyles.js";
import { Header, SearchSection, Footer } from "./components";

const App = () => {
  return (
    <Router>
      <GlobalStyle />
      <Header />
      <SearchSection />
      <Footer />
    </Router>
  );
};

export default App;
