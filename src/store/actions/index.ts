import { classType } from "../reducers/classesReducer.interfaces";
import { Action, actionTypes } from "./actions.interface";

export const writeStudent = (student: string): Action => ({
  type: actionTypes.WRITE_STUDENT,
  student,
});
export const loginStudent = (): Action => ({
  type: actionTypes.LOGIN_STUDENT,
});
export const logoutStudent = (): Action => ({
  type: actionTypes.LOGOUT_STUDENT,
});
export const writeClasses = (classes: classType[]): Action => ({
  type: actionTypes.WRITE_CLASSES,
  classes,
});
export const deleteClasses = (): Action => ({
  type: actionTypes.DELETE_CLASSES,
});
export const setMessage = (message: string): Action => ({
  type: actionTypes.SET_MESSAGE,
  message,
});
export const deleteMessage = (): Action => ({
  type: actionTypes.DELETE_MESSAGE,
});
