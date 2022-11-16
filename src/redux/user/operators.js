import { API_MESSAGE } from "../../config/constant";
import { addNotificationAction, setLoadingAction } from "../utils/operators";
import {
  GET_USER_DETIAL_ACTION,
  RESET_USER_REDUCER_ACTION,
  SET_USER_ACTION,
  SET_USER_DETAIL_ACTION,
} from "./action";
import { getUserService } from "./services";

export const getUserDetailAction = (email, callback) => {
  return async (dispatch) => {
    dispatch({ type: GET_USER_DETIAL_ACTION });
    dispatch(setLoadingAction(true));
    // TODO: Remove test
    dispatch(setUserDetailAction({
      "user_Id": 0,
      "email": "string",
      "password": "string",
      "email_Verified": 0,
      "first_Name": "Le",
      "last_Name": "Viet Anh",
      "phone_Number": "string",
      "address": "string",
      "user_Type": 1,
      "reference_Id": 0,
      "status": 0,
      "status_Text": "string",
      "verification_Token": "string",
      "deleted": 0,
      "created_Date": "2022-11-16T06:32:10.812Z",
      "modified_By": "string",
      "modified_Date": "2022-11-16T06:32:10.812Z",
      "list_Roles": [
        {
          "role_Id": 0,
          "role_Name": "string",
          "role_Type": 0,
          "deleted": 0,
          "icon": "string",
          "parent_Role_Id": 0,
          "position": 0,
          "created_By": "string",
          "created_Date": "2022-11-16T06:32:10.812Z",
          "modified_By": "string",
          "modified_Date": "2022-11-16T06:32:10.812Z"
        }
      ]
    }));
    callback(null, API_MESSAGE.SERVER_ERROR)
    dispatch(setLoadingAction(false));
    return
    try {
      const res = await getUserService(email);

      if (res) {
        dispatch(setUserDetailAction(res));
        callback(res, null);
        return;
      }
      callback(null, API_MESSAGE.SERVER_ERROR);
    } catch (error) {
      dispatch(
        addNotificationAction(error?.message || API_MESSAGE.SERVER_ERROR, true)
      );
    } finally {
      dispatch(setLoadingAction(false));
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
