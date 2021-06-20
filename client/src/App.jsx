import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import GlobalStyle from "./globalStyles.js";
import { Header, Footer } from "./components";
import { Home, Login, PostDetails, Register, Upload, NotFound } from "./pages";

const App = () => {
  return (
    <Router>
      <GlobalStyle />
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/posts/search" exact component={Home} />
        <Route path="/posts/:id" exact component={PostDetails} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/upload" exact component={Upload} />
        <Route path="/404" exact component={NotFound} />
        <Redirect to="/404" />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
