import { getService } from "../../config/services";

export const getListStudentService = async () => {
  try {
    return await getService(
      `/api/students/get-all`,
      "get students fail",
      true
    );
  } catch (error) {
    throw error;
  }
};
