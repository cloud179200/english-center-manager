import React from "react";
import { Backdrop, Modal } from "@mui/material";
import CustomBox from "../custom-box/CustomBox";

const CustomModal = (props) => {
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
        <CustomBox sx={{ position: "absolute" }}><>{props.children}</></CustomBox>
    </Modal>
  );
};

export default CustomModal;
