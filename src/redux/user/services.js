import { postService } from "../../config/services";

export const getUserAction = async (body) => {
  try {
    return await postService(
      `/user/`,
      { ...body },
      "get user fail",
      true
    );
  } catch (error) {
    throw error;
  }
};
