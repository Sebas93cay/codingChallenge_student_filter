import { classType } from "../reducers/classesReducer.interfaces";

export enum actionTypes {
  WRITE_STUDENT = "WRITE_STUDENT",
  WRITE_CLASSES = "WRITE_CLASSES",
  LOGOUT_STUDENT = "LOGOUT_STUDENT",
  DELETE_CLASSES = "DELETE_CLASSES",
  LOGIN_STUDENT = "LOGIN_STUDENT",
  SET_MESSAGE = "SET_MESSAGE",
  DELETE_MESSAGE = "DELETE_MESSAGE",
}

export type Action = {
  type: actionTypes;
  classes?: classType[];
  student?: string | undefined;
  message?: string;
};
