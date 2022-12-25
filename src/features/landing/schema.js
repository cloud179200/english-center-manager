import * as Yup from "yup";
import { FORM_VALIDATE_ERROR_MESSAGE } from "../../config/constant";
import { parsePhoneNumberWithError } from "libphonenumber-js";

export const landingSchema = Yup.object().shape({
  email: Yup.string()
    .email(FORM_VALIDATE_ERROR_MESSAGE.INVALID)
    .max(255)
    .required(FORM_VALIDATE_ERROR_MESSAGE.REQUIRED),
  name: Yup.string().max(255).required(FORM_VALIDATE_ERROR_MESSAGE.REQUIRED),
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
  description: Yup.string().required(FORM_VALIDATE_ERROR_MESSAGE.REQUIRED),
});

export const landingManageSchema = Yup.object().shape({
  class_Name: Yup.string().required(FORM_VALIDATE_ERROR_MESSAGE.REQUIRED),
  class_Fee: Yup.number().min(1, FORM_VALIDATE_ERROR_MESSAGE.INVALID),
  description: Yup.string().required(FORM_VALIDATE_ERROR_MESSAGE.REQUIRED),
  image_Source: Yup.string().required(FORM_VALIDATE_ERROR_MESSAGE.REQUIRED)
});

