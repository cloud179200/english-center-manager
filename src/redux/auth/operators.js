import { addNotificationAction, setLoadingAction } from "../utils/operators";
import { signUpService, signInService } from "./services";

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
    debugger
    dispatch(setLoadingAction(true))
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
      debugger
      if(res) {
        callback(res, null)
        return
      }
      callback(null, "Error")
    } catch (error) {
      debugger
      dispatch(addNotificationAction(error, true));
    } finally{
      dispatch(setLoadingAction(false))
    }
  };
};

export const signInAction = (
  email,
  password,
  callback
) => {
  return async (dispatch) => {
    debugger
    dispatch(setLoadingAction(true))
    try {
      const res = await signInService({
        email,
        password,
      });
      debugger
      if(res) {
        callback(res, null)
        return
      }
      callback(null, "Error")
    } catch (error) {
      debugger
      dispatch(addNotificationAction(error, true));
    } finally{
      dispatch(setLoadingAction(false))
    }
  };
};
