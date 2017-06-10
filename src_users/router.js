import React from "react";
import { Router, Route, browserHistory} from "react-router";
import { history } from "./store.js";
import App from "./components/App";

const router = (
  <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
    <Route path="/" component={App}>
    </Route>
  </Router>
);

export { router };
