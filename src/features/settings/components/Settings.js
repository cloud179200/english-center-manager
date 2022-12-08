import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomBox from "../../../components/custom-box/CustomBox";
import AnimateButton from "../../../components/extended/AnimateButton";
import LoadingComponent from "../../../utils/component/Loading";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import { changePasswordSchema } from "../schema";
import { NAME_TRANS_VN } from "./../../../config/constant";
import { getUserDetailAction } from "./../../../redux/user/operators";
import { sleep } from "../../../utils";
import WangBinh from "../../../assets/images/users/nguoiwangbinh.jpg";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Settings = () => {
  const theme = useTheme();
  const loading = useSelector((state) => state.common.loading);
  const userInfo = useSelector((state) => state.user.userInfo);
  const userDetail = useSelector((state) => state.user.userDetail);
  const dispatch = useDispatch();
  const [chilling, setChilling] = useState(null);
  const [showPassword, setShowPassword] = useState({
    password: false,
    new_password: false,
    confirm_new_password: false,
  });

  const initialValues = useMemo(
    () => ({
      password: "",
      new_password: "",
      confirm_new_password: "",
    }),
    []
  );

  const formik = useFormik({
    initialValues,
    validationSchema: changePasswordSchema,
    onSubmit: async (values, formikHelpers) => {
      formikHelpers.setSubmitting(true);
      console.log(values);
      await sleep(2000);
      formikHelpers.setSubmitting(false);
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
  } = formik;

  useEffect(() => {
    if (!userInfo?.token || !userInfo?.email) {
      return 
    }
    dispatch(getUserDetailAction(userInfo.email));
  }, []);

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          <CustomBox>
            <Typography variant="h2" sx={{ marginBottom: theme.spacing(2) }}>
              {NAME_TRANS_VN.SETTINGS}
            </Typography>
            <Divider />
            <Grid
              container
              rowSpacing={2}
              columnSpacing={4}
              sx={{ marginTop: theme.spacing(2) }}
            >
              <Grid item xs={12} md={6}>
                <Grid container rowSpacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h4">
                      {NAME_TRANS_VN.INFORMATION}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Card sx={{ boxShadow: 4 }}>
                      <CardActionArea
                        onClick={() =>
                          setChilling(
                            chilling
                              ? null
                              : {
                                  animation: `nfLoaderSpin infinite 1000ms linear`,
                                  transformBox: "fill-box",

                                  "@keyframes nfLoaderSpin": {
                                    from: {
                                      transform: "rotate(0deg)",
                                    },
                                    to: {
                                      transform: "rotate(360deg)",
                                    },
                                  },
                                }
                          )
                        }
                      >
                        <CardMedia
                          component="img"
                          height="300"
                          src={WangBinh}
                          alt="wang ping"
                          sx={chilling || {}}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {`${userDetail?.first_Name} ${userDetail?.last_Name}`}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Là một người ưang ping
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
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
                >
                  <Grid item xs={12}>
                    <Typography variant="h4">
                      {NAME_TRANS_VN.CHANGE_PASSWORD}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.password && errors.password)}
                      sx={{ ...theme.typography.customInput }}
                    >
                      <InputLabel>{NAME_TRANS_VN.PASSWORD}</InputLabel>
                      <OutlinedInput
                        value={values.password}
                        name="password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label={NAME_TRANS_VN.PASSWORD}
                        autoComplete="off"
                        type={showPassword.password ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() =>
                                setShowPassword({
                                  ...showPassword,
                                  password: !showPassword.password,
                                })
                              }
                              edge="end"
                              size="large"
                            >
                              {showPassword.password ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      {touched.password && errors.password && (
                        <FormHelperText error>{errors.password}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      error={Boolean(
                        touched.new_password && errors.new_password
                      )}
                      sx={{ ...theme.typography.customInput }}
                    >
                      <InputLabel>{NAME_TRANS_VN.NEW_PASSWORD}</InputLabel>
                      <OutlinedInput
                        value={values.new_password}
                        name="new_password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label={NAME_TRANS_VN.NEW_PASSWORD}
                        autoComplete="off"
                        type={showPassword.new_password ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() =>
                                setShowPassword({
                                  ...showPassword,
                                  new_password: !showPassword.new_password,
                                })
                              }
                              edge="end"
                              size="large"
                            >
                              {showPassword.new_password ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      {touched.new_password && errors.new_password && (
                        <FormHelperText error>
                          {errors.new_password}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      error={Boolean(
                        touched.confirm_new_password &&
                          errors.confirm_new_password
                      )}
                      sx={{ ...theme.typography.customInput }}
                    >
                      <InputLabel>{NAME_TRANS_VN.CONFIRM_PASSWORD}</InputLabel>
                      <OutlinedInput
                        value={values.confirm_new_password}
                        name="confirm_new_password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label={NAME_TRANS_VN.CLASS_NAME}
                        autoComplete="off"
                        type={
                          showPassword.confirm_new_password
                            ? "text"
                            : "password"
                        }
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() =>
                                setShowPassword({
                                  ...showPassword,
                                  confirm_new_password:
                                    !showPassword.confirm_new_password,
                                })
                              }
                              edge="end"
                              size="large"
                            >
                              {showPassword.confirm_new_password ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      {touched.confirm_new_password &&
                        errors.confirm_new_password && (
                          <FormHelperText error>
                            {errors.confirm_new_password}
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
                        {NAME_TRANS_VN.CHANGE_PASSWORD}
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

export default Settings;
