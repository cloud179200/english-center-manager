import { API_MESSAGE } from "../../config/constant";
import {
  ADD_PAYROLL_ACTION,
  ASSIGN_PAYROLL_TO_TEACHER_ACTION,
  GET_PAYROLL_ACTION,
  GET_TEACHER_ACTION,
  REMOVE_PAYROLL_ACTION,
  REMOVE_TEACHER_ACTION,
} from "./action";
import {
  addPayrollService,
  assignPayrollToTeacherService,
  getListPayrollService,
  getListTeacherService,
  removePayrollService,
  removeTeacherService,
  setPayrollService,
} from "./services";
import { addNotificationAction } from "./../utils/operators";

export const getListTeacherAction = (callback) => {
  return async (dispatch) => {
    dispatch({ type: GET_TEACHER_ACTION });
    try {
      const res = await getListTeacherService();
      if (res?.data) {
        callback && callback(res.data, null);
        return;
      }
      callback && callback(null, API_MESSAGE.SERVER_ERROR);
    } catch (error) {
      dispatch(
        addNotificationAction(
          error?.data?.message || API_MESSAGE.SERVER_ERROR,
          true
        )
      );

      callback &&
        callback(null, error?.data?.message || API_MESSAGE.SERVER_ERROR);
    }
  };
};

export const removeTeacherAction = (teacher_Id, callback) => {
  return async (dispatch) => {
    dispatch({ type: REMOVE_TEACHER_ACTION });
    try {
      const res = await removeTeacherService({ teacher_Id });
      if (res) {
        dispatch(
          addNotificationAction(res?.message || API_MESSAGE.SUCCESS, false)
        );
        callback && callback(res, null);
        return;
      }
    } catch (error) {
      dispatch(
        addNotificationAction(
          error?.data?.message || API_MESSAGE.SERVER_ERROR,
          true
        )
      );
      callback &&
        callback(null, error?.data?.message || API_MESSAGE.SERVER_ERROR);
    }
  };
};

export const getListPayrollAction = (callback) => {
  return async (dispatch) => {
    dispatch({ type: GET_PAYROLL_ACTION });
    try {
      const res = await getListPayrollService();
      if (res?.data) {
        callback && callback(res.data, null);
        return;
      }
      callback && callback(null, API_MESSAGE.SERVER_ERROR);
    } catch (error) {
      dispatch(
        addNotificationAction(
          error?.data?.message || API_MESSAGE.SERVER_ERROR,
          true
        )
      );

      callback &&
        callback(null, error?.data?.message || API_MESSAGE.SERVER_ERROR);
    }
  };
};

export const addPayrollAction = (payroll_Name, value, callback) => {
  return async (dispatch) => {
    dispatch({ type: ADD_PAYROLL_ACTION });
    try {
      const res = await addPayrollService({
        payroll_Name,
        value,
      });
      if (res) {
        dispatch(
          addNotificationAction(res?.message || API_MESSAGE.SUCCESS, false)
        );
        callback && callback(res, null);
        return;
      }
    } catch (error) {
      dispatch(
        addNotificationAction(
          error?.data?.message || API_MESSAGE.SERVER_ERROR,
          true
        )
      );
      callback &&
        callback(null, error?.data?.message || API_MESSAGE.SERVER_ERROR);
    }
  };
};

export const setPayrollAction = (payroll_Id, payroll_Name, value, callback) => {
  return async (dispatch) => {
    dispatch({ type: REMOVE_PAYROLL_ACTION });
    try {
      const res = await setPayrollService({
        payroll_Id,
        payroll_Name,
        value,
      });
      if (res) {
        dispatch(
          addNotificationAction(res?.message || API_MESSAGE.SUCCESS, false)
        );
        callback && callback(res, null);
        return;
      }
    } catch (error) {
      dispatch(
        addNotificationAction(
          error?.data?.message || API_MESSAGE.SERVER_ERROR,
          true
        )
      );
      callback &&
        callback(null, error?.data?.message || API_MESSAGE.SERVER_ERROR);
    }
  };
};

export const removePayrollAction = (payroll_Id, callback) => {
  return async (dispatch) => {
    dispatch({ type: REMOVE_TEACHER_ACTION });
    try {
      const res = await removePayrollService({ payroll_Id });
      if (res) {
        dispatch(
          addNotificationAction(res?.message || API_MESSAGE.SUCCESS, false)
        );
        callback && callback(res, null);
        return;
      }
    } catch (error) {
      dispatch(
        addNotificationAction(
          error?.data?.message || API_MESSAGE.SERVER_ERROR,
          true
        )
      );
      callback &&
        callback(null, error?.data?.message || API_MESSAGE.SERVER_ERROR);
    }
  };
};

export const assignPayrollToTeacherAction = (
  payroll_Id,
  teacher_Id,
  callback
) => {
  return async (dispatch) => {
    dispatch({ type: ASSIGN_PAYROLL_TO_TEACHER_ACTION });
    try {
      const res = await assignPayrollToTeacherService({
        payroll_Id,
        teacher_Id,
      });
      if (res) {
        dispatch(
          addNotificationAction(res?.message || API_MESSAGE.SUCCESS, false)
        );
        callback && callback(res, null);
        return;
      }
    } catch (error) {
      dispatch(
        addNotificationAction(
          error?.data?.message || API_MESSAGE.SERVER_ERROR,
          true
        )
      );
      callback &&
        callback(null, error?.data?.message || API_MESSAGE.SERVER_ERROR);
    }
  };
};
