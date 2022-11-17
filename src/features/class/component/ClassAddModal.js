import React from "react";
import { Grid } from "@mui/material";
import CustomModal from "../../../components/custom-modal/CustomModal";

const ClassAddModal = ({ open, handleClose }) => {
  return (
    <CustomModal open={open} handleClose={handleClose}>
      <Grid container rowSpacing={2}>
        <Grid item>Chill</Grid>
      </Grid>
    </CustomModal>
  );
};

export default ClassAddModal;
