import { API_MESSAGE } from "../../config/constant";
import {
  GET_STUDENT_ACTION,
  GET_STUDENT_TRANSACTIONS_ACTION,
  CONFIRM_STUDENT_TRANSACTIONS_BY_ID_ACTION,
  REMOVE_STUDENT_ACTION,
  STUDENT_PAYMENT_CLASS_FEE,
} from "./action";
import {
  confirmStudentTransactionService,
  getListStudentService,
  getStudentTransactionsByIdService,
  getStudentTransactionsService,
  removeStudentService,
  studentPaymentClassFeeService,
} from "./services";
import { addNotificationAction } from "./../utils/operators";

export const getListStudentAction = (callback) => {
  return async (dispatch) => {
    dispatch({ type: GET_STUDENT_ACTION });
    try {
      const res = await getListStudentService();
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

export const removeStudentAction = (student_Id, callback) => {
  return async (dispatch) => {
    dispatch({ type: REMOVE_STUDENT_ACTION });
    try {
      const res = await removeStudentService({ student_Id });
      if (res) {
        dispatch(
          addNotificationAction(
            res?.message || API_MESSAGE.SUCCESS,
            false
          )
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

export const studentPaymentClassFeeAction = (
  student_Id,
  class_Id,
  callback
) => {
  return async (dispatch) => {
    dispatch({ type: STUDENT_PAYMENT_CLASS_FEE });
    try {
      const res = await studentPaymentClassFeeService({
        student_Id: student_Id,
        class_Id: class_Id,
      });
      if (res) {
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

export const getStudentTransactionsByIdAction = (student_Id, callback) => {
  return async (dispatch) => {
    dispatch({ type: CONFIRM_STUDENT_TRANSACTIONS_BY_ID_ACTION });
    try {
      const res = await getStudentTransactionsByIdService({ student_Id });
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

export const getStudentTransactionsAction = (callback) => {
  return async (dispatch) => {
    dispatch({ type: GET_STUDENT_TRANSACTIONS_ACTION });
    try {
      const res = await getStudentTransactionsService();
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

export const confirmStudentTransactionAction = (
  student_Id,
  class_Id,
  email,
  callback
) => {
  return async (dispatch) => {
    dispatch({ type: GET_STUDENT_TRANSACTIONS_ACTION });
    try {
      const res = await confirmStudentTransactionService({
        student_Id,
        class_Id,
        email,
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
