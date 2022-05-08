import React from "react";
import "./Classes.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteClasses,
  deleteMessage,
  logoutStudent,
} from "../../store/actions";
import {
  classesState,
  classType,
} from "../../store/reducers/classesReducer.interfaces";
import { masterState } from "../../store/reducers/reducers.interfaces";
import { messageState } from "../../store/reducers/messageReducer.interfaces";

export const Classes = () => {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(logoutStudent());
    dispatch(deleteMessage());
    dispatch(deleteClasses());
  };
  const message = useSelector<masterState, messageState["message"]>(
    ({ messageState }) => messageState.message
  );
  const classes = useSelector<masterState, classesState["classes"]>(
    ({ classesState }) => classesState.classes
  );

  return (
    <div className="classes-container">
      <button onClick={logout}>logout</button>
      {classes.map((cls: classType) => (
        <div key={cls.Name} className="class-container">
          <p className="p-title">Name:</p>
          <p className="p-content">{cls.Name}</p>
          <p className="p-title">Students:</p>
          <p className="p-content">{cls.Students.join(", ")}</p>
        </div>
      ))}
      {message.length > 0 && <p className="message">{message}</p>}
    </div>
  );
};
