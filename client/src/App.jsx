import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import GlobalStyle from "./globalStyles.js";
import { Header, Footer } from "./components";
import {
  Home,
  Login,
  PostDetails,
  Register,
  Upload,
  Profile,
  TagSearch,
  NotFound,
  LikedPosts,
} from "./pages";

const App = () => {
  return (
    <Router>
      <GlobalStyle />
      <Header />
      <Switch>
        <Route path="/" exact component={() => <Redirect to="/home" />} />
        <Route exact path="/home" component={Home} />
        <Route path="/search" exact component={Home} />
        <Route path="/p/:id" exact component={PostDetails} />
        <Route
          path="/login"
          exact
          component={() =>
            !localStorage.getItem("user") ? <Login /> : <Redirect to="/home" />
          }
        />
        <Route
          path="/register"
          exact
          component={() =>
            !localStorage.getItem("user") ? (
              <Register />
            ) : (
              <Redirect to="/home" />
            )
          }
        />
        <Route
          path="/upload"
          exact
          component={() =>
            localStorage.getItem("user") ? <Upload /> : <Redirect to="/home" />
          }
        />
        <Route
          path="/liked"
          exact
          component={() =>
            localStorage.getItem("user") ? (
              <LikedPosts />
            ) : (
              <Redirect to="/home" />
            )
          }
        />
        <Route path="/u/:username" component={Profile} />
        <Route path="/t/:tag" component={TagSearch} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
