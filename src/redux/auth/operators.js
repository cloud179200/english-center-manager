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
import {
  signUpService,
  signInService,
  signOutService,
  changePasswordService,
  forgotPasswordService,
  sendVerifiedEmailService,
} from "./services";

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
        gender,
      });
      if (res?.user) {
        callback(res.user, null);
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
      if (res?.user) {
        if (!res.user.emailVerified) {
          await sendVerifiedEmailService(res.user);
          dispatch(addNotificationAction("Email not verified", true));
          callback(null, API_MESSAGE.SERVER_ERROR);
          return;
        }
        callback(res?.user, null);
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
    dispatch({ type: SIGN_OUT_ACTION });
    dispatch(setLoadingAction(true));
    try {
      const res = await forgotPasswordService({
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

export const changePasswordAction = (
  email,
  old_Password,
  new_Password,
  callback
) => {
  return async (dispatch) => {
    dispatch(setLoadingAction(true));
    try {
      const res = await changePasswordService({
        email,
        old_Password,
        new_Password,
      });
      if (res) {
        dispatch(
          addNotificationAction(res?.messagee || API_MESSAGE.SUCCESS, false)
        );
        callback(API_MESSAGE.SUCCESS, null);
        return;
      }
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
