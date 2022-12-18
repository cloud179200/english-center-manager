import React, { useState } from "react";
import { Grid, Box, Button, CircularProgress } from "@mui/material";
import CustomModal from "../../../components/custom-modal/CustomModal";
import { NAME_TRANS_VN } from "../../../config/constant";
import AnimateButton from "../../../components/extended/Animate";
import { useDispatch } from "react-redux";
import { removeStageAction } from "../../../redux/class/operators";

const StageDeleteModal = ({ open, handleClose, reloadStageData, stageObject }) => {
  const dispatch = useDispatch();
  // const userInfo = useSelector(state => state.user.userInfo)
  const [loading, setLoading] = useState(false);
  const handleDeleteStage = async () => {
    setLoading(true);
    dispatch(removeStageAction(stageObject?.stage_Id, removeStageCallback));
  };
  const removeStageCallback = (res, err) => {
    setLoading(false);
    if (err) {
      return;
    }
    handleClose();
    reloadStageData()
  };

  return (
    <CustomModal
      open={open}
      handleClose={handleClose}
      title={`${NAME_TRANS_VN.STAGE_DELETE} ${stageObject?.stage_Name}`}
    >
      <Grid container p={2}>
        <Grid item xs={12} mb={2}>
          {stageObject?.stage_Name}
          <br />
          {stageObject?.stage_Id}
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
                onClick={handleDeleteStage}
                endIcon={
                  loading ? <CircularProgress color="error" size={20} /> : null
                }
              >
                {NAME_TRANS_VN.STAGE_DELETE}
              </Button>
            </AnimateButton>
          </Box>
        </Grid>
      </Grid>
    </CustomModal>
  );
};

export default StageDeleteModal;
