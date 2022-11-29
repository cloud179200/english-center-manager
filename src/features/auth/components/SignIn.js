import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import AnimateButton from "../../../components/extended/AnimateButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInAction } from "../../../redux/auth/operators";
import { addNotificationAction } from "../../../redux/utils/operators";
import { setUserAction } from "../../../redux/user/operators";
import { signInSchema } from "../schema";
import { NAME_TRANS_VN } from "../../../config/constant";

const SignInComponent = ({ ...others }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.common.loading);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInSchema,
    onSubmit: (values) => {
      dispatch(signInAction(values.email, values.password, signInCallback));
    },
  });

  const signInCallback = (res, err) => {
    if (err) {
      return;
    }
    dispatch(setUserAction({ email: values.email, token: res.token }));
    dispatch(addNotificationAction(res.message, false));
  };
  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isValid,
    touched,
    values,
  } = formik;

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Container maxWidth="sm">
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <Grid item md={12}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              spacing={2}
            >
              <Grid
                item
                xs={12}
                container
                alignItems="center"
                justifyContent="center"
              >
                <Box sx={{ mb: 2 }}>
                  <Typography
                    sx={{ fontWeight: "bold" }}
                    variant="h3"
                    color="black"
                  >
                    {NAME_TRANS_VN.SIGN_IN_TITLE}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <form noValidate onSubmit={handleSubmit} {...others}>
              <FormControl
                fullWidth
                error={Boolean(touched.email && errors.email)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel>Email</InputLabel>
                <OutlinedInput
                  type="email"
                  value={values.email}
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label={NAME_TRANS_VN.EMAIL}
                />
                {touched.email && errors.email && (
                  <FormHelperText error>{errors.email}</FormHelperText>
                )}
              </FormControl>
              <FormControl
                fullWidth
                error={Boolean(touched.password && errors.password)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel>{NAME_TRANS_VN.PASSWORD}</InputLabel>
                <OutlinedInput
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        size="large"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label={NAME_TRANS_VN.PASSWORD}
                />
                {touched.password && errors.password && (
                  <FormHelperText error>{errors.password}</FormHelperText>
                )}
              </FormControl>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                spacing={1}
              >
                <Typography
                  variant="subtitle1"
                  color="secondary"
                  sx={{ textDecoration: "none", cursor: "pointer" }}
                  component={Link}
                  to="/forgot"
                >
                  {NAME_TRANS_VN.FORGOT_PASSWORD}?
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="secondary"
                  sx={{ textDecoration: "none", cursor: "pointer" }}
                  component={Link}
                  to="/signup"
                >
                  {NAME_TRANS_VN.DONT_HAVE_ACCOUNT}?
                </Typography>
              </Stack>
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
                    {NAME_TRANS_VN.SIGN_IN}
                  </Button>
                </AnimateButton>
              </Box>
            </form>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default SignInComponent;
