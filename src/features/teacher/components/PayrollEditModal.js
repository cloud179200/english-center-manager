import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  useTheme,
} from "@mui/material";
import CustomModal from "../../../components/custom-modal/CustomModal";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import AnimateButton from "../../../components/extended/Animate";
import { NAME_TRANS_VN } from "../../../config/constant";
import { setPayrollAction } from "../../../redux/teacher/operators";
import { editPayrollSchema } from "../schema";

const PayrollEditModal = ({ open, handleClose, payrollObject, reloadPayrollData }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      payroll_Id: 0,
      payroll_Name: "",
      payroll_Value: 0,
    },
    validationSchema: editPayrollSchema,
    onSubmit: (values) => {
      setLoading(true);
      dispatch(
        setPayrollAction(
          values.payroll_Id,
          values.payrolll_Name,
          values.payroll_Value,
          setPayrollCallback
        )
      );
    },
  });

  const setPayrollCallback = (res, err) => {
    setLoading(false);
    if (err) {
      return;
    }
    reloadPayrollData();
  };

  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isValid,
    touched,
    values,
    resetForm,
    setFieldValue
  } = formik;

  useEffect(() => {
    if (!open) {
      return;
    }
    resetForm();
    setFieldValue("payroll_Id", payrollObject?.payroll_Id)
    setFieldValue("payroll_Name", payrollObject?.payroll_Name)
    setFieldValue("payroll_Value", payrollObject?.payroll_Value)
  }, [open]);

  return (
    <CustomModal
      open={open}
      handleClose={handleClose}
      title={NAME_TRANS_VN.PAYROLL_EDIT}
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
                error={Boolean(touched.payroll_Name && errors.payroll_Name)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel>{NAME_TRANS_VN.PAYROLL_NAME}</InputLabel>
                <OutlinedInput
                  type="text"
                  value={values.payroll_Name}
                  name="payroll_Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label={NAME_TRANS_VN.payroll_Name}
                />
                {touched.payroll_Name && errors.payroll_Name && (
                  <FormHelperText error>{errors.payroll_Name}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl
                fullWidth
                error={Boolean(touched.payroll_Value && errors.payroll_Value)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel>{NAME_TRANS_VN.PAYROLL_VALUE}</InputLabel>
                <OutlinedInput
                  type="number"
                  value={values.payroll_Value}
                  name="payroll_Value"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label={NAME_TRANS_VN.PAYROLL_VALUE}
                />
                {touched.payroll_Value && errors.payroll_Value && (
                  <FormHelperText error>{errors.payroll_Value}</FormHelperText>
                )}
              </FormControl>
            </Grid>
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
                {NAME_TRANS_VN.PAYROLL_EDIT}
              </Button>
            </AnimateButton>
          </Box>
        </Grid>
      </Grid>
    </CustomModal>
  );
};

export default PayrollEditModal;