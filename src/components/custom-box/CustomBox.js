import React from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

const CustomBox = (props) => {
  const customization = useSelector((state) => state.customization);

  return (
    <Box
      m={1}
      mb={2}
      p={2}
      sx={{
        backgroundColor: "#fff",
        borderRadius: `${customization.borderRadius}px`,
        boxShadow: 4,
        ...(props?.sx || {})
      }}
    >
      {props.children}
    </Box>
  );
};

export default CustomBox;
