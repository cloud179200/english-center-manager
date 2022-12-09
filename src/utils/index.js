import { v4 as uuidv4 } from "uuid";

export const getLocalStorageUserinfo = async () => {
  let userInfo = null;
  if (localStorage.getItem("persist:root")) {
    const jsonParse = await JSON.parse(localStorage.getItem("persist:root"));
    if (jsonParse?.user) {
      const userParse = await JSON.parse(jsonParse.user);
      userInfo = userParse.userInfo;
    }
  }
  return userInfo;
};

export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const uniqueKey = () => {
  return uuidv4();
};

export const sortStudentFunc = (a, b) =>
  a.student_Name > b.student_Name
    ? 1
    : a.student_Name < b.student_Name
    ? -1
    : 0;

export const sortTeacherFunc = (a, b) =>
  a.teacher_Name > b.teacher_Name
    ? 1
    : a.teacher_Name < b.teacher_Name
    ? -1
    : 0;

export const sortClassFunc = (a, b) =>
  a.class_Name > b.class_Name ? 1 : a.class_Name < b.class_Name ? -1 : 0;

export const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
