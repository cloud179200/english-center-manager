import React from "react";
import { Box, Typography } from "@mui/material";
import EmailSentPNG from "../../../assets/images/email-sent.png";
import { NAME_TRANS_VN } from "../../../config/constant";

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
        {NAME_TRANS_VN.CHECK_EMAIL_FOR_VERIFY}!
      </Typography>
    </Box>
  );
};

export default VerifyEmailComponent;
