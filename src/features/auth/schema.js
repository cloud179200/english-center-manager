import * as Yup from "yup";
import { FORM_VALIDATE_ERROR_MESSAGE } from "../../config/constant";
import { parsePhoneNumberWithError } from "libphonenumber-js";

export const signUpSchema = Yup.object().shape({
  email: Yup.string()
    .email(FORM_VALIDATE_ERROR_MESSAGE.INVALID)
    .max(255)
    .required(FORM_VALIDATE_ERROR_MESSAGE.REQUIRED),
  password: Yup.string()
    .max(255)
    .min(6, FORM_VALIDATE_ERROR_MESSAGE.INVALID_LENGTH)
    .required(FORM_VALIDATE_ERROR_MESSAGE.REQUIRED),
  confirm_password: Yup.string()
    .max(255)
    .label("confirm password")
    .required(FORM_VALIDATE_ERROR_MESSAGE.REQUIRED)
    .oneOf([Yup.ref("password"), null], "confirm password not match"),
  first_Name: Yup.string()
    .max(255)
    .required(FORM_VALIDATE_ERROR_MESSAGE.REQUIRED),
  last_Name: Yup.string()
    .max(255)
    .required(FORM_VALIDATE_ERROR_MESSAGE.REQUIRED),
  address: Yup.string().max(255).required(FORM_VALIDATE_ERROR_MESSAGE.REQUIRED),
  phone_Number: Yup.string()
    .test(`phone`, FORM_VALIDATE_ERROR_MESSAGE.INVALID, (value) => {
      try {
        const val = value || "";
        const phone = parsePhoneNumberWithError(val, "VN");
        return phone.isValid();
      } catch (error) {
        return false;
      }
    })
    .required(FORM_VALIDATE_ERROR_MESSAGE.REQUIRED),
  user_Type: Yup.number().default(1),
});

export const signInSchema = Yup.object().shape({
  email: Yup.string()
    .email(FORM_VALIDATE_ERROR_MESSAGE.INVALID)
    .max(255)
    .required(FORM_VALIDATE_ERROR_MESSAGE.REQUIRED),
  password: Yup.string()
    .max(255)
    .min(6, FORM_VALIDATE_ERROR_MESSAGE.INVALID_LENGTH)
    .required(FORM_VALIDATE_ERROR_MESSAGE.REQUIRED),
});
