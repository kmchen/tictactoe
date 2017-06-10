import { createStore } from "redux";
import { reducers } from "./reducers/index";
import { Router, Route } from "react-router";

const store = createStore(reducers, {});

export { store };
