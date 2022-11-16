import { v4 as uuidv4 } from 'uuid';

export const getLocalStorageUserinfo = async () => {
  let userInfo = null;
  if (localStorage.getItem("persist:root")) {
    const jsonParse = await JSON.parse(localStorage.getItem("persist:root"));
    if (jsonParse?.user) {
      const userParse = await JSON.parse(jsonParse.user);
      userInfo = userParse.userInfo;
    }
  }
  return userInfo;
};

export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const uniqueKey = () => {
  return uuidv4()
}