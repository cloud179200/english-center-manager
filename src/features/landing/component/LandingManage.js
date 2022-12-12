/* eslint-disable import/no-unresolved */
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import LoadingComponent from "../../../utils/component/Loading";
import CustomBox from "../../../components/custom-box/CustomBox";
import {
  Button,
  Card,
  CardActionArea,
  CardMedia,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  useTheme,
  Typography,
  CircularProgress,
  CardContent,
  IconButton,
} from "@mui/material";
import { useFormik } from "formik";
import { NAME_TRANS_VN } from "../../../config/constant";
import { landingManageSchema } from "../schema";
import AnimateButton from "../../../components/extended/AnimateButton";
import { uniqueKey, fileToBase64 } from "./../../../utils/index";
import _ from "lodash";
import { IconTrash } from "@tabler/icons";


const LandingManageComponent = () => {
  const theme = useTheme();

  const loading = useSelector((state) => state.common.loading);

  const [landingData, setLandingData] = useState([]);

  const initialValues = useMemo(
    () => ({
      class_Name: "",
      class_Fee: 0,
      base64String: "",
      description: "",
    }),
    []
  );

  const formik = useFormik({
    initialValues,
    validationSchema: landingManageSchema,
    onSubmit: async (values) => {
      setLandingData([
        ..._.cloneDeep(landingData),
        { Id: uniqueKey(), ...values },
      ]);
    },
  });

  const handleRemoveLandingData = (item) => {
    setLandingData(_.cloneDeep(landingData).filter((i) => !_.isEqual(i, item)));
  };

  const handleSetBase64String = async (e) => {
    setSubmitting(true);
    const value = await fileToBase64(e?.target?.files[0]);
    debugger;
    setSubmitting(false);
    if (value) {
      setFieldValue("base64String", value || "");
    }
  };

  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isValid,
    touched,
    values,
    isSubmitting,
    setFieldValue,
    setSubmitting,
  } = formik;

  useEffect(() => {
    if (landingData.length)
      localStorage.setItem("landingData", JSON.stringify(landingData));
  }, [landingData]);

  useEffect(() => {
    setLandingData(JSON.parse(localStorage.getItem("landingData") || "[]"));
  }, []);

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          <CustomBox>
            <Grid container columnSpacing={2} rowSpacing={2}>
              <Grid item xs={12} md={6}>
                <Grid container columnSpacing={2} rowSpacing={2}>
                  {landingData.length === 0 && (
                    <Grid item xs={12} md={6}>
                      <Typography variant="h4">
                        Không Có Lớp Học Quảng Cáo...
                      </Typography>
                    </Grid>
                  )}
                  {landingData.map((item) => (
                    <Grid
                      item
                      xs={12}
                      md={6}
                      key={item.class_Name + "-" + item.Id}
                    >
                      <Card>
                        <CardActionArea sx={{ display: "flex" }}>
                          <CardMedia
                            component="img"
                            src={item.base64String}
                            alt="wang ping"
                            sx={{
                              height: "10vh",
                              width: "auto",
                            }}
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h4"
                              color="text.primary"
                              component="div"
                            >
                              Tên Lớp Học: {item?.class_Name}
                            </Typography>
                            <Typography
                              gutterBottom
                              variant="h4"
                              color="text.primary"
                              component="div"
                            >
                              Giá: {item?.class_Fee}
                            </Typography>
                            <Typography
                              gutterBottom
                              variant="h4"
                              color="text.primary"
                              component="div"
                            >
                              Ghi Chú: {item?.description}
                            </Typography>
                          </CardContent>
                          <IconButton
                            onClick={() =>
                              handleRemoveLandingData(_.cloneDeep(item))
                            }
                            color="error"
                          >
                            <IconTrash
                              strokeWidth={2}
                              size="1.5rem"
                              style={{
                                marginTop: "auto",
                                marginBottom: "auto",
                              }}
                            />
                          </IconButton>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid
                  container
                  component="form"
                  justifyContent="center"
                  alignItems="center"
                  onSubmit={handleSubmit}
                  rowSpacing={2}
                  columnSpacing={2}
                >
                  <Grid item xs={12}>
                    <Typography variant="h4">
                      Thêm Khóa Học Quảng Cáo
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.class_Name && errors.class_Name)}
                      sx={{ ...theme.typography.customInput }}
                    >
                      <InputLabel>{NAME_TRANS_VN.CLASS_NAME}</InputLabel>
                      <OutlinedInput
                        value={values.class_Name}
                        name="class_Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label={NAME_TRANS_VN.CLASS_NAME}
                        autoComplete="off"
                      />
                      {touched.class_Name && errors.class_Name && (
                        <FormHelperText error>
                          {errors.class_Name}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.class_Fee && errors.class_Fee)}
                      sx={{ ...theme.typography.customInput }}
                    >
                      <InputLabel>{NAME_TRANS_VN.CLASS_FEE}</InputLabel>
                      <OutlinedInput
                        value={values.class_Fee}
                        name="class_Fee"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label={NAME_TRANS_VN.CLASS_FEE}
                        autoComplete="off"
                        type="number"
                      />
                      {touched.class_Fee && errors.class_Fee && (
                        <FormHelperText error>
                          {errors.class_Fee}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      error={Boolean(
                        touched.base64String && errors.base64String
                      )}
                      sx={{ ...theme.typography.customInput }}
                    >
                      <InputLabel>{"Ảnh Khóa Học"}</InputLabel>
                      <OutlinedInput
                        name="base64String"
                        onBlur={handleBlur}
                        onChange={handleSetBase64String}
                        autoComplete="off"
                        type="file"
                      />
                      {touched.base64String && errors.base64String && (
                        <FormHelperText error>
                          {errors.base64String}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.description && errors.description)}
                      sx={{ ...theme.typography.customInput }}
                    >
                      <InputLabel>{NAME_TRANS_VN.DESCRIPTION}</InputLabel>
                      <OutlinedInput
                        value={values.description}
                        name="description"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label={NAME_TRANS_VN.DESCRIPTION}
                        autoComplete="off"
                        multiline
                        minRows={3}
                      />
                      {touched.description && errors.description && (
                        <FormHelperText error>
                          {errors.description}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <AnimateButton>
                      <Button
                        disableElevation
                        disabled={isSubmitting || !isValid}
                        onClick={handleSubmit}
                        fullWidth
                        size="large"
                        variant="contained"
                        color="secondary"
                        endIcon={
                          isSubmitting ? (
                            <CircularProgress color="secondary" size={20} />
                          ) : null
                        }
                      >
                        {NAME_TRANS_VN.ADD}
                      </Button>
                    </AnimateButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CustomBox>
        </>
      )}
    </>
  );
};
export default LandingManageComponent;
