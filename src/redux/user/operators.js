import { API_MESSAGE } from "../../config/constant";
import { addNotificationAction, setLoadingAction } from "../utils/operators";
import {
  GET_USER_DETAIL_ACTION,
  RESET_USER_REDUCER_ACTION,
  SET_USER_ACTION,
  SET_USER_DETAIL_ACTION,
} from "./action";
import { getUserService } from "./services";

export const getUserDetailAction = (email, callback = null) => {
  return async (dispatch) => {
    dispatch({ type: GET_USER_DETAIL_ACTION });
    dispatch(setLoadingAction(true));
    try {
      const res = await getUserService(email);
      if (res?.data) {
        dispatch(setUserDetailAction(res.data));
        return;
      }
    } catch (error) {
      dispatch(
        addNotificationAction(error?.data?.message || API_MESSAGE.SERVER_ERROR, true)
      );
    } finally {
      dispatch(setLoadingAction(false));
      callback && callback()
    }
  };
};

export const setUserAction = (data) => {
  return {
    type: SET_USER_ACTION,
    data,
  };
};

export const setUserDetailAction = (data) => {
  return {
    type: SET_USER_DETAIL_ACTION,
    data,
  };
};

export const resetUserReducerAction = () => {
  return {
    type: RESET_USER_REDUCER_ACTION,
  };
};
