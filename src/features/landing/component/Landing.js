import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Typography,
  useTheme,
} from "@mui/material";
import CustomBox from "../../../components/custom-box/CustomBox";
import { useFormik } from "formik";
import { NAME_TRANS_VN } from "../../../config/constant";
import AnimateButton from "../../../components/extended/Animate";
import LandingPage1 from "../../../assets/images/landing-page-1.png";
import { landingSchema } from "../schema";
import clsx from "clsx";
import { IconCurrencyDong } from "@tabler/icons";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import {
  addClientDataAction,
  getLandingPageDataAction,
} from "../../../redux/landing/operators";
import LoadingComponent from "../../../utils/component/Loading";
import { uniqueKey } from "../../../utils";
import { DEFAULT_BACKGROUND_IMAGE } from "../../../redux/customization/constant";
import { NumericFormat } from "react-number-format";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: DEFAULT_BACKGROUND_IMAGE,
  },
  flexCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  courseItemInfo: {
    height: "100%",
    boxShadow: "none",
    backgroundColor: "transparent",
    "*.MuiTypography-root": {
      padding: theme.spacing(1),
      borderRadius: 14,
      color: theme.palette.background.default,
      boxShadow: 4,
    },
  },
  hightlightText: {
    color: "#fff",
    textShadow: `2px 2px 24px ${theme.palette.common.black}`,
  },
  backgroundImage: {
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  courseItemBackground: {
    backdropFilter: `blur(${theme.spacing(2)})`,
  },
}));

const LandingComponent = () => {
  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [landingData, setLandingData] = useState([]);
  const customization = useSelector((state) => state.customization);
  const landingFormRef = useRef(null);
  const initialValues = useMemo(
    () => ({
      email: "",
      name: "",
      phone_Number: "",
      description: "",
    }),
    []
  );

  const formik = useFormik({
    initialValues,
    validationSchema: landingSchema,
    onSubmit: async (values, formikHelpers) => {
      formikHelpers.setSubmitting(true);
      dispatch(
        addClientDataAction(
          values.email,
          values.phone_Number,
          values.name,
          values.description,
          (res, err) => {
            formikHelpers.setSubmitting(false);
            if (err) {
              return;
            }
          }
        )
      );
    },
  });

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
  } = formik;

  const handleClickCourse = (class_Name) => {
    landingFormRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setFieldValue("description", `Tôi muốn đăng ký khóa học ${class_Name}`);
  };

  const getCourseItemVariants = useCallback((even) => {
    return {
      offscreen: {
        x: even ? "-100%" : "100%",
        scale: 0,
        borderRadius: customization.borderRadius,
      },
      onscreen: {
        x: 0,
        scale: 1,
        borderRadius: 0,
        transition: {
          type: "spring",
          duration: 1,
        },
      },
    };
  }, []);

  const getLandingData = () => {
    setLoading(true);
    dispatch(
      getLandingPageDataAction((res, err) => {
        setLoading(false);
        if (err) {
          return;
        }
        const formattedRes = res.map((item) => ({ Id: uniqueKey(), ...item }));
        setLandingData(formattedRes);
      })
    );
  };

  useEffect(() => {
    getLandingData();
  }, []);

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <>
      <Grid container className={classes.root}>
        <Grid
          item
          xs={12}
          sx={{
            backgroundImage: `url(${LandingPage1})`,
          }}
          className={classes.backgroundImage}
        >
          <Container maxWidth="xl">
            <CustomBox
              sx={{
                height: "calc(100vh - 108px)",
                background: "transparent",
                boxShadow: 0,
              }}
            >
              <Grid container height="100%">
                <Grid
                  container
                  justifyContent="center"
                  alignItems="center"
                  item
                  xs={12}
                  md={6}
                >
                  <motion.div
                    animate={{
                      scale: [0.2, 1],
                      rotate: [0, 360],
                      // borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                    }}
                    transition={{
                      duration: 1,
                      ease: "easeInOut",
                      times: [0, 1],
                    }}
                  >
                    <Typography variant="h1" color="#fff">
                      Chinh phục thần tốc mục tiêu IELTS với Trung tâm Anh Ngữ Berry
                    </Typography>
                  </motion.div>
                </Grid>
              </Grid>
            </CustomBox>
          </Container>
        </Grid>

        {landingData.map((item, index) => (
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true }}
            style={{ width: "100%" }}
            key={item.class_Name + "-" + item.Id}
          >
            <motion.div variants={getCourseItemVariants(index % 2 === 0)}>
              <Grid
                sx={{
                  backgroundImage: `url("${item.image_Source}")`,
                }}
                className={clsx([classes.backgroundImage])}
                item
                xs={12}
              >
                <Grid
                  container
                  className={clsx([classes.courseItemBackground])}
                >
                  <Container maxWidth="xl">
                    <Grid container>
                      {index % 2 === 0 ? (
                        <Grid item xs={12} md={6}>
                          <CustomBox
                            className={clsx([
                              classes.courseItemInfo,
                              classes.flexCenter,
                            ])}
                          >
                            <Grid
                              container
                              rowSpacing={4}
                              justifyContent="center"
                              alignItems="center"
                            >
                              <Grid item xs={12}>
                                <Typography
                                  className={classes.hightlightText}
                                  gutterBottom
                                  variant="h2"
                                  component="div"
                                  align="center"
                                >
                                  Tên Lớp: {item.class_Name}
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography
                                  className={classes.hightlightText}
                                  gutterBottom
                                  variant="h2"
                                  component="div"
                                  align="center"
                                >
                                  Mô Tả: {item.description}
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography
                                  className={classes.hightlightText}
                                  gutterBottom
                                  variant="h2"
                                  component="div"
                                  align="center"
                                >
                                  Giá Tiền:{" "}
                                  <NumericFormat
                                    value={item.class_Fee}
                                    thousandsGroupStyle="lakh"
                                    displayType="text"
                                  />
                                  <IconCurrencyDong
                                    strokeWidth={2}
                                    size="1.5rem"
                                    style={{
                                      marginTop: "auto",
                                      marginBottom: "auto",
                                      position: "relative",
                                      top: theme.spacing(1) / 4,
                                    }}
                                  />
                                </Typography>
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <AnimateButton>
                                  <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={() =>
                                      handleClickCourse(item.class_Name)
                                    }
                                  >
                                    Đăng Ký {item.class_Name}
                                  </Button>
                                </AnimateButton>
                              </Grid>
                            </Grid>
                          </CustomBox>
                        </Grid>
                      ) : (
                        <Grid item xs={12} md={6}>
                          <CustomBox
                            sx={{
                              minHeight: "calc(100vh - 108px)",
                              backgroundImage: `url("${item.image_Source}")`,
                            }}
                            className={classes.backgroundImage}
                          ></CustomBox>
                        </Grid>
                      )}
                      {index % 2 !== 0 ? (
                        <Grid item xs={12} md={6}>
                          <CustomBox
                            className={clsx([
                              classes.courseItemInfo,
                              classes.flexCenter,
                            ])}
                          >
                            <Grid
                              container
                              rowSpacing={4}
                              justifyContent="center"
                              alignItems="center"
                            >
                              <Grid item xs={12}>
                                <Typography
                                  className={classes.hightlightText}
                                  gutterBottom
                                  variant="h2"
                                  component="div"
                                  align="center"
                                >
                                  Tên Lớp: {item.class_Name}
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography
                                  className={classes.hightlightText}
                                  gutterBottom
                                  variant="h2"
                                  component="div"
                                  align="center"
                                >
                                  Mô Tả: {item.description}
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography
                                  className={classes.hightlightText}
                                  gutterBottom
                                  variant="h2"
                                  component="div"
                                  align="center"
                                >
                                  Giá Tiền:{" "}
                                  <NumericFormat
                                    value={item.class_Fee}
                                    thousandSeparator={true}
                                    displayType="text"
                                  />
                                  <IconCurrencyDong
                                    strokeWidth={2}
                                    size="1.5rem"
                                    style={{
                                      marginTop: "auto",
                                      marginBottom: "auto",
                                      position: "relative",
                                      top: theme.spacing(1) / 4,
                                    }}
                                  />
                                </Typography>
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <AnimateButton>
                                  <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={() =>
                                      handleClickCourse(item.class_Name)
                                    }
                                  >
                                    Đăng Ký {item.class_Name}
                                  </Button>
                                </AnimateButton>
                              </Grid>
                            </Grid>
                          </CustomBox>
                        </Grid>
                      ) : (
                        <Grid item xs={12} md={6}>
                          <CustomBox
                            sx={{
                              minHeight: "calc(100vh - 108px)",
                              backgroundImage: `url("${item.image_Source}")`,
                            }}
                            className={classes.backgroundImage}
                          ></CustomBox>
                        </Grid>
                      )}
                    </Grid>
                  </Container>
                </Grid>
              </Grid>
            </motion.div>
          </motion.div>
        ))}
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true }}
          style={{ width: "100%" }}
        >
          <motion.div
            variants={getCourseItemVariants((landingData.length + 1) % 2)}
          >
            <Grid item xs={12} ref={landingFormRef}>
              <Container maxWidth="xl">
                <Grid container justifyContent="flex-end">
                  <Grid item xs={12} md={6}>
                    <CustomBox sx={{ minHeight: "calc(50vh - 108px)" }}>
                      <Typography
                        variant="h2"
                        sx={{ marginBottom: theme.spacing(2) }}
                      >
                        Thông Tin Liên Hệ
                      </Typography>
                      <Grid container pl={4}>
                        <Grid item xs={12}>
                          <Typography gutterBottom variant="h4" component="div">
                            Email: berryenglishcenter@gmail.com
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography gutterBottom variant="h4" component="div">
                            Sđt: +84376678264
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography gutterBottom variant="h4" component="div">
                            Địa Chỉ: 175 Tây Sơn, Đống Đa, Hà Nội
                          </Typography>
                        </Grid>
                      </Grid>
                    </CustomBox>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CustomBox>
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
                          <Typography variant="h2">
                            Gửi Yêu Cầu Tư Vấn
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControl
                            fullWidth
                            error={Boolean(touched.email && errors.email)}
                            sx={{ ...theme.typography.customInput }}
                          >
                            <InputLabel>{NAME_TRANS_VN.EMAIL}</InputLabel>
                            <OutlinedInput
                              value={values.email}
                              name="email"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              label={NAME_TRANS_VN.EMAIL}
                              autoComplete="off"
                            />
                            {touched.email && errors.email && (
                              <FormHelperText error>
                                {errors.email}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControl
                            fullWidth
                            error={Boolean(
                              touched.phone_Number && errors.phone_Number
                            )}
                            sx={{ ...theme.typography.customInput }}
                          >
                            <InputLabel>
                              {NAME_TRANS_VN.PHONE_NUMBER}
                            </InputLabel>
                            <OutlinedInput
                              value={values.phone_Number}
                              name="phone_Number"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              label={NAME_TRANS_VN.PHONE_NUMBER}
                              autoComplete="off"
                            />
                            {touched.phone_Number && errors.phone_Number && (
                              <FormHelperText error>
                                {errors.phone_Number}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                          <FormControl
                            fullWidth
                            error={Boolean(touched.name && errors.name)}
                            sx={{ ...theme.typography.customInput }}
                          >
                            <InputLabel>{NAME_TRANS_VN.NAME}</InputLabel>
                            <OutlinedInput
                              value={values.name}
                              name="name"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              label={NAME_TRANS_VN.NAME}
                              autoComplete="off"
                            />
                            {touched.name && errors.name && (
                              <FormHelperText error>
                                {errors.name}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                          <FormControl
                            fullWidth
                            error={Boolean(
                              touched.description && errors.description
                            )}
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
                                  <CircularProgress
                                    color="secondary"
                                    size={20}
                                  />
                                ) : null
                              }
                            >
                              {NAME_TRANS_VN.SEND}
                            </Button>
                          </AnimateButton>
                        </Grid>
                      </Grid>
                    </CustomBox>
                  </Grid>
                </Grid>
              </Container>
            </Grid>
          </motion.div>
        </motion.div>
      </Grid>
    </>
  );
};

export default LandingComponent;
