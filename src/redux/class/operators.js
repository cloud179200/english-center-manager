import { ADD_CLASS_ACTION, GET_CLASS_ACTION, SET_CLASS_ACTION } from "./action";

const { API_MESSAGE } = require("../../config/constant");
const {
  setLoadingAction,
  addNotificationAction,
} = require("../utils/operators");
const {
  getClassService,
  addClassService,
  setClassService,
  deleteClassService,
} = require("./services");

export const getClassAction = (callback) => {
  return async (dispatch) => {
    dispatch({ type: GET_CLASS_ACTION });
    dispatch(setLoadingAction(true));
    try {
      const res = await getClassService();

      if (res?.data) {
        callback(res.data, null);
        return;
      }
      callback(null, API_MESSAGE.SERVER_ERROR);
    } catch (error) {
      callback(null, error?.data?.message || API_MESSAGE.SERVER_ERROR);
    } finally {
      dispatch(setLoadingAction(false));
    }
  };
};

export const addClassAction = (
  class_Name,
  teacher_Id,
  list_Student,
  class_Fee,
  callback
) => {
  return async (dispatch) => {
    dispatch({ type: ADD_CLASS_ACTION });
    dispatch(setLoadingAction(true));
    try {
      const res = await addClassService({
        class_Name,
        list_Teacher: [
          {
            teacher_Id,
          },
        ],
        list_Student,
        class_Fee,
      });
      if (res) {
        dispatch(addNotificationAction(API_MESSAGE.SUCCESS, false));
        callback(res, null);
        return;
      }
    } catch (error) {
      dispatch(
        addNotificationAction(
          error?.data?.message || API_MESSAGE.SERVER_ERROR,
          true
        )
      );
      callback(null, error?.data?.message || API_MESSAGE.SERVER_ERROR);
    } finally {
      dispatch(setLoadingAction(false));
    }
  };
};

export const setClassAction = (
  class_Id,
  class_Name,
  teacher_Id,
  list_Student,
  class_Fee,
  callback
) => {
  return async (dispatch) => {
    dispatch({ type: SET_CLASS_ACTION });
    try {
      const res = await setClassService({
        class_Id,
        class_Name,
        list_Teacher: [
          {
            teacher_Id,
          },
        ],
        list_Student,
        class_Fee,
      });
      if (res) {
        dispatch(addNotificationAction(API_MESSAGE.UPDATE_SUCCESS, false));
        callback(res, null);
        return;
      }
    } catch (error) {
      dispatch(
        addNotificationAction(
          error?.data?.message || API_MESSAGE.SERVER_ERROR,
          true
        )
      );
      callback(null, error?.data?.message || API_MESSAGE.SERVER_ERROR);
    }
  };
};

export const removeClassAction = (class_Id, callback) => {
  return async (dispatch) => {
    dispatch({ type: ADD_CLASS_ACTION });
    try {
      const res = await deleteClassService({
        class_Id,
      });
      if (res) {
        dispatch(addNotificationAction(API_MESSAGE.SUCCESS, true));
        callback(res, null);
        return;
      }
      callback(null, API_MESSAGE.SERVER_ERROR);
    } catch (error) {
      callback(null, error?.data?.message || API_MESSAGE.SERVER_ERROR);
      dispatch(
        addNotificationAction(
          error?.data?.message || API_MESSAGE.SERVER_ERROR,
          true
        )
      );
    }
  };
};
