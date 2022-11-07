import { getService } from "../../config/services";

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
