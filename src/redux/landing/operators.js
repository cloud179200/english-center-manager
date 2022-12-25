import { API_MESSAGE } from "../../config/constant";
import { addNotificationAction } from "../utils/operators";
import {
  GET_LANDING_PAGE_DATA_ACTION,
  ADD_LANDING_CLIENT_DATA_ACTION,
  SET_LANDING_PAGE_DATA_ACTION,
  GET_LANDING_CLIENT_DATA_ACTION,
} from "./action";
import {
  getClientDataService,
  getLandingDataService,
  addClientDataService,
  setLandingDataService,
} from "./services";

export const getLandingPageDataAction = (callback) => {
  return async (dispatch) => {
    dispatch({ type: GET_LANDING_PAGE_DATA_ACTION });
    try {
      const res = await getLandingDataService();
      if (res?.data) {
        callback(res.data, null);
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
    }
  };
};

export const setLandingPageDataAction = (data, callback) => {
  return async (dispatch) => {
    dispatch({ type: SET_LANDING_PAGE_DATA_ACTION });
    try {
      const res = await setLandingDataService(data);
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
    }
  };
};

export const getClientDataAction = (callback) => {
  return async (dispatch) => {
    dispatch({ type: GET_LANDING_CLIENT_DATA_ACTION });
    try {
      const res = await getClientDataService();
      if (res?.data) {
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
    }
  };
};

export const addClientDataAction = (
  email,
  phone_Number,
  full_Name,
  note,
  callback
) => {
  return async (dispatch) => {
    dispatch({ type: ADD_LANDING_CLIENT_DATA_ACTION });
    try {
      const res = await addClientDataService({
        email,
        phone_Number,
        full_Name,
        note,
      });
      if (res) {
        dispatch(
          addNotificationAction(res?.message || API_MESSAGE.SUCCESS, false)
        );
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
    }
  };
};
