import config from "./config";
import { HTTP_RESPONSE_STATUS } from "./constant";
import axios from "axios";
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
      headers["Authorization"] = "Bearer " + (localStorage.getItem("auth_token") || "");
    }
    const response = await axios.post(
      `${config.HOST_API}${url}`,
      JSON.stringify(body),
      {
        headers,
      }
    );

    if (response.status === HTTP_RESPONSE_STATUS.OK) {
      return response.data;
    }
    if (messErr) {
      throw Error(messErr);
    }
  } catch (error) {
    if (error?.response?.status === HTTP_RESPONSE_STATUS.BAD_REQUEST) {
      return error.response;
    }
    if (
      error?.response &&
      retries > 0 &&
      error?.response?.status === HTTP_RESPONSE_STATUS.MISSING_AUTHORIZED
    ) {
      try {
        if (
          error.response &&
          error.response?.data?.error.indexOf("Nonce is not increasing") !== -1
        ) {
          return postService(url, body, messErr, true, false, retries - 1);
        }
      } catch (error) {
        throw error;
      }
    }
    if (error?.response) {
      throw error.response.message;
    } else {
      throw error;
    }
  }
};

export const getService = async (
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
      : { Accept: "application/json", "Content-Type": "application/json" };

    if (isAuthorization) {
      headers["Authorization"] = "Bearer " + (localStorage.getItem("auth_token") || "");
    }

    const response = await axios.get(`${config.HOST_API}${url}`, {
      headers,
    });

    if (response.status === HTTP_RESPONSE_STATUS.OK) {
      return response.data;
    }
    if (messErr) {
      throw Error(messErr);
    }
  } catch (error) {
    if (error?.response?.status === HTTP_RESPONSE_STATUS.BAD_REQUEST) {
      return error.response;
    }
    if (
      error?.response &&
      retries > 0 &&
      error?.response?.status === HTTP_RESPONSE_STATUS.MISSING_AUTHORIZED
    ) {
      try {
        if (
          error.response &&
          error.response?.data?.error.indexOf("Nonce is not increasing") !== -1
        ) {
          return postService(url, body, messErr, true, false, retries - 1);
        }
      } catch (error) {
        throw error;
      }
    }
    if (error?.response) {
      throw error.response.message;
    } else {
      throw error;
    }
  }
};
