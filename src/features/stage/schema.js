import * as Yup from "yup";
import { FORM_VALIDATE_ERROR_MESSAGE } from "../../config/constant";

export const addStageSchema = Yup.object().shape({
  class_Id: Yup.number().min(1, FORM_VALIDATE_ERROR_MESSAGE.INVALID),
  stage_Name: Yup.string()
    .max(255)
    .required(FORM_VALIDATE_ERROR_MESSAGE.REQUIRED),
});

export const editStageSchema = Yup.object().shape({
  stage_Id: Yup.number().min(1, FORM_VALIDATE_ERROR_MESSAGE.INVALID),
  stage_Name: Yup.string()
    .max(255)
    .required(FORM_VALIDATE_ERROR_MESSAGE.REQUIRED),
});
