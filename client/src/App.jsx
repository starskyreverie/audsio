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
  UserOrTag,
  NotFound,
} from "./pages";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <Router>
      <GlobalStyle />
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/posts/search" exact component={Home} />
        <Route path="/posts/:id" exact component={PostDetails} />
        <Route
          path="/login"
          exact
          component={() => (!user ? <Login /> : <Redirect to="/" />)}
        />
        <Route
          path="/register"
          exact
          component={() => (!user ? <Register /> : <Redirect to="/" />)}
        />
        <Route path="/upload" exact component={Upload} />
        <Route path={["/user/:name", "/tags/:name"]} component={UserOrTag} />
        <Route path="/404" exact component={NotFound} />
        <Redirect to="/404" />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
