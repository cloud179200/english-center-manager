import { API_MESSAGE } from "../../config/constant";
import { setLoadingAction } from "../utils/operators";
import { GET_ADMIN_DASHBOARD_DATA_ACTION, GET_STUDENT_DASHBOARD_DATA_ACTION, GET_TEACHER_DASHBOARD_DATA_ACTION } from "./actions";
import { getAdminDashboardDataService, getStudentDashboardDataService, getTeacherDashboardDataService } from "./services";

export const getAdminDashboardDataAction = (callback) => {
  return async (dispatch) => {
    dispatch({ type: GET_ADMIN_DASHBOARD_DATA_ACTION });
    try {
      dispatch(setLoadingAction(true))
      const res = await getAdminDashboardDataService();
      if (res?.data) {
        callback(res.data, null);
        return;
      }
      callback(null, API_MESSAGE.SERVER_ERROR);
    } catch (error) {
      callback(null, error?.data?.message || API_MESSAGE.SERVER_ERROR);
    } finally {
      dispatch(setLoadingAction(false))
    }
  };
};

export const getTeacherDashboardDataAction = (teacher_Id, callback) => {
  return async (dispatch) => {
    dispatch({ type: GET_TEACHER_DASHBOARD_DATA_ACTION });
    try {
      dispatch(setLoadingAction(true))
      const res = await getTeacherDashboardDataService({ teacher_Id });
      if (res?.data) {
        callback(res.data, null);
        return;
      }
      callback(null, API_MESSAGE.SERVER_ERROR);
    } catch (error) {
      callback(null, error?.data?.message || API_MESSAGE.SERVER_ERROR);
    } finally {
      dispatch(setLoadingAction(false))
    }
  };
};
export const getStudentDashboardDataAction = (student_Id, callback) => {
  return async (dispatch) => {
    dispatch({ type: GET_STUDENT_DASHBOARD_DATA_ACTION });
    try {
      dispatch(setLoadingAction(true))
      const res = await getStudentDashboardDataService({ student_Id });
      if (res?.data) {
        callback(res.data, null);
        return;
      }
      callback(null, API_MESSAGE.SERVER_ERROR);
    } catch (error) {
      callback(null, error?.data?.message || API_MESSAGE.SERVER_ERROR);
    } finally {
      dispatch(setLoadingAction(false))
    }
  };
};