import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginStudent, setMessage, writeStudent } from "../../store/actions";
import { masterState } from "../../store/reducers/index.interfaces";
import { studentState } from "../../store/reducers/studentReducer.interfaces";
import {
  classTypeFetched,
  studentIdMap,
  studentInfo,
} from "./studentForm.interfaces";
import "./StudentForm.css";
import { messageState } from "../../store/reducers/messageReducer.interfaces";
import { classType } from "../../store/reducers/classesReducer.interfaces";

export const StudentForm: React.FC = () => {
  const Airtable = require("airtable");
  // const base = new Airtable({ apiKey: "keyNwRHpi1JA9FA42" }).base(
  //   "app8ZbcPx7dkpOnP0"
  // );
  const base = new Airtable({ apiKey: "keyNwRHpi1JA9FA42" }).base(
    "appI5PzkNaZjQ3NTi"
  );
  const studentsTable = base("Students");
  const classesTable = base("Classes");

  const student = useSelector<masterState, studentState["student"]>(
    ({ studentState }) => studentState.student
  );
  const message = useSelector<masterState, messageState["message"]>(
    ({ messageState }) => messageState.message
  );

  const dispatch = useDispatch();

  const updateStudent = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(writeStudent(e.target.value));
  };

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const studentInfo = await getStudent(student as string);
    console.log("the estudent info is ", studentInfo);
    if (Object.keys(studentInfo).length !== 0) {
      const studentClasses = await getClasses(studentInfo);
      dispatch(loginStudent());
      return;
    }
    dispatch(setMessage(`Student "${student}" does not exist`));
  };

  const getStudent = async (student: string): Promise<studentInfo> => {
    const records = await studentsTable
      .select({
        filterByFormula: `{Name} = '${student}'`,
      })
      .firstPage();
    if (records.length > 0) {
      return records[0]._rawJson.fields;
    }
    return {};
  };

  const getClasses = async (studentInfo: studentInfo): Promise<classType[]> => {
    if (studentInfo.Classes === undefined) {
      dispatch(setMessage(`${student} does not attend in any class`));
      return [];
    }
    const filterByFormula = generateIdsFilterFormula(studentInfo.Classes);

    const records = await classesTable
      .select({
        filterByFormula: filterByFormula,
      })
      .firstPage();
    const classesInfo = records.map((record: any) => record._rawJson.fields);
    const studentsIds = extractStudentsId(classesInfo);
    const studentsIdMap = await getStudents(studentsIds);

    return [];
  };

  const getStudents = async (studentsIds: string[]) => {
    const filterByFormula = generateIdsFilterFormula(studentsIds);
    const records = await studentsTable
      .select({
        filterByFormula: filterByFormula,
      })
      .firstPage();
    const studentsIdMap: any = {};
    records.forEach((record: any) => {
      studentsIdMap[record._rawJson.id] = record._rawJson.fields.Name;
    });
    console.log("all students", studentsIdMap);
    return [];
  };

  const extractStudentsId = (classesInfo: classTypeFetched[]) => {
    let studentsIds: string[] = [];
    classesInfo.forEach((cls) => {
      studentsIds = [...studentsIds, ...cls.Students];
    });
    return [...Array.from(new Set(studentsIds))];
  };

  const generateIdsFilterFormula = (classesIds: string[]): string => {
    const parameterFormula = "RECORD_ID()='";
    const parameterFormulaInBetween = "'," + parameterFormula;
    return (
      "OR(" +
      parameterFormula +
      classesIds.join(parameterFormulaInBetween) +
      "')"
    );
  };

  return (
    <div>
      <form className="login-form" onSubmit={login}>
        <label htmlFor="student">Student:</label>
        <input type="text" onChange={updateStudent} />
        <button type="submit">Log In</button>
        {message.length > 0 && <p className="message">{message}</p>}
      </form>
    </div>
  );
};
