import { Action, actionTypes } from "../actions/actions.interface";
import { classesState } from "./classesReducer.interfaces";

const initialState = {
  classes: [],
};

export const classesReducer = (
  state: classesState = initialState,
  action: Action
): classesState => {
  switch (action.type) {
    case actionTypes.WRITE_CLASSES: {
      return { classes: action.classes };
    }
    case actionTypes.DELETE_CLASSES: {
      return { classes: [] };
    }
    default: {
      return state;
    }
  }
};
