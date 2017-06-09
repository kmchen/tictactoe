import { createStore, applyMiddleware, compose } from "redux";
import { browserHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import { reducers } from "./reducers/index";

// create the store
const store = createStore(reducers, {});
const history = syncHistoryWithStore(browserHistory, store);

// export
export { store, history };
