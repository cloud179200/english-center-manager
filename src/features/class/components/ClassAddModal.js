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
import { addClassSchema } from "../schema";
import { useDispatch } from "react-redux";
import { addClassAction } from "../../../redux/class/operators";
import AnimateButton from "../../../components/extended/AnimateButton";
import _ from "lodash";
import { NAME_TRANS_VN } from "../../../config/constant";
import CustomChipsInput from "../../../components/custom-input-chips/CustomInputChips";
import { IconCircleCheck } from "@tabler/icons";
import { getListStudentAction } from "../../../redux/student/operators";
import { getListTeacherAction } from "../../../redux/teacher/operators";
import { sortStudentFunc, sortTeacherFunc } from "../../../utils";

const ClassAddModal = ({ open, handleClose, reloadClassData }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [teacherList, setTeacherList] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [studentChipValues, setStudentChipValues] = useState([]);

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
      teacher_Id: 0,
      list_Student: [],
      teacherInput: "",
      studentInput: "",
      class_Fee: 0,
    },
    validationSchema: addClassSchema,
    onSubmit: (values) => {
      dispatch(
        addClassAction(
          values.class_Name,
          values.teacher_Id,
          values.list_Student,
          values.class_Fee,
          addClassCallback
        )
      );
    },
  });

  const addClassCallback = (res, err) => {
    if (err) {
      return;
    }
    reloadClassData();
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
  } = formik;

  const initData = async () => {
    setLoading(true);
    dispatch(
      getListStudentAction((res, err) => {
        if (err) return;
        setStudentList(
          _.cloneDeep(
            res.map((item) => ({
              student_Id: item.student_Id,
              student_Name: item.first_Name + " " + item.last_Name,
            }))
          )
        );
      })
    );
    setLoading(true);
    dispatch(
      getListTeacherAction((res, err) => {
        setLoading(false);
        if (err) return;
        setTeacherList(
          _.cloneDeep(
            res.map((item) => ({
              teacher_Id: item.teacher_Id,
              teacher_Name: item.first_Name + " " + item.last_Name,
            }))
          )
        );
      })
    );
  };

  useEffect(() => {
    setFieldValue(
      "list_Student",
      _.cloneDeep(studentChipValues).map((item) => ({
        student_Id: item.student_Id,
      }))
    );
  }, [studentChipValues]);

  useEffect(() => {
    if (!open) {
      resetForm();
      setStudentChipValues([]);
      return;
    }
    initData();
  }, [open]);

  return (
    <CustomModal
      open={open}
      handleClose={handleClose}
      title={NAME_TRANS_VN.CLASS_NEW}
    >
      <Grid container component="form" onSubmit={handleSubmit} p={2}>
        <Grid item xs={12}>
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
                  getOptionLabel={(option) =>
                    `${option.teacher_Name} - ${option.teacher_Id}`
                  }
                  onChange={(event, newValue) => {
                    newValue?.teacher_Id &&
                      setFieldValue("teacher_Id", newValue.teacher_Id);
                  }}
                  inputValue={values.teacherInput}
                  onInputChange={(event, newInputValue) => {
                    setFieldValue("teacherInput", newInputValue);
                    !newInputValue && setFieldValue("teacher_Id", 0);
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
            error={Boolean(touched.list_Student && errors.list_Student)}
            sx={{ ...theme.typography.customInput }}
          >
            <CustomChipsInput
              onDeleteChip={(chipValue) => {
                setStudentChipValues((prevChips) =>
                  prevChips.filter(
                    (item) => !chipValue.includes(item.student_Id)
                  )
                );
              }}
              onDeleteAllChips={() => setStudentChipValues([])}
              value={studentChipValues.map(
                (item) => item.student_Name + " - " + item.student_Id
              )}
              InputProps={{
                value: "",
                placeholder: `chọn học viên từ trường "Học Viên"`,
                error: Boolean(touched.list_Student && errors.list_Student),
              }}
            />
            {touched.list_Student && errors.list_Student && (
              <FormHelperText error>{errors.list_Student}</FormHelperText>
            )}
            <Autocomplete
              sx={{ marginTop: 2 }}
              options={studentOptions}
              renderOption={(props, option) => (
                <div {...props}>
                  {`${option.student_Name} - ${option.student_Id}`}&nbsp;
                  {_.cloneDeep(values?.list_Student || [])
                    .map((item) => item.student_Id)
                    .includes(option.student_Id) && (
                    <IconCircleCheck
                      strokeWidth={1.5}
                      size="2rem"
                      style={{ marginTop: "auto", marginBottom: "auto" }}
                      color={theme.palette.primary.main}
                    />
                  )}
                </div>
              )}
              getOptionLabel={(option) =>
                `${option.student_Name} - ${option.student_Id}`
              }
              onChange={(event, newValue) => {
                if (
                  !newValue?.student_Id ||
                  _.cloneDeep(studentChipValues).some(
                    (item) => item?.student_Id === newValue?.student_Id
                  )
                ) {
                  return;
                }
                setStudentChipValues((prevChips) =>
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
                  name="list_Student"
                />
              )}
            />
          </FormControl>
          <Grid item xs={12}>
            <FormControl
              fullWidth
              error={Boolean(touched.class_Fee && errors.class_Fee)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel>{NAME_TRANS_VN.CLASS_FEE}</InputLabel>
              <OutlinedInput
                type="number"
                value={values.class_Fee}
                name="class_Fee"
                onBlur={handleBlur}
                onChange={handleChange}
                label={NAME_TRANS_VN.CLASS_FEE}
              />
              {touched.class_Fee && errors.class_Fee && (
                <FormHelperText error>{errors.class_Fee}</FormHelperText>
              )}
            </FormControl>
          </Grid>
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
                  loading ? (
                    <CircularProgress color="secondary" size={20} />
                  ) : null
                }
              >
                {NAME_TRANS_VN.CLASS_ADD}
              </Button>
            </AnimateButton>
          </Box>
        </Grid>
      </Grid>
    </CustomModal>
  );
};

export default ClassAddModal;
