import { classesState } from "./classesReducer.interfaces";
import { messageState } from "./messageReducer.interfaces";
import { studentState } from "./studentReducer.interfaces";

export interface masterState {
  studentState: studentState;
  classesState: classesState;
  messageState: messageState;
}

export type loggedInType = masterState["studentState"]["loggedIn"];
export type messageType = masterState["messageState"]["message"];
export type studentType = masterState["studentState"]["student"];
