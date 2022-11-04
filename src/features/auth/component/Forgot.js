import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { forgotSchema } from "../schema";
import AnimateButton from "../../../ui-component/extended/AnimateButton";
import { useDispatch, useSelector } from "react-redux";
import { addNotificationAction } from "../../../redux/utils/operators";
import { signInAction } from "../../../redux/auth/operators";
import { useTheme } from "@mui/styles";
import { Link } from "react-router-dom/cjs/react-router-dom";

const ForgotComponent = ({ ...others }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.common.loading);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotSchema,
    onSubmit: (values) => {
      signInAction;
      dispatch(signInAction(values.email, forgotCallback));
    },
  });

  const forgotCallback = (res, err) => {
    if (err) {
      return;
    }
    dispatch(addNotificationAction("Send email success!", false));
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

  return (
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
                  Forgot password
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
                label="Email Address / Username"
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-email-login"
                >
                  {errors.email}
                </FormHelperText>
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
                to="/signin"
              >
                Back to signin
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
                    loading ? <CircularProgress color="secondary" /> : null
                  }
                >
                  Send email
                </Button>
              </AnimateButton>
            </Box>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ForgotComponent;
