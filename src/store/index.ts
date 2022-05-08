import { createStore } from "redux";
import { allReducers } from "./reducers";

/**
 * REDUX's store
 */
export const store = createStore(allReducers);
