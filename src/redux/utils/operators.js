import { ADD_NOTIFICATION_ACTION, REMOVE_NOTIFICATION_ACTION, RESET_UTILS_REDUCER_ACTION, SET_LOADING_ACTION, SET_LOADING_COMMON_ACTION } from "./actions";
import uniqid from "uniqid";

export const addNotificationAction = (message = "", error = false) => {
  const messageId = uniqid();
  return {
    type: ADD_NOTIFICATION_ACTION,
    message,
    error,
    id: messageId,
  };
};

export const removeNotificationAction = (id) => {
  return {
    type: REMOVE_NOTIFICATION_ACTION,
    id,
  };
};

export const setLoadingAction = (state = false) => {
  return {
    type: SET_LOADING_ACTION,
    state
  }
}

export const setLoadingCommonAction = (state = false) => {
  return {
    type: SET_LOADING_COMMON_ACTION,
    state
  }
}

export const resetUtilsReducerAction = () => {
  return {
      type: RESET_UTILS_REDUCER_ACTION
  }
}