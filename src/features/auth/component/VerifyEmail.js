import React from "react";
import { Box, Typography } from "@mui/material";
import EmailSentPNG from "../../../assets/images/email-sent.png";

const VerifyEmailComponent = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <img src={EmailSentPNG} width="20%" />
      <Typography sx={{ fontWeight: "bold" }} variant="h3" color="black">
        Check your email for verify account!
      </Typography>
    </Box>
  );
};

export default VerifyEmailComponent;
