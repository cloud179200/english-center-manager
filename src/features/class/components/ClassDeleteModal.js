import React, { useState } from "react";
import { Grid, Box, Button, CircularProgress } from "@mui/material";
import CustomModal from "../../../components/custom-modal/CustomModal";
import { NAME_TRANS_VN } from "../../../config/constant";
import AnimateButton from "../../../components/extended/Animate";
import { useDispatch, useSelector } from "react-redux";
import { removeClassAction } from "../../../redux/class/operators";

const ClassDeleteModal = ({ open, handleClose, reloadClassData, classObject }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.user.userInfo)
  const [loading, setLoading] = useState(false);
  const handleDeleteClass = async () => {
    setLoading(true);
    dispatch(removeClassAction(classObject?.class_Id, userInfo?.email, removeClassCallback));
  };
  const removeClassCallback = (res, err) => {
    setLoading(false);
    if (err) {
      return;
    }
    handleClose();
    reloadClassData()
  };

  return (
    <CustomModal
      open={open}
      handleClose={handleClose}
      title={`${NAME_TRANS_VN.CLASS_DELETE} ${classObject?.class_Name}`}
    >
      <Grid container p={2}>
        <Grid item xs={12} mb={2}>
          {classObject?.class_Name}
          <br />
          {classObject?.class_Id}
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
                onClick={handleDeleteClass}
                endIcon={
                  loading ? <CircularProgress color="error" size={20} /> : null
                }
              >
                {NAME_TRANS_VN.CLASS_DELETE}
              </Button>
            </AnimateButton>
          </Box>
        </Grid>
      </Grid>
    </CustomModal>
  );
};

export default ClassDeleteModal;
