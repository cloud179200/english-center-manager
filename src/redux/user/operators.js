import { addNotificationAction, setLoadingAction } from "../utils/operators";
import { RESET_USER_REDUCER_ACTION, SET_USER_ACTION } from "./action";
import { getUserService } from "./services";

export const getUserAction = (email, callback) => {
  return async (dispatch) => {
    debugger;
    dispatch(setLoadingAction(true));
    try {
      const res = await getUserService(email);
      debugger
      if (res) {
        callback(res, null);
        return;
      }
      callback(null, "Error");
    } catch (error) {
      dispatch(addNotificationAction(error, true));
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

export const resetUserReducerAction = () => {
    return {
        type: RESET_USER_REDUCER_ACTION
    }
}