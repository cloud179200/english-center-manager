import { postService } from "../../config/services";

export const signUpService = async (body) => {
  try {
    return await postService(`/api/users/register`, { ...body }, "Sign up fail", false);
  } catch (error) {
    throw error;
  }
};

export const signInService = async (body) => {
  try {
    return await postService(`/api/users/login?email=${body.email}&password=${body.password}`, {}, "Sign in fail", false);
  } catch (error) {
    throw error;
  }
};

export const forgotPasswordService = async (body) => {
  try {
    return await postService(`/api/users/forgot?email=${body.email}&password=${body.password}`, {}, "fail", false);
  } catch (error) {
    throw error;
  }
};

export const signOutService = async (body) => {
  try {
    return await postService(`/api/users/logout?email=` + body.email, {}, "Sign out fail", true);
  } catch (error) {
    throw error;
  }
};

export const changePasswordService = async (body) => {
  try {
    return await postService(`/api/users/change-password?email=${body.email}&old_Password=${body.old_Password}&new_Password=${body.new_Password}`, {}, "change password fail", true);
  } catch (error) {
    throw error;
  }
};
