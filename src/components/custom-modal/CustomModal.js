import React from "react";
import {
  Backdrop,
  Modal,
  Box,
  useTheme,
  useMediaQuery,
  Toolbar,
  IconButton,
  Divider,
  Typography,
} from "@mui/material";
import CustomBox from "../custom-box/CustomBox";
import { IconX } from "@tabler/icons";

const CustomModal = (props) => {
  const theme = useTheme();
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
            maxWidth: matchDownSM ? "100%" : "1000px",
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h4">{props.title}</Typography>
            <IconButton onClick={props.handleClose}>
              <IconX
                strokeWidth={1.5}
                size="1rem"
                style={{ marginTop: "auto", marginBottom: "auto" }}
              />
            </IconButton>
          </Toolbar>
          <Divider />
          {props.children}
        </CustomBox>
      </Box>
    </Modal>
  );
};

export default CustomModal;
