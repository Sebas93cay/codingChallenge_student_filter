import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMessage, logoutStudent } from "../../store/actions";
import { masterState } from "../../store/reducers/index.interfaces";
import { messageState } from "../../store/reducers/messageReducer.interfaces";

export const Classes = () => {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(logoutStudent());
    dispatch(deleteMessage());
  };
  const message = useSelector<masterState, messageState["message"]>(
    ({ messageState }) => messageState.message
  );
  return (
    <>
      <button onClick={logout}>logout</button>
      <div>Aqui van las clases</div>
      {message.length > 0 && <p className="message">{message}</p>}
    </>
  );
};
