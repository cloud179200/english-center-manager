import React from "react";
import { useSelector } from "react-redux";
const { Box, CircularProgress } = require("@mui/material");
import loadingSVG from "../../assets/images/loading.svg";

const LoadingComponent = () => {
  const userDetail = useSelector((state) => state.user.userDetail);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      {userDetail?.user_Type ? (
        <CircularProgress size={40} />
      ) : (
        <img src={loadingSVG} width="20%" />
      )}
    </Box>
  );
};

export default LoadingComponent;
