import {
  ADD_CLASS_ACTION,
  GET_ATTENDANCE_BY_CLASS_ID_ACTION,
  GET_CLASS_ACTION,
  GET_SCHEDULE_BY_CLASS_ID_ACTION,
  GET_STAGE_BY_CLASS_ID_ACTION,
  REMOVE_CLASS_ACTION,
  SET_ATTENDANCE_ACTION,
  SET_CLASS_ACTION,
  SET_SCHEDULE_ACTION,
  SET_STAGE_ACTION,
} from "./action";

import { API_MESSAGE } from "../../config/constant";
import { setLoadingAction, addNotificationAction } from "../utils/operators";
import {
  getClassService,
  addClassService,
  setClassService,
  removeClassService,
  getStageByClassIdService,
  setStageService,
  addStageService,
  removeStageService,
  setScheduleService,
  getScheduleByClassIdService,
  getAttendanceByClassIdService,
  setAttendanceService,
} from "./services";

export const getClassAction = (callback) => {
  return async (dispatch) => {
    dispatch({ type: GET_CLASS_ACTION });
    dispatch(setLoadingAction(true));
    try {
      const res = await getClassService();

      if (res?.data) {
        callback(res.data, null);
        return;
      }
      callback(null, API_MESSAGE.SERVER_ERROR);
    } catch (error) {
      callback(null, error?.data?.message || API_MESSAGE.SERVER_ERROR);
    } finally {
      dispatch(setLoadingAction(false));
    }
  };
};

export const addClassAction = (
  class_Name,
  teacher_Id,
  list_Student,
  class_Fee,
  callback
) => {
  return async (dispatch) => {
    dispatch({ type: ADD_CLASS_ACTION });
    dispatch(setLoadingAction(true));
    try {
      const res = await addClassService({
        class_Name,
        list_Teacher: [
          {
            teacher_Id,
          },
        ],
        list_Student,
        class_Fee,
      });
      if (res) {
        dispatch(addNotificationAction(API_MESSAGE.SUCCESS, false));
        callback(res, null);
        return;
      }
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

export const setClassAction = (
  class_Id,
  class_Name,
  teacher_Id,
  list_Student,
  class_Fee,
  callback
) => {
  return async (dispatch) => {
    dispatch({ type: SET_CLASS_ACTION });
    try {
      const res = await setClassService({
        class_Id,
        class_Name,
        list_Teacher: [
          {
            teacher_Id,
          },
        ],
        list_Student,
        class_Fee,
      });
      if (res) {
        dispatch(addNotificationAction(API_MESSAGE.UPDATE_SUCCESS, false));
        callback(res, null);
        return;
      }
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

export const removeClassAction = (class_Id, email, callback) => {
  return async (dispatch) => {
    dispatch({ type: REMOVE_CLASS_ACTION });
    try {
      const res = await removeClassService({
        class_Id,
        email,
      });
      if (res) {
        dispatch(addNotificationAction(API_MESSAGE.SUCCESS, false));
        callback(res, null);
        return;
      }
      callback(null, API_MESSAGE.SERVER_ERROR);
    } catch (error) {
      callback(null, error?.data?.message || API_MESSAGE.SERVER_ERROR);
      dispatch(
        addNotificationAction(
          error?.data?.message || API_MESSAGE.SERVER_ERROR,
          true
        )
      );
    }
  };
};

export const getStageByClassIdAction = (class_Id, callback) => {
  return async (dispatch) => {
    dispatch({ type: GET_STAGE_BY_CLASS_ID_ACTION });
    try {
      const res = await getStageByClassIdService({ class_Id });

      if (res?.data) {
        callback(res.data, null);
        return;
      }
      callback(null, API_MESSAGE.SERVER_ERROR);
    } catch (error) {
      callback(null, error?.data?.message || API_MESSAGE.SERVER_ERROR);
    }
  };
};

export const addStageAction = (class_Id, stage_Name, callback) => {
  return async (dispatch) => {
    dispatch({ type: SET_STAGE_ACTION });
    try {
      const res = await addStageService({
        class_Id,
        stage_Name,
      });
      if (res) {
        dispatch(addNotificationAction(API_MESSAGE.UPDATE_SUCCESS, false));
        callback(res, null);
        return;
      }
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

export const setStageAction = (stage_Id, stage_Name, callback) => {
  return async (dispatch) => {
    dispatch({ type: SET_STAGE_ACTION });
    try {
      const res = await setStageService({
        stage_Id,
        stage_Name,
      });
      if (res) {
        dispatch(addNotificationAction(API_MESSAGE.UPDATE_SUCCESS, false));
        callback(res, null);
        return;
      }
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

export const removeStageAction = (stage_Id, callback) => {
  return async (dispatch) => {
    dispatch({ type: ADD_CLASS_ACTION });
    try {
      const res = await removeStageService({
        stage_Id,
      });
      if (res) {
        dispatch(addNotificationAction(API_MESSAGE.SUCCESS, false));
        callback(res, null);
        return;
      }
      callback(null, API_MESSAGE.SERVER_ERROR);
    } catch (error) {
      callback(null, error?.data?.message || API_MESSAGE.SERVER_ERROR);
      dispatch(
        addNotificationAction(
          error?.data?.message || API_MESSAGE.SERVER_ERROR,
          true
        )
      );
    }
  };
};

export const getScheduleByClassIdAction = (class_Id, callback) => {
  return async (dispatch) => {
    dispatch({ type: GET_SCHEDULE_BY_CLASS_ID_ACTION });
    try {
      const res = await getScheduleByClassIdService({ class_Id });
      if (res?.data) {
        callback(res.data, null);
        return;
      }
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

export const setScheduleAction = (class_Id, schedules, callback) => {
  return async (dispatch) => {
    dispatch({ type: SET_SCHEDULE_ACTION });
    try {
      const res = await setScheduleService({
        class_Id,
        schedules,
      });
      if (res) {
        dispatch(addNotificationAction(API_MESSAGE.UPDATE_SUCCESS, false));
        callback(res, null);
        return;
      }
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

export const getAttendanceByClassIdAction = (class_Id, callback) => {
  return async (dispatch) => {
    dispatch({ type: GET_ATTENDANCE_BY_CLASS_ID_ACTION });
    try {
      const res = await getAttendanceByClassIdService({ class_Id });
      debugger
      if (res?.data) {
        callback(res.data, null);
        return;
      }
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

export const getAttendanceByStudentIdAction = (student_Id, callback) => {
  return async (dispatch) => {
    dispatch({ type: GET_ATTENDANCE_BY_CLASS_ID_ACTION });
    try {
      const res = await getAttendanceByClassIdService({ student_Id });
      debugger
      if (res?.data) {
        callback(res.data, null);
        return;
      }
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

export const setAttendanceAction = (class_Id, stage_Id, students, callback) => {
  return async (dispatch) => {
    dispatch({ type: SET_ATTENDANCE_ACTION });
    try {
      const res = await setAttendanceService({ class_Id, stage_Id, students });
      if (res) {
        addNotificationAction(
          res?.message || API_MESSAGE.SUCCESS,
          false
        )
        callback(res, null);
        return;
      }
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