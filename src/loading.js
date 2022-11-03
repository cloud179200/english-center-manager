import React from "react";
const { Box } = require("@mui/material");
import loadingSVG from "./assets/images/loading.svg";
const LoadingComponent = () => {
  return (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <img src={loadingSVG} />
    </Box>
  );
};

export default LoadingComponent;