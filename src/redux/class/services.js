import { getService, postService } from "../../config/services";

export const getClassService = async () => {
  try {
    return await getService(
      `/api/class/get-all`,
      "get class fail",
      true
    );
  } catch (error) {
    throw error;
  }
};

export const addClassService = async (body) => {
  try {
    return await postService(`/api/class/insert`, body, "add class fail", true);
  } catch (error) {
    throw error;
  }
};

export const setClassService = async (body) => {
  try {
    return await postService(`/api/class/update`, body, "update class fail", true);
  } catch (error) {
    throw error;
  }
};

export const deleteClassService = async (body) => {
  try {
    return await postService(`/api/class/remove?p_class_id=${body.class_Id}&p_modified_by=${"cloud179200@gmail.com"}`, body, "remove class fail", true);
  } catch (error) {
    throw error;
  }
};

export const getStageByClassIdService = async (body) => {
  try {
    return await getService(`/api/stage/get-by-class?p_class_id=${body.class_Id}`, "get stage fail", true);
  } catch (error) {
    throw error;
  }
};

export const addStageService = async (body) => {
  try {
    return await postService(`/api/stage/insert`, body, "add stage fail", true);
  } catch (error) {
    throw error;
  }
};

export const setStageService = async (body) => {
  try {
    return await postService(`/api/stage/update`, body, "update stage fail", true);
  } catch (error) {
    throw error;
  }
};

export const deleteStageService = async (body) => {
  try {
    return await postService(`/api/stage/remove?p_stage_id=${body.stage_Id}`, body, "remove stage fail", true);
  } catch (error) {
    throw error;
  }
};


export const getScheduleByClassIdService = async (body) => {
  try {
    return await getService(`/api/schedule/get-by-class-id?p_class_id=${body.class_Id}`, "update schedule fail", true);
  } catch (error) {
    throw error;
  }
};

export const setScheduleService = async (body) => {
  try {
    return await postService(`/api/schedule/update`, body, "set schedule fail", true);
  } catch (error) {
    throw error;
  }
};


export const getAttendanceByClassIdService = async (body) => {
  try {
    return await getService(`/api/attendance/get-by-class-id?p_class_id=${body.class_Id}`, "get attendance fail", true);
  } catch (error) {
    throw error;
  }
};

export const setAttendanceService = async (body) => {
  try {
    return await postService(`/api/attendance/update`, body, "update attendance fail", true);
  } catch (error) {
    throw error;
  }
};