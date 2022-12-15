import config from "./config";
import { HTTP_RESPONSE_STATUS } from "./constant";
import axios from "axios";
import { sleep } from "../utils";
// import { getLocalStorageUserinfo } from "../utils";

export const postService = async (
  url = "",
  body = null,
  messErr = null,
  isAuthorization = true,
  isFormData = false,
  retries = 3
) => {
  try {
    // const userInfo = await getLocalStorageUserinfo();
    const headers = isFormData
      ? { "Content-Type": "multipart/form-data" }
      : { Accept: "application/json ", "Content-Type": "application/json" };

    if (isAuthorization) {
      headers["Authorization"] =
        "Bearer " + (localStorage.getItem("auth_token") || "");
      headers["Access-Control-Allow-Origin"] = "*";
    }
    // await sleep(2000)
    const response = await axios.post(
      `${config.HOST_API}${url}`,
      JSON.stringify(body),
      {
        headers,
        timeout: 10000,
      }
    );

    if (response.status === HTTP_RESPONSE_STATUS.OK) {
      return response.data;
    }
    if (messErr) {
      throw new Error(messErr);
    }
  } catch (error) {
    if (error?.response?.status === HTTP_RESPONSE_STATUS.BAD_REQUEST) {
      throw error?.response;
    }

    if (error?.response?.status === HTTP_RESPONSE_STATUS.UNAUTHORIZED) {
      localStorage.clear();
      sessionStorage.clear();
      window.location.reload();
      throw error?.response;
    }

    if (
      retries > 0 &&
      error?.response?.status === HTTP_RESPONSE_STATUS.MISSING_AUTHORIZED
    ) {
      try {
        if (error.response) {
          return postService(url, body, messErr, true, false, retries - 1);
        }
      } catch (err) {
        throw error?.response;
      }
    }
    if (error?.response) {
      throw error.response;
    } else {
      throw error;
    }
  }
};

export const getService = async (
  url = "",
  messErr = null,
  isAuthorization = true,
  isFormData = false,
  retries = 3
) => {
  try {
    // const userInfo = await getLocalStorageUserinfo();
    const headers = isFormData
      ? { "Content-Type": "multipart/form-data" }
      : { Accept: "application/json", "Content-Type": "application/json" };

    if (isAuthorization) {
      headers["Authorization"] =
        "Bearer " + (localStorage.getItem("auth_token") || "");
      headers["Access-Control-Allow-Origin"] = "*";
    }
    await sleep(3000)
    const response = await axios.get(`${config.HOST_API}${url}`, {
      headers,
      timeout: 10000,
    });
    if (response.status === HTTP_RESPONSE_STATUS.OK) {
      return response.data;
    }
    if (messErr) {
      throw new Error(messErr);
    }
  } catch (error) {
    if (error?.response?.status === HTTP_RESPONSE_STATUS.BAD_REQUEST) {
      throw error?.response;
    }

    if (error?.response?.status === HTTP_RESPONSE_STATUS.UNAUTHORIZED) {
      localStorage.clear();
      sessionStorage.clear();
      window.location.reload();
      throw error?.response;
    }

    if (
      retries > 0 &&
      error?.response?.status === HTTP_RESPONSE_STATUS.MISSING_AUTHORIZED
    ) {
      try {
        if (error.response) {
          return getService(url, messErr, true, false, retries - 1);
        }
      } catch (err) {
        throw error?.response;
      }
    }
    if (error?.response) {
      throw error.response;
    } else {
      throw error;
    }
  }
};
