import React, { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import EmailSentPNG from "../../../assets/images/email-sent.png";
import EmailSuccessPNG from "../../../assets/images/email-success.png";
import EmailFailedPNG from "../../../assets/images/error.png";
import { NAME_TRANS_VN, STATUS_VERIFY_EMAIL } from "../../../config/constant";


const VerifyEmailComponent = (props) => {
  const statusContent = useMemo(() => {
    switch (props?.status) {
      case STATUS_VERIFY_EMAIL.SUCCESS:
        return {
          image: EmailSuccessPNG,
          content: NAME_TRANS_VN.VERIFY_EMAIL_SUCCESS,
        };
      case STATUS_VERIFY_EMAIL.FAILED:
        return {
          image: EmailFailedPNG,
          content: <>{NAME_TRANS_VN.VERIFY_EMAIL_FAILED}.<br/> Vui Lòng Liên Hệ Email Hỗ Trợ: <a href="mailto:anhqb200@gmail.com">anhqb200@gmail.com</a>.</>,
        };
      case STATUS_VERIFY_EMAIL.SENT:
      default:
        return {
          image: EmailSentPNG,
          content: NAME_TRANS_VN.CHECK_EMAIL_FOR_VERIFY,
        };
    }
  }, []);

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
      <img src={statusContent.image} width="20%" />
      <Typography sx={{ fontWeight: "bold" }} variant="h3" color="black" align="center">
        {statusContent.content}
      </Typography>
    </Box>
  );
};

export default VerifyEmailComponent;
