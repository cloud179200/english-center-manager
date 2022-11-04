import { API_MESSAGE } from "../../config/constant";
import { resetCustomizationReducerAction } from "../customization/operators";
import { resetUserReducerAction } from "../user/operators";
import {
  addNotificationAction,
  resetUtilsReducerAction,
  setLoadingAction,
} from "../utils/operators";
import { signUpService, signInService, signOutService } from "./services";

export const signUpAction = (
  first_Name,
  last_Name,
  email,
  password,
  address,
  phone_Number,
  user_Type,
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
      });
      if (res?.data) {
        callback(res.data, null);
        return;
      }
      callback(null, API_MESSAGE.SERVER_ERROR);
    } catch (error) {
      dispatch(
        addNotificationAction(error?.message || API_MESSAGE.SERVER_ERROR, true)
      );
      callback(null, error?.message || API_MESSAGE.SERVER_ERROR);
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
      if (res?.data) {
        callback(res.data, null);
        return;
      }
      callback(null, API_MESSAGE.SERVER_ERROR);
    } catch (error) {
      dispatch(
        addNotificationAction(error?.message || API_MESSAGE.SERVER_ERROR, true)
      );
      callback(null, error?.message || API_MESSAGE.SERVER_ERROR);
    } finally {
      dispatch(setLoadingAction(false));
    }
  };
};

export const signOutAction = (email, callback) => {
  return async (dispatch) => {
    dispatch(setLoadingAction(true));
    try {
      const res = await signOutService({
        email,
      });
      if (res?.data) {
        callback(res.data, null);
        return;
      }
      callback(null, API_MESSAGE.SERVER_ERROR);
    } catch (error) {
      callback(null, error?.message || API_MESSAGE.SERVER_ERROR);
    } finally {
      dispatch(resetCustomizationReducerAction());
      dispatch(resetUserReducerAction());
      dispatch(resetUtilsReducerAction());
      dispatch(setLoadingAction(false));
      localStorage.clear();
      callback(true, null);
    }
  };
};

export const forGotAction = (email, callback) => {
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
        addNotificationAction(error?.message || API_MESSAGE.SERVER_ERROR, true)
      );
      callback(null, error?.message || API_MESSAGE.SERVER_ERROR);
    } finally {
      dispatch(setLoadingAction(false));
    }
  };
};