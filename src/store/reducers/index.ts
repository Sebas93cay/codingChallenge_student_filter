import { combineReducers } from "redux";
import { classesReducer } from "./classesReducer";
import { messageReducer } from "./messageReducer";
import { studentReducer } from "./studentReducer";

export const allReducers = combineReducers({
  studentState: studentReducer,
  classesState: classesReducer,
  messageState: messageReducer,
});
