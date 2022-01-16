import { Action } from "../actions";
import { classesState, classType } from "./classesReducer.interfaces";

const initialState = {
  classes: [],
};

export const classesReducer = (
  state: classesState = initialState,
  action: Action
): classesState => {
  switch (action.type) {
    case "WRITE_CLASSES": {
      return { classes: action.payload as classType[] };
    }
    case "DELETE_CLASSES": {
      return { classes: [] };
    }
    default: {
      return state;
    }
  }
};
