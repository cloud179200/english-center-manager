import { getService } from "../../config/services";

export const getListTeacherService = async () => {
  try {
    return await getService(
      `/api/teachers/get-all`,
      "get teachers fail",
      true
    );
  } catch (error) {
    throw error;
  }
};
