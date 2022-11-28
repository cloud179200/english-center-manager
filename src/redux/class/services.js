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
    return await postService(`/api/class/remove?p_class_id=${body.class_Id}`, body, "remove class fail", true);
  } catch (error) {
    throw error;
  }
};
