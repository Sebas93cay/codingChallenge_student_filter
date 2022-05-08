import { Action, actionTypes } from "../actions/actions.interface";
import { studentState } from "./studentReducer.interfaces";

const initialState = {
  student: undefined,
  loggedIn: false,
};

export const studentReducer = (
  state: studentState = initialState,
  action: Action
): studentState => {
  switch (action.type) {
    case actionTypes.WRITE_STUDENT: {
      return { ...state, student: action.student };
    }
    case actionTypes.LOGIN_STUDENT: {
      return { ...state, loggedIn: true };
    }
    case actionTypes.LOGOUT_STUDENT: {
      return { student: undefined, loggedIn: false };
    }
    default: {
      return state;
    }
  }
};
