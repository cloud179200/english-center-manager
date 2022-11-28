import { API_MESSAGE } from "../../config/constant";
import { GET_TEACHER_ACTION } from "./action";
import { getListTeacherService } from "./services";
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
