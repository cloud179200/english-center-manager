import { Box } from "@mui/material";
import React from "react";
// project imports
// import Customization from "../Customization/index";

// ==============================|| MINIMAL LAYOUT ||============================== //

const MinimalLayout = (props) => (
  <>
    <Box
      sx={{
        background: `background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);`,
      }}
    >
      {props.children}
    </Box>
  </>
);

export default MinimalLayout;
