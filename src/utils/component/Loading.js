import React from "react";
const { Box } = require("@mui/material");
import loadingSVG from "../../assets/images/loading.svg";

const LoadingComponent = () => {
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
      <img src={loadingSVG} width="20%" />
    </Box>
  );
};

export default LoadingComponent;
