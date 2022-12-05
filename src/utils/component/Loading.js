import React from "react";
import { useSelector } from "react-redux";
const { Box, CircularProgress } = require("@mui/material");
import loadingSVG from "../../assets/images/loading.svg";

const LoadingComponent = ({ isModal = false }) => {
  const userDetail = useSelector((state) => state.user.userDetail);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: isModal ? "30vh" : "100vh",
      }}
    >
      {userDetail?.user_Type ? (
        <CircularProgress color={isModal ? "secondary" : "primary"} size={40} />
      ) : (
        <img src={loadingSVG} width="20%" />
      )}
    </Box>
  );
};

export default LoadingComponent;
