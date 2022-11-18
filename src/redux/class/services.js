import { getService, postService } from "../../config/services";

export const getClassService = async () => {
  try {
    return await getService(
      `/api/class`,
      "get class fail",
      true
    );
  } catch (error) {
    throw error;
  }
};

export const addClassService = async (body) => {
  try {
    return await postService(`/api/class/add`, body, "add class fail", true);
  } catch (error) {
    throw error;
  }
};
