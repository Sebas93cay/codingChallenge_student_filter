import { Action } from "../actions";
import { messageState } from "./messageReducer.interfaces";

const initialState = {
  message: "",
};

export const messageReducer = (
  state: messageState = initialState,
  action: Action
): messageState => {
  switch (action.type) {
    case "SET_MESSAGE": {
      return { message: action.payload as string };
    }
    case "DELETE_MESSAGE": {
      return { message: "" };
    }
    default: {
      return state;
    }
  }
};
