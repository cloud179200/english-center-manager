import React, { useEffect, useMemo, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  TextField,
  useTheme,
} from "@mui/material";
import CustomModal from "../../../components/custom-modal/CustomModal";
import { useFormik } from "formik";
import { editClassSchema } from "../schema";
import { useDispatch, useSelector } from "react-redux";
import { addClassAction } from "../../../redux/class/operators";
import AnimateButton from "../../../components/extended/AnimateButton";
import { MuiChipsInput } from "mui-chips-input";
import _ from "lodash";
import teacherMockData from "../../../config/data/teacher-mock-data.json";
import studentMockData from "../../../config/data/student-mock_data.json";
import { NAME_TRANS_VN } from "../../../config/constant";
import { sortStudentFunc, sortTeacherFunc } from "./Class";

const teachers = _.cloneDeep(teacherMockData);
const students = _.cloneDeep(studentMockData);

const ClassEditModal = ({ open, handleClose, classObject }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.common.loading);
  const [teacherList, setTeacherList] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [chipValues, setChipValues] = useState([]);

  const teacherOptions = useMemo(
    () => _.cloneDeep(teacherList).sort(sortTeacherFunc),
    [teacherList]
  );
  const studentOptions = useMemo(
    () => _.cloneDeep(studentList).sort(sortStudentFunc),
    [studentList]
  );

  const formik = useFormik({
    initialValues: {
      class_Name: "",
      teacher_Id: "",
      student_Ids: [],
      teacherInput: "",
      studentInput: "",
    },
    validationSchema: editClassSchema,
    onSubmit: (values) => {
      dispatch(
        addClassAction(
          values.class_Name,
          values.teacher_Id,
          values.student_Ids,
          addClassCallback
        )
      );
    },
  });

  const addClassCallback = (res, err) => {
    console.log(res, err);
    debugger;
  };

  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isValid,
    touched,
    values,
    setFieldValue,
    resetForm,
    setValues,
  } = formik;

  const initData = async () => {
    setTeacherList(_.cloneDeep(teachers));
    setStudentList(_.cloneDeep(students));
  };

  useEffect(() => {
    setFieldValue(
      "student_Ids",
      _.cloneDeep(chipValues).map((item) => item.student_Id)
    );
  }, [chipValues]);

  useEffect(() => {
    if (!open) {
      resetForm();
      setChipValues([]);
      return;
    }
    open && classObject && setValues({ ...classObject });
  }, [open]);

  useEffect(() => {
    initData();
  }, []);

  return (
    <CustomModal open={open} handleClose={handleClose} title={NAME_TRANS_VN.CLASS_EDIT}>
      <Grid container p={2}>
        <Grid item xs={12}>
          <form noValidate onSubmit={handleSubmit} style={{ width: "100%" }}>
            <Grid
              container
              columnGap={0.5}
              flexWrap="nowrap"
              justifyContent={{ xs: "space-evenly", md: "" }}
            >
              <Grid item xs={12} md={6}>
                <FormControl
                  fullWidth
                  error={Boolean(touched.class_Name && errors.class_Name)}
                  sx={{ ...theme.typography.customInput }}
                >
                  <InputLabel>Tên Lớp</InputLabel>
                  <OutlinedInput
                    type="text"
                    value={values.class_Name}
                    name="class_Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label={NAME_TRANS_VN.CLASS_NAME}
                  />
                  {touched.class_Name && errors.class_Name && (
                    <FormHelperText error>{errors.class_Name}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl
                  fullWidth
                  error={Boolean(touched.teacher_Id && errors.teacher_Id)}
                  sx={{ ...theme.typography.customInput }}
                >
                  <Autocomplete
                    options={teacherOptions}
                    renderOption={(props, option) => (
                      <div
                        {...props}
                      >{`${option.teacher_Name} - ${option.teacher_Id}`}</div>
                    )}
                    value={teacherList.find(
                      (item) => item.teacher_Id === values.teacher_Id
                    )}
                    getOptionLabel={(option) => option.teacher_Name}
                    onChange={(event, newValue) => {
                      newValue?.teacher_Id &&
                        setFieldValue("teacher_Id", newValue.teacher_Id);
                    }}
                    inputValue={values.teacherInput}
                    onInputChange={(event, newInputValue) => {
                      setFieldValue("teacherInput", newInputValue);
                      !newInputValue && setFieldValue("teacher_Id", "");
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        onBlur={handleBlur}
                        error={Boolean(touched.teacher_Id && errors.teacher_Id)}
                        label={NAME_TRANS_VN.TEACHER}
                        name="teacher_Id"
                      />
                    )}
                  />
                  {touched.teacher_Id && errors.teacher_Id && (
                    <FormHelperText error>{errors.teacher_Id}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
            <FormControl
              fullWidth
              error={Boolean(touched.student_Ids && errors.student_Ids)}
              sx={{ ...theme.typography.customInput }}
            >
              <MuiChipsInput
                onDeleteChip={(chipValue) => {
                  setChipValues((prevChips) =>
                    prevChips.filter(
                      (item) => !chipValue.includes(item.student_Id)
                    )
                  );
                }}
                onDeleteAllChips={() => setChipValues([])}
                value={chipValues.map(
                  (item) => item.student_Name + " - " + item.student_Id
                )}
                InputProps={{
                  disabled: true,
                  label: "Danh Sách Học Viên",
                  placeholder: "",
                  error: Boolean(touched.student_Ids && errors.student_Ids),
                }}
              />
              {touched.student_Ids && errors.student_Ids && (
                <FormHelperText error>{errors.student_Ids}</FormHelperText>
              )}
              <Autocomplete
                sx={{ marginTop: 2 }}
                options={studentOptions}
                renderOption={(props, option) => (
                  <div
                    {...props}
                  >{`${option.student_Name} - ${option.student_Id}`}</div>
                )}
                getOptionLabel={(option) => option.student_Name}
                onChange={(event, newValue) => {
                  if (
                    !newValue?.student_Id ||
                    _.cloneDeep(chipValues).some(
                      (item) => item?.student_Id === newValue?.student_Id
                    )
                  ) {
                    return;
                  }
                  setChipValues((prevChips) =>
                    [...prevChips, newValue].sort(sortStudentFunc)
                  );
                }}
                inputValue={values.studentInput}
                onInputChange={(event, newInputValue) => {
                  setFieldValue("studentInput", newInputValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    onBlur={handleBlur}
                    label={NAME_TRANS_VN.STUDENT}
                    name="student_Ids"
                  />
                )}
              />
            </FormControl>
            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button
                  disableElevation
                  disabled={!isValid || loading}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="secondary"
                  endIcon={
                    loading ? <CircularProgress color="secondary" size={20} /> : null
                  }
                >
                  {NAME_TRANS_VN.CLASS_ADD}
                </Button>
              </AnimateButton>
            </Box>
          </form>
        </Grid>
      </Grid>
    </CustomModal>
  );
};

export default ClassEditModal;
