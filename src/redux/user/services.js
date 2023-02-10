import { getService } from "../../config/services";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './../../config/firebase';
export const getUserService = async (email) => {
  try {
    return await onAuthStateChanged(auth)
    return await getService(
      `/api/users/get-by-email?p_email=`+email,
      "get user fail",
      true
    );
  } catch (error) {
    throw error;
  }
};