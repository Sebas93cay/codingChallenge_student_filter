import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMessage,
  loginStudent,
  setMessage,
  writeClasses,
  writeStudent,
} from "../../store/actions";
import {
  masterState,
  messageType,
  studentType,
} from "../../store/reducers/reducers.interfaces";
import { studentInfo } from "./studentForm.interfaces";
import "./StudentForm.css";
import { classType } from "../../store/reducers/classesReducer.interfaces";
import Airtable from "airtable";

export const StudentForm: React.FC = () => {
  // const Airtable = require("airtable");
  // const base = new Airtable({ apiKey: "keyNwRHpi1JA9FA42" }).base(
  //   "app8ZbcPx7dkpOnP0"
  // );
  const base = new Airtable({ apiKey: "keyNwRHpi1JA9FA42" }).base(
    "appI5PzkNaZjQ3NTi"
  );
  const studentsTable = base("Students");
  const classesTable = base("Classes");

  const student = useSelector<masterState, studentType>(
    ({ studentState }) => studentState.student
  );
  const message = useSelector<masterState, messageType>(
    ({ messageState }) => messageState.message
  );

  const dispatch = useDispatch();

  const updateStudent = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(writeStudent(e.target.value));
  };

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(deleteMessage());
    const studentInfo = await getStudent(student as string);
    if (Object.keys(studentInfo).length !== 0) {
      const studentClasses = await getClasses(studentInfo);
      dispatch(writeClasses(studentClasses));
      dispatch(loginStudent());
      return;
    }
    dispatch(setMessage(`Student "${student}" does not exist`));
  };

  const getStudent = async (student: string): Promise<studentInfo> => {
    const studentRecords = await studentsTable
      .select({
        filterByFormula: `{Name} = '${student}'`,
      })
      .firstPage();
    if (studentRecords.length > 0) {
      return studentRecords[0]._rawJson.fields;
    }
    return {};
  };

  const getClasses = async (studentInfo: studentInfo): Promise<classType[]> => {
    if (studentInfo.Classes === undefined) {
      dispatch(setMessage(`${student} does not attend in any class`));
      return [];
    }
    const filterByFormula = generateIdsFilterFormula(studentInfo.Classes);

    const classesRecords = await classesTable
      .select({
        filterByFormula: filterByFormula,
      })
      .firstPage();
    const classesInfo = classesRecords.map(
      (record: any) => record._rawJson.fields
    );
    const studentsIds = extractStudentsId(classesInfo);
    const studentsIdMap = await getStudents(studentsIds);
    const classes = mergeClassesAndStudents(classesInfo, studentsIdMap);
    return classes;
  };

  const mergeClassesAndStudents = (
    classesInfo: classType[],
    studentsIdMap: any
  ): classType[] => {
    const classes: classType[] = [];
    classesInfo.forEach((cls) => {
      const tmpCls = JSON.parse(JSON.stringify(cls));
      tmpCls.Students = tmpCls.Students.map((id: string) => studentsIdMap[id]);
      classes.push(tmpCls);
    });
    return classes;
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
    return studentsIdMap;
  };

  const extractStudentsId = (classesInfo: classType[]) => {
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
        <input type="text" onChange={updateStudent} required />
        <button type="submit">Log In</button>
        {message.length > 0 && <p className="message">{message}</p>}
      </form>
    </div>
  );
};
