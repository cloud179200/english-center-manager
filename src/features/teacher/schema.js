import * as Yup from "yup";
import { FORM_VALIDATE_ERROR_MESSAGE } from "../../config/constant";

export const addPayrollSchema = Yup.object().shape({
  payroll_Name: Yup.string()
    .max(255)
    .required(FORM_VALIDATE_ERROR_MESSAGE.REQUIRED),
  payroll_Value: Yup.number().min(1, FORM_VALIDATE_ERROR_MESSAGE.INVALID),
});

export const editPayrollSchema = Yup.object().shape({
  payroll_Id: Yup.string(),
  payroll_Name: Yup.string()
    .max(255)
    .required(FORM_VALIDATE_ERROR_MESSAGE.REQUIRED),
  payroll_Value: Yup.number().min(1, FORM_VALIDATE_ERROR_MESSAGE.INVALID),
});
