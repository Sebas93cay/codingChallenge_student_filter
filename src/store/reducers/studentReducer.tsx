import { Action } from "../actions";
import { studentState } from "./studentReducer.interfaces";

const initialState = {
  student: null,
  loggedIn: false,
};

export const studentReducer = (
  state: studentState = initialState,
  action: Action
): studentState => {
  switch (action.type) {
    case "WRITE_STUDENT": {
      return { ...state, student: action.payload as string };
    }
    case "LOGIN_STUDENT": {
      return { ...state, loggedIn: true };
    }
    case "LOGOUT_STUDENT": {
      return { student: null, loggedIn: false };
    }
    default: {
      return state;
    }
  }
};
