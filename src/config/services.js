import config from "./config";
import { HTTP_RESPONSE_STATUS } from "./constant";
import axios from "axios"

const getUserInfo = async () => {
  let userInfo = null;
  if (localStorage.getItem("persist:root")) {
    const jsonParse = await JSON.parse(localStorage.getItem("persist:root"));
    if(jsonParse?.user){
      const userParse = await JSON.parse(jsonParse.user);
      userInfo = userParse.userInfo;
    }
  }
  return userInfo;
};

export const postService = async (
  url = "",
  body = null,
  messErr = null,
  isAuthorization = true,
  isFormData = false,
  retries = 3
) => {
  try {
    const headers = isFormData
      ? { "Content-Type": "multipart/form-data" }
      : { Accept: "application/json ", "Content-Type": "application/json" };

    if (isAuthorization) {
      const userInfo = await getUserInfo();
      if (userInfo?.token) {
        headers["Authorization"] = "Bearer "+userInfo.token;
      }
    }
    const response = await axios.post(
      `${config.HOST_API}${url}`,
      JSON.stringify(body),
      {
        // const response = await axios.post(`https://ev91e9mu8l.execute-api.us-east-1.amazonaws.com/dev/users`, JSON.stringify(body), {
        headers,
        withCredentials: true,
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
        debugger;
      }
    }
    if (error?.response) {
      throw error.response.message;
    } else {
      throw error;
    }
  }
};
