import { getService, postService } from "../../config/services";

export const getListStudentService = async () => {
  try {
    return await getService(`/api/students/get-all`, "get students fail", true);
  } catch (error) {
    throw error;
  }
};

export const removeStudentService = async (body) => {
  try {
    return await postService(`/api/students/remove?p_student_id=${body.student_Id}`,{},  "remove students fail", true);
  } catch (error) {
    throw error;
  }
};

export const studentPaymentClassFeeService = async (body) => {
  try {
    return await postService(`/api/students/`, body, "Sign up fail", false);
  } catch (error) {
    throw error;
  }
};

export const getStudentTransactionsByIdService = async (body) => {
  try {
    return await getService(`/api/trans/get-trans-by-student-id?p_student_id=${body.student_Id}`, "Get transactions fail", true);
  } catch (error) {
    throw error;
  }
};

export const getStudentTransactionsService = async () => {
  try {
    return await getService(`/api/trans/get-student-trans`, "Get transactions fail", true);
  } catch (error) {
    throw error;
  }
};

export const confirmStudentTransactionService = async (body) => {
  try {
    return await postService(`/api/trans/confirm-student-trans?p_student_id=${body.student_Id}&p_class_id=${body.class_Id}&p_created_by=${body.email}`, {}, "Confirm transactions fail", true);
  } catch (error) {
    throw error;
  }
};
