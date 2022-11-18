import { ADD_CLASS_ACTION, GET_CLASS_ACTION } from "./action";

const { API_MESSAGE } = require("../../config/constant");
const { setLoadingAction } = require("../utils/operators");
const { getClassService, addClassService } = require("./services");

export const getClassAction = (callback) => {
  return async (dispatch) => {
    dispatch({ type: GET_CLASS_ACTION });
    dispatch(setLoadingAction(true));
    try {
      const res = await getClassService();

      if (res?.data) {
        callback(res.data, null);
      }
      callback(res.data, null);
    } catch (error) {
      callback(null, error?.message || API_MESSAGE.SERVER_ERROR);
    } finally {
      dispatch(setLoadingAction(false));
    }
  };
};

export const addClassAction = (class_Name, teacher_Ids, student_Ids, callback) => {
  return async (dispatch) => {
    dispatch({ type: ADD_CLASS_ACTION });
    dispatch(setLoadingAction(true));
    try {
      const res = await addClassService({ class_Name, teacher_Ids, student_Ids });
      if (res?.data) {
        callback(res.data, null);
      }
      callback(res.data, null);
    } catch (error) {
      callback(null, error?.message || API_MESSAGE.SERVER_ERROR);
    } finally {
      dispatch(setLoadingAction(false));
    }
  };
}