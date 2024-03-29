import { API_MESSAGE } from "../../config/constant";
import { addNotificationAction, setLoadingAction } from "../utils/operators";
import { RESET_USER_REDUCER_ACTION, SET_USER_ACTION, SET_USER_DETAIL_ACTION } from "./action";
import { getUserService } from "./services";

export const getUserDetailAction = (email, callback) => {
  return async (dispatch) => {
    dispatch(setLoadingAction(true));
    try {
      const res = await getUserService(email);
      
      if (res) {
        dispatch(setUserDetailAction(res));
        callback(res, null);
        return;
      }
      callback(null, API_MESSAGE.SERVER_ERROR);
    } catch (error) {
      dispatch(addNotificationAction(error?.message || API_MESSAGE.SERVER_ERROR, true));
    } finally {
      dispatch(setLoadingAction(false));
    }
  };
};

export const setUserAction = (data) => {
  return {
    type: SET_USER_ACTION,
    data
  }
}

export const setUserDetailAction = (data) => {
  return {
    type: SET_USER_DETAIL_ACTION,
    data
  }
}

export const resetUserReducerAction = () => {
    return {
        type: RESET_USER_REDUCER_ACTION
    }
}