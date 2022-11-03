import { postService } from "../../config/services";

export const getUserService = async (email) => {
  try {
    return await postService(
      `/api/users/get-by-email?p_email=`+email,
      {},
      "get user fail",
      true
    );
  } catch (error) {
    throw error;
  }
};
