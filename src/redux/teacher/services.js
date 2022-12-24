import { getService, postService } from "../../config/services";

export const getListTeacherService = async () => {
  try {
    return await getService(`/api/teachers/get-all`, "get teachers fail", true);
  } catch (error) {
    throw error;
  }
};

export const removeTeacherService = async (body) => {
  try {
    return await postService(
      `/api/teachers/remove?p_teacher_id=${body.teacher_Id}`,
      {},
      "remove teachers fail",
      true
    );
  } catch (error) {
    throw error;
  }
};

export const getListPayrollService = async () => {
  try {
    return await getService(`/api/payroll/get-all`, "get payrolls fail", true);
  } catch (error) {
    throw error;
  }
};

export const addPayrollService = async (body) => {
  try {
    return await postService(
      `/api/payroll/insert`,
      body,
      "add payrolls fail",
      true
    );
  } catch (error) {
    throw error;
  }
};

export const setPayrollService = async (body) => {
  try {
    return await postService(
      `/api/payroll/update`,
      body,
      "set payrolls fail",
      true
    );
  } catch (error) {
    throw error;
  }
};

export const removePayrollService = async (body) => {
  try {
    return await postService(
      `/api/payroll/remove?payrollId=${body.payroll_Id}`,
      {},
      "remove payroll fail",
      true
    );
  } catch (error) {
    throw error;
  }
};

export const assignPayrollToTeacherService = async (body) => {
  try {
    return await postService(
      `/api/payroll/update-teacher-payroll?teacherId=${body.teacher_Id}&payrollId=${body.payroll_Id}`,
      {},
      "assign payroll to teacher fail",
      true
    );
  } catch (error) {
    throw error;
  }
};
