import { useSelector } from "react-redux";
import "./App.css";
import { Classes } from "./components/Classes";
import { StudentForm } from "./components/StudentForm";
import { masterState } from "./store/reducers/index.interfaces";
import { studentState } from "./store/reducers/studentReducer.interfaces";

export function App() {
  const loggedIn = useSelector<masterState, studentState["loggedIn"]>(
    ({ studentState }) => studentState.loggedIn
  );
  return <>{loggedIn ? <Classes /> : <StudentForm />}</>;
}
