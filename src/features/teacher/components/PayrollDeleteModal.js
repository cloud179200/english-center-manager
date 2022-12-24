import React, { useState } from "react";
import { Grid, Box, Button, CircularProgress } from "@mui/material";
import CustomModal from "../../../components/custom-modal/CustomModal";
import { NAME_TRANS_VN } from "../../../config/constant";
import AnimateButton from "../../../components/extended/Animate";
import { useDispatch, useSelector } from "react-redux";
import { removePayrollAction } from "../../../redux/teacher/operators";

const PayrollDeleteModal = ({ open, handleClose, reloadPayrollData, PayrollObject }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.user.userInfo)
  const [loading, setLoading] = useState(false);
  const handleDeletePayroll = async () => {
    setLoading(true);
    dispatch(removePayrollAction(PayrollObject?.payroll_Id, userInfo?.email, removePayrollCallback));
  };
  const removePayrollCallback = (res, err) => {
    setLoading(false);
    if (err) {
      return;
    }
    handleClose();
    reloadPayrollData()
  };

  return (
    <CustomModal
      open={open}
      handleClose={handleClose}
      title={`${NAME_TRANS_VN.PAYROLL_DELETE} ${PayrollObject?.payroll_Name}`}
    >
      <Grid container p={2}>
        <Grid item xs={12} mb={2}>
          {PayrollObject?.payroll_Name}
          <br />
          {PayrollObject?.payroll_Id}
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ mt: 2 }}>
            <AnimateButton>
              <Button
                disableElevation
                fullWidth
                size="large"
                variant="contained"
                color="error"
                disabled={loading}
                onClick={handleDeletePayroll}
                endIcon={
                  loading ? <CircularProgress color="error" size={20} /> : null
                }
              >
                {NAME_TRANS_VN.PAYROLL_DELETE}
              </Button>
            </AnimateButton>
          </Box>
        </Grid>
      </Grid>
    </CustomModal>
  );
};

export default PayrollDeleteModal;
