import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingComponent from "../../../utils/component/Loading";
import CustomBox from "../../../components/custom-box/CustomBox";
import {
  Button,
  CardMedia,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  useTheme,
  Typography,
  CircularProgress,
  IconButton,
  Fade,
  Tooltip,
} from "@mui/material";
import { useFormik } from "formik";
import { NAME_TRANS_VN } from "../../../config/constant";
import { landingManageSchema } from "../schema";
import AnimateButton from "../../../components/extended/Animate";
import { uniqueKey, fileToBase64 } from "./../../../utils/index";
import _ from "lodash";
import { IconTrash } from "@tabler/icons";
import {
  getClientDataAction,
  getLandingPageDataAction,
  setLandingPageDataAction,
} from "../../../redux/landing/operators";

const LandingManageComponent = () => {
  const theme = useTheme();

  const loadingCommon = useSelector((state) => state.common.loading);
  const dispatch = useDispatch();
  const [defaultLandingData, setDefaultLandingData] = useState([]);
  const [landingData, setLandingData] = useState([]);

  const initialValues = useMemo(
    () => ({
      class_Name: "",
      class_Fee: 0,
      image_Source: "",
      description: "",
    }),
    []
  );

  const formik = useFormik({
    initialValues,
    validationSchema: landingManageSchema,
    onSubmit: async (values) => {
      setLandingData([...landingData, { Id: uniqueKey(), ...values }]);
    },
  });

  const handleSetLandingData = () => {
    dispatch(
      setLandingPageDataAction(
        _.cloneDeep(landingData).map((item) => ({
          class_Name: item.class_Name,
          class_Fee: item.class_Fee,
          description: item.description,
          image_Source: item.image_Source,
        })),
        (res, err) => {
          if (err) {
            return;
          }
          getLandingData();
        }
      )
    );
  };

  const handleRemoveLandingData = (item) => {
    setLandingData(_.cloneDeep(landingData).filter((i) => !_.isEqual(i, item)));
  };

  const handleSetImageSourceBase64 = async (e) => {
    setSubmitting(true);
    const value = await fileToBase64(e?.target?.files[0]);
    setSubmitting(false);
    if (value) {
      setFieldValue("image_Source", value || "");
    }
  };

  const getLandingData = () => {
    dispatch(
      getLandingPageDataAction((res, err) => {
        if (err) {
          return;
        }
        const formattedRes = res.map((item) => ({ Id: uniqueKey(), ...item }));
        setLandingData(_.cloneDeep(formattedRes));
        setDefaultLandingData(_.cloneDeep(formattedRes));
      })
    );
  };

  const getLandingClientData = () => {
    dispatch(
      getClientDataAction((res, err) => {
        if (err) {
          return;
        }
        debugger
      })
    );
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
    getLandingData();
    getLandingClientData();
  }, []);

  return (
    <>
      {loadingCommon ? (
        <LoadingComponent />
      ) : (
        <>
          <CustomBox>
            <Grid container columnSpacing={2} rowSpacing={2}>
              <Grid container justifyContent="center" item xs={12} md={6} columnSpacing={2} rowSpacing={2}>
                <Grid container item xs={12} columnGap={2} rowGap={2} >
                  {landingData.length === 0 && (
                    <Grid item xs={12} md={6}>
                      <Typography variant="h4">
                        Không Có Lớp Học Quảng Cáo...
                      </Typography>
                    </Grid>
                  )}
                  {landingData.map((item) => (
                    <Fade
                      in={true}
                      key={item.class_Name + "-" + item.Id}
                      style={{ transitionDelay: `100ms` }}
                    >
                      <Grid container item xs={12} md={6} columnSpacing={2} maxHeight="100px">
                        <Grid item xs={3}>
                          <CardMedia
                            component="img"
                            src={item.image_Source}
                            alt="wang ping"
                            sx={{
                              maxWidth: "100px"
                            }}
                          />
                        </Grid>
                        <Grid item xs={6}>
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
                          <Tooltip title={`Ghi Chú: ${item?.description}`}>
                            <Typography
                              gutterBottom
                              variant="h4"
                              color="text.primary"
                              component="div"
                              sx={{
                                maxWidth: "100%",
                                maxHeight: "4rem",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              Ghi Chú: {item?.description}
                            </Typography>
                          </Tooltip>
                        </Grid>
                        <Grid container item xs={3} justifyContent="center" alignItems="center">
                          <IconButton
                            onClick={() =>
                              handleRemoveLandingData(_.cloneDeep(item))
                            }
                            color="error"
                            sx={{
                              maxheight: "100px",
                            }}
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
                        </Grid>
                      </Grid>
                    </Fade>
                  ))}
                </Grid>
                <Grid item xs={12} md={6}>
                  <AnimateButton>
                    <Button
                      disableElevation
                      disabled={
                        loadingCommon || _.isEqual(defaultLandingData, landingData)
                      }
                      onClick={handleSetLandingData}
                      fullWidth
                      size="large"
                      variant="contained"
                      color="secondary"
                      endIcon={
                        loadingCommon ? (
                          <CircularProgress color="secondary" size={20} />
                        ) : null
                      }
                    >
                      {NAME_TRANS_VN.SAVE}
                    </Button>
                  </AnimateButton>
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
                        touched.image_Source && errors.image_Source
                      )}
                      sx={{ ...theme.typography.customInput }}
                    >
                      <InputLabel>{"Ảnh Khóa Học"}</InputLabel>
                      <OutlinedInput
                        name="image_Source"
                        onBlur={handleBlur}
                        onChange={handleSetImageSourceBase64}
                        autoComplete="off"
                        type="file"
                      />
                      {touched.image_Source && errors.image_Source && (
                        <FormHelperText error>
                          {errors.image_Source}
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
