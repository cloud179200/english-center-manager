import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useFormik } from "formik";
import AnimateButton from "../../../components/extended/AnimateButton";
import {
  strengthColor,
  strengthIndicator,
} from "../../../utils/password-strength";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import { addNotificationAction } from "../../../redux/utils/operators";
import { signUpAction } from "../../../redux/auth/operators";
import { signUpSchema } from "../schema";

const SignUpComponent = ({ ...others }) => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector((state) => state.common.loading);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [checked, setChecked] = useState(true);
  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();

  const formik = useFormik({
    initialValues: {
      first_Name: "",
      last_Name: "",
      email: "",
      password: "",
      confirm_password: "",
      address: "",
      phone_Number: "",
      user_Type: 1,
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      dispatch(
        signUpAction(
          values.first_Name,
          values.last_Name,
          values.email,
          values.password,
          values.address,
          values.phone_Number,
          values.user_Type,
          signUpCallback
        )
      );
    },
  });

  const signUpCallback = (res, err) => {
    if (err) {
      return;
    }
    dispatch(addNotificationAction("Sign up success!", false));
    history.push("/verify-email");
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

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    console.log("[errors]", errors);
  }, [errors]);
  return (
    <>
      <Container maxWidth="sm">
        <Grid
          container
          direction="column"
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
                    Sign up with Email address
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <form noValidate {...others}>
              <Grid container spacing={matchDownSM ? 0 : 2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    margin="normal"
                    name="first_Name"
                    type="text"
                    value={values.first_Name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.first_Name && errors.first_Name)}
                    sx={{ ...theme.typography.customInput }}
                  />
                  {touched.first_Name && errors.first_Name && (
                    <FormHelperText error>{errors.first_Name}</FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    margin="normal"
                    name="last_Name"
                    type="text"
                    value={values.last_Name}
                    error={Boolean(touched.last_Name && errors.last_Name)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    sx={{ ...theme.typography.customInput }}
                  />
                  {touched.last_Name && errors.last_Name && (
                    <FormHelperText error>{errors.last_Name}</FormHelperText>
                  )}
                </Grid>
              </Grid>
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
                  inputProps={{}}
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
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                  name="password"
                  label="Password"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                    changePassword(e.target.value);
                  }}
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
                  inputProps={{}}
                />
                {touched.password && errors.password && (
                  <FormHelperText error>{errors.password}</FormHelperText>
                )}
              </FormControl>
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                {strength !== 0 && values.password && (
                  <FormControl fullWidth>
                    <Box
                      style={{ backgroundColor: level?.color }}
                      sx={{ maxWidth: 85, height: 8, borderRadius: "7px" }}
                    />
                    <Typography variant="subtitle1" fontSize="0.75rem">
                      {level?.label}
                    </Typography>
                  </FormControl>
                )}
              </Grid>
              <FormControl
                fullWidth
                error={Boolean(
                  touched.confirm_password && errors.confirm_password
                )}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel>Confirm Password</InputLabel>
                <OutlinedInput
                  type={showConfirmPassword ? "text" : "password"}
                  value={values.confirm_password}
                  name="confirm_password"
                  label="Confirm Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownConfirmPassword}
                        edge="end"
                        size="large"
                      >
                        {showConfirmPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  inputProps={{}}
                />
                {touched.confirm_password && errors.confirm_password && (
                  <FormHelperText error>
                    {errors.confirm_password}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl
                fullWidth
                error={Boolean(touched.phone_Number && errors.phone_Number)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel>Phone Number</InputLabel>
                <OutlinedInput
                  type="phone"
                  value={values.phone_Number}
                  name="phone_Number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {touched.phone_Number && errors.phone_Number && (
                  <FormHelperText error>{errors.phone_Number}</FormHelperText>
                )}
              </FormControl>
              <FormControl
                fullWidth
                error={Boolean(touched.address && errors.address)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel>Address</InputLabel>
                <OutlinedInput
                  type="text"
                  value={values.address}
                  name="address"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  inputProps={{}}
                />
                {touched.address && errors.address && (
                  <FormHelperText error>{errors.address}</FormHelperText>
                )}
              </FormControl>
              <FormControl
                fullWidth
                variant="outlined"
                error={Boolean(touched.user_Type && errors.user_Type)}
                sx={{ ...theme.typography.customInput }}
              >
                <Select
                  name="user_Type"
                  select={true}
                  value={values.user_Type}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <MenuItem value={1}>Teacher</MenuItem>
                  <MenuItem value={2}>Student</MenuItem>
                </Select>
                {touched.user_Type && errors.user_Type && (
                  <FormHelperText error>{errors.user_Type}</FormHelperText>
                )}
              </FormControl>
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={(event) => setChecked(event.target.checked)}
                        name="checked"
                        color="primary"
                      />
                    }
                    label={
                      <Typography variant="subtitle1">
                        Agree with &nbsp;
                        <Typography variant="subtitle1" component={Link} to="#">
                          Terms & Condition.
                        </Typography>
                      </Typography>
                    }
                  />
                </Grid>
                <Grid item>
                  <Typography
                    variant="subtitle1"
                    color="secondary"
                    sx={{ textDecoration: "none", cursor: "pointer" }}
                    component={Link}
                    to="/signin"
                  >
                    Already Have Account?
                  </Typography>
                </Grid>
              </Grid>
              <Box sx={{ mt: 2 }}>
                <AnimateButton>
                  <Button
                    disableElevation
                    disabled={loading || !isValid}
                    onClick={handleSubmit}
                    fullWidth
                    size="large"
                    variant="contained"
                    color="secondary"
                    endIcon={
                      loading ? <CircularProgress color="secondary" /> : null
                    }
                  >
                    Sign up
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

export default SignUpComponent;
