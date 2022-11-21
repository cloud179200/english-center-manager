import * as Yup from "yup"
import { FORM_VALIDATE_ERROR_MESSAGE,  } from "../../config/constant";

export const addClassSchema = Yup.object().shape({
    class_Name: Yup.string()
        .max(255)
        .required(FORM_VALIDATE_ERROR_MESSAGE.REQUIRED),
    teacher_Id: Yup.string()
        .max(255)
        .required(FORM_VALIDATE_ERROR_MESSAGE.REQUIRED),
    student_Ids: Yup.array().min(1, FORM_VALIDATE_ERROR_MESSAGE.REQUIRED),
});

export const editClassSchema = Yup.object().shape({
    class_Name: Yup.string()
        .max(255)
        .required(FORM_VALIDATE_ERROR_MESSAGE.REQUIRED),
    teacher_Id: Yup.string()
        .max(255)
        .required(FORM_VALIDATE_ERROR_MESSAGE.REQUIRED),
    student_Ids: Yup.array().min(1, FORM_VALIDATE_ERROR_MESSAGE.REQUIRED),
});