import { getService, postService } from "../../config/services";

export const setLandingDataService = async (body) => {
  try {
    return await postService(`/api/landing/update-advertising-info`, body, "Set data fail", true);
  } catch (error) {
    throw error;
  }
};

export const addClientDataService = async (body) => {
  try {
    return await postService(`/api/landing/update-advertising-request`, body, "Add data fail", false);
  } catch (error) {
    throw error;
  }
};

export const getLandingDataService = async () => {
  try {
    return await getService(`/api/landing/get-advertising-info`, "Get data fail", false);
  } catch (error) {
    throw error;
  }
};

export const getClientDataService = async () => {
  try {
    return await getService(`/api/landing/get-advertising-request`, "Get data fail", true);
  } catch (error) {
    throw error;
  }
};


