import { API_MESSAGE } from "../../config/constant";
import {
  ADD_PAYROLL_ACTION,
  ASSIGN_PAYROLL_TO_TEACHER_ACTION,
  CONFIRM_TEACHER_TRANSACTIONS_BY_ID_ACTION,
  GET_PAYROLL_ACTION,
  GET_TEACHER_ACTION,
  GET_TEACHER_TRANSACTIONS_BY_MONTH_ACTION,
  REMOVE_PAYROLL_ACTION,
  REMOVE_TEACHER_ACTION,
} from "./action";
import {
  addPayrollService,
  assignPayrollToTeacherService,
  confirmTeacherTransactionService,
  getListPayrollService,
  getListTeacherService,
  getTeacherTransactionsByMonthService,
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

export const addPayrollAction = (payroll_Name, payroll_Value, callback) => {
  return async (dispatch) => {
    dispatch({ type: ADD_PAYROLL_ACTION });
    try {
      const res = await addPayrollService({
        payroll_Name,
        payroll_Value,
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

export const setPayrollAction = (
  payroll_Id,
  payroll_Name,
  payroll_Value,
  callback
) => {
  return async (dispatch) => {
    dispatch({ type: REMOVE_PAYROLL_ACTION });
    try {
      const res = await setPayrollService({
        payroll_Id,
        payroll_Name,
        payroll_Value,
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

export const getTeacherTransactionsByMonthAction = (
  selected_Month,
  callback
) => {
  return async (dispatch) => {
    dispatch({ type: GET_TEACHER_TRANSACTIONS_BY_MONTH_ACTION });
    try {
      const res = await getTeacherTransactionsByMonthService({
        selected_Month,
      });
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

export const confirmTeacherTransactionAction = (
  teacher_Id,
  selected_Month,
  callback
) => {
  return async (dispatch) => {
    dispatch({ type: CONFIRM_TEACHER_TRANSACTIONS_BY_ID_ACTION });
    try {
      const res = await confirmTeacherTransactionService({
        teacher_Id,
        selected_Month,
      });
      if (res) {
        dispatch(
          addNotificationAction(res?.message || API_MESSAGE.SUCCESS, false)
        );
        callback && callback(res, null);
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
