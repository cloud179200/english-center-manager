import { postService } from "../../config/services";

export const signUpService = async (body) => {
  try {
    return await postService(`/api/users/register`, { body }, "Sign up fail", true);
  } catch (error) {
    throw error;
  }
};

export const signInService = async (body) => {
  try {
    return await postService(`/api/users/login`, { body }, "Sign in fail", true);
  } catch (error) {
    throw error;
  }
};
