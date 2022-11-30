import * as Yup from "yup";
import { FORM_VALIDATE_ERROR_MESSAGE } from "../../config/constant";

export const changePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .max(255)
    .min(6, FORM_VALIDATE_ERROR_MESSAGE.INVALID_LENGTH)
    .required(FORM_VALIDATE_ERROR_MESSAGE.REQUIRED),
  new_password: Yup.string().when("password", (password) => {
    if (!password) {
      return Yup.string().typeError(FORM_VALIDATE_ERROR_MESSAGE.INVALID);
    }
    return Yup.string()
      .max(255)
      .required(FORM_VALIDATE_ERROR_MESSAGE.REQUIRED);
  }),
  confirm_new_password: Yup.string().when("new_password", (password) => {
    if (!password) {
      return Yup.string().typeError(FORM_VALIDATE_ERROR_MESSAGE.INVALID);
    }
    return Yup.string()
      .max(255)
      .required(FORM_VALIDATE_ERROR_MESSAGE.REQUIRED)
      .oneOf(
        [Yup.ref("new_password"), null],
        FORM_VALIDATE_ERROR_MESSAGE.INVALID
      );
  }),
});
