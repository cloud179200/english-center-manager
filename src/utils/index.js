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
