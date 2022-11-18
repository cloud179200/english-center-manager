import React from "react";
import { Backdrop, Modal, Box, useTheme, useMediaQuery } from "@mui/material";
import CustomBox from "../custom-box/CustomBox";

const CustomModal = (props) => {
  const theme = useTheme()
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));

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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: matchDownSM ? "100vw" : "50vw",
          left: matchDownSM ? "0" : "25vw",
        }}
      >
        <CustomBox
          sx={{
            p: 0,
            m: 0,
            mt: 2,
            width: "100%",
            maxWidth: matchDownSM ? "100%" : "1000px"
          }}
        >
          {props.children}
        </CustomBox>
      </Box>
    </Modal>
  );
};

export default CustomModal;
