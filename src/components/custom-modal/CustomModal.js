import React from "react";
import { Backdrop, Modal, Box } from "@mui/material";
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
      <Box
        sx={{
          position: "absolute",
          width: "50vw",
          left: "25vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CustomBox
          sx={{
            width: "100%",
            maxWidth: "1000px",
            p: 0,
            m: 0,
            mt: 2,
          }}
        >
          {props.children}
        </CustomBox>
      </Box>
    </Modal>
  );
};

export default CustomModal;
