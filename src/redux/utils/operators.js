import { ADD_NOTIFICATION_ACTION, REMOVE_NOTIFICATION_ACTION, SET_LOADING_ACTION } from "./actions";
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