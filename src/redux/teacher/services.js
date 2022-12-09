import { getService, postService } from "../../config/services";

export const getListTeacherService = async () => {
  try {
    return await getService(`/api/teachers/get-all`, "get teachers fail", true);
  } catch (error) {
    throw error;
  }
};

export const removeTeacherService = async (body) => {
  try {
    return await postService(
      `/api/teachers/remove?p_teacher_id=${body.teacher_Id}`,
      {},
      "remove teachers fail",
      true
    );
  } catch (error) {
    throw error;
  }
};
