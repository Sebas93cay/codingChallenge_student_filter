import { useSelector } from "react-redux";
import "./App.css";
import { Classes } from "./components/Classes";
import { StudentForm } from "./components/StudentForm";
import {
  loggedInType,
  masterState,
} from "./store/reducers/reducers.interfaces";

/**
 * This is the app component. It show whether the StudentForm or the Classes
 * component depending on the variable loggedIn stored in the store
 * @returns Main App
 */
export function App() {
  const loggedIn = useSelector<masterState, loggedInType>(
    ({ studentState }) => studentState.loggedIn
  );
  return <>{loggedIn ? <Classes /> : <StudentForm />}</>;
}
