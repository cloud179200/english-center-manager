import React, { useEffect, useState } from "react";
import { Autocomplete, Box, Button, CircularProgress, Divider, FormControl, FormHelperText, Grid, IconButton, InputLabel, OutlinedInput, TextField, Toolbar, Typography, useTheme } from "@mui/material";
import CustomModal from "../../../components/custom-modal/CustomModal";
import { IconX } from "@tabler/icons";
import { useFormik } from "formik";
import { addClassSchema } from "../schema";
import { useDispatch, useSelector } from "react-redux";
import { addClassAction } from "../../../redux/class/operators";
import AnimateButton from "../../../components/extended/AnimateButton";
// import { MuiChipsInput } from "mui-chips-input";
import _ from "lodash"
import teacherMockData from "../../../config/data/teacher-mock-data.json"
import studentMockData from "../../../config/data/student-mock_data.json"
// import { sleep } from "../../../utils";

const teachers = _.cloneDeep(teacherMockData)
const students = _.cloneDeep(studentMockData)

const ClassAddModal = ({ open, handleClose }) => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const loading = useSelector(state => state.common.loading)
  const [teacherList, setTeacherList] = useState([])
  // const [teacherObject, setTeacherObject] = useState({})
  const [studentList, setStudentList] = useState([])
  // const [studentObject, setStudentObject] = useState({})

  const formik = useFormik({
    initialValues: {
      class_Name: "",
      teacher_Id: "",
      student_Ids: "",
      teacherInput: "",
      studentInput: ""
    },
    validationSchema: addClassSchema,
    onSubmit: (values) => {
      dispatch(addClassAction(values.class_Name, values.teacher_Id, values.student_Ids, addClassCallback))
    }
  })

  const addClassCallback = (res, err) => {
    console.log(res, err)
    debugger
  };

  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isValid,
    touched,
    values,
    setFieldValue
  } = formik;


  const initData = async () => {

    setTeacherList(_.cloneDeep(teachers.slice(10, 50)))
    setStudentList(_.cloneDeep(students.slice(10, 50)))

    console.log(studentList)
  }


  useEffect(() => {
    initData()
  }, [])

  console.log("[values]", values)
  return (
    <CustomModal open={open} handleClose={handleClose}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4">New Class</Typography>
        <IconButton onClick={handleClose}>
          <IconX strokeWidth={1.5}
            size="1rem"
            style={{ marginTop: "auto", marginBottom: "auto" }} />
        </IconButton>
      </Toolbar>
      <Divider />
      <Grid container p={2}>
        <Grid item xs={12}>
          <form noValidate onSubmit={handleSubmit} style={{ width: "100%" }}>
            <Grid container columnGap={0.5} flexWrap="nowrap" justifyContent={{ xs: "space-evenly", md: "" }}>
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
                    label="Tên Lớp"
                    inputProps={{}}
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
                    options={_.cloneDeep(teacherList)}
                    renderOption={(props, option) => <div {...props}>{`${option.teacher_Name} - ${option.teacher_Id}`}</div>}
                    value={teacherList.find(item => item.teacher_Id === values.teacher_Id)}
                    getOptionLabel={(option) => option.teacher_Name}
                    onChange={(event, newValue) => {
                      newValue?.teacher_Id && setFieldValue("teacher_Id", newValue.teacher_Id)
                    }}
                    inputValue={values.teacherInput}
                    onInputChange={(event, newInputValue) => {
                      setFieldValue("teacherInput", newInputValue)
                      !newInputValue && setFieldValue("teacher_Id", "")
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        onBlur={handleBlur}
                        error={Boolean(touched.teacher_Id && errors.teacher_Id)}
                        label="Giảng Viên"
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


            {/* <FormControl
              fullWidth
              error={Boolean(touched.class_Name && errors.class_Name)}
              sx={{ ...theme.typography.customInput }}
            >
              <MuiChipsInput value={_.cloneDeep(students).filter(item => values.student_Ids.includes(item.student_Id)).map(item => item.student_Name)} hideClearAll />
              <Autocomplete
                freeSolo
                disableClearable
                options={optionsStudent}
                onChange={(event, newValue) => {
                  console.log("[newValue]", newValue)
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tên sinh"
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                      value: values.studentInput,
                      onChange: (event) => {
                        setFieldValue("studentInput", event.target.value)
                      },
                    }}
                  />
                )}
              />
              {touched.class_Name && errors.class_Name && (
                <FormHelperText error>{errors.class_Name}</FormHelperText>
              )}
            </FormControl> */}
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
                    loading ? <CircularProgress color="secondary" /> : null
                  }
                >
                  Add Class
                </Button>
              </AnimateButton>
            </Box>
          </form>
        </Grid>
      </Grid>
    </CustomModal>
  );
};

export default ClassAddModal;
