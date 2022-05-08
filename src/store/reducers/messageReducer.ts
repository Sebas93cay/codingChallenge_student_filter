import { Action, actionTypes } from "../actions/actions.interface";
import { messageState } from "./messageReducer.interfaces";

const initialState = {
  message: "",
};

export const messageReducer = (
  state: messageState = initialState,
  action: Action
): messageState => {
  switch (action.type) {
    case actionTypes.SET_MESSAGE: {
      return { ...state, message: action.message };
    }
    case actionTypes.DELETE_MESSAGE: {
      return { ...state, message: "" };
    }
    default: {
      return state;
    }
  }
};
