import { GET_CLASS_ACTION } from "./action";

const { API_MESSAGE } = require("../../config/constant");
const { setLoadingAction } = require("../utils/operators");
const { getClassService } = require("./services");

export const getClassAction = (callback) => {
  return async (dispatch) => {
    dispatch({ type: GET_CLASS_ACTION });
    dispatch(setLoadingAction(true));
    try {
      const res = await getClassService();

      if (res?.data) {
        callback(res.data, null);
      }
      callback(res.data, null);
    } catch (error) {
      callback(null, error?.message || API_MESSAGE.SERVER_ERROR);
    } finally {
      dispatch(setLoadingAction(false));
    }
  };
};
