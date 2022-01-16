import { classType } from "../reducers/classesReducer.interfaces";

export type Action = {
  type:
    | "WRITE_STUDENT"
    | "WRITE_CLASSES"
    | "LOGOUT_STUDENT"
    | "DELETE_CLASSES"
    | "LOGIN_STUDENT"
    | "SET_MESSAGE"
    | "DELETE_MESSAGE";
  payload?: string | classType[];
};

export const writeStudent = (student: string): Action => ({
  type: "WRITE_STUDENT",
  payload: student,
});
export const loginStudent = (): Action => ({
  type: "LOGIN_STUDENT",
});
export const logoutStudent = (): Action => ({
  type: "LOGOUT_STUDENT",
});
export const writeClasses = (classes: classType[]): Action => ({
  type: "WRITE_CLASSES",
  payload: classes,
});
export const deleteClasses = (): Action => ({
  type: "DELETE_CLASSES",
});
export const setMessage = (message: string): Action => ({
  type: "SET_MESSAGE",
  payload: message,
});
export const deleteMessage = (): Action => ({
  type: "DELETE_MESSAGE",
});
