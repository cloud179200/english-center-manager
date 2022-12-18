import { API_MESSAGE } from "../../config/constant";
import { resetUserReducerAction } from "../user/operators";
import {
  addNotificationAction,
  resetUtilsReducerAction,
  // resetUtilsReducerAction,
  setLoadingAction,
  setLoadingCommonAction,
} from "../utils/operators";
import { SIGN_IN_ACTION, SIGN_OUT_ACTION } from "./action";
import { signUpService, signInService, signOutService } from "./services";

export const signUpAction = (
  first_Name,
  last_Name,
  email,
  password,
  address,
  phone_Number,
  user_Type,
  gender,
  callback
) => {
  return async (dispatch) => {
    dispatch(setLoadingAction(true));
    try {
      const res = await signUpService({
        first_Name,
        last_Name,
        email,
        password,
        address,
        phone_Number,
        user_Type,
        gender
      });
      if (res) {
        callback(res, null);
        return;
      }
      callback(null, API_MESSAGE.SERVER_ERROR);
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

export const signInAction = (email, password, callback) => {
  return async (dispatch) => {
    dispatch(setLoadingAction(true));
    try {
      const res = await signInService({
        email,
        password,
      });
      if (res) {
        callback(res, null);
        return;
      }
      callback(null, API_MESSAGE.SERVER_ERROR);
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
      dispatch({ type: SIGN_IN_ACTION });
    }
  };
};

export const signOutAction = (email = null, callback = null) => {
  return async (dispatch) => {
    dispatch({ type: SIGN_OUT_ACTION });
    dispatch(setLoadingCommonAction(true));
    try {
      if (email) {
        const res = await signOutService({
          email,
        });
        if (res?.data?.message) {
          dispatch(addNotificationAction(res?.data?.message, false));
          callback && callback(res?.data?.message, null);
          return;
        }
        callback && callback(null, API_MESSAGE.SERVER_ERROR);
      }
    } catch (error) {
      callback &&
        callback(null, error?.data?.message || API_MESSAGE.SERVER_ERROR);
    } finally {
      dispatch(setLoadingCommonAction(false));
      // dispatch(resetCustomizationReducerAction());
      dispatch(resetUtilsReducerAction());
      localStorage.clear();
      sessionStorage.clear();
      callback && callback(true, null);
      window.location.replace("/signin");
      dispatch(resetUserReducerAction());
    }
  };
};

export const forgotAction = (email, callback) => {
  return async (dispatch) => {
    dispatch(setLoadingAction(true));
    try {
      const res = await signInService({
        email,
      });
      if (res?.data) {
        callback(res.data, null);
        return;
      }
      callback(null, API_MESSAGE.SERVER_ERROR);
    } catch (error) {
      dispatch(
        addNotificationAction(
          error?.data?.messagee || API_MESSAGE.SERVER_ERROR,
          true
        )
      );
      callback(null, error?.data?.message || API_MESSAGE.SERVER_ERROR);
    } finally {
      dispatch(setLoadingAction(false));
    }
  };
};
