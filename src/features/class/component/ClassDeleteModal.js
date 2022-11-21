import React from "react";
import {
  Grid,
  Divider
} from "@mui/material";
import CustomModal from "../../../components/custom-modal/CustomModal";
import { NAME_TRANS_VN } from "../../../config/constant";

const ClassDeleteModal = ({ open, handleClose, classObject }) => {
  console.log("[class_]",  classObject)
  return (
    <CustomModal open={open} handleClose={handleClose} title={NAME_TRANS_VN.CLASS_DELETE}>
      <Grid container p={2}>
        <Grid item xs={12}>
          {classObject?.class_Name}
        </Grid>
      </Grid>
      <Divider />
    </CustomModal>
  );
};

export default ClassDeleteModal;
