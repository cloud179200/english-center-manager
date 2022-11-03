import React from "react";
// project imports
import Customization from "../Customization/index";

// ==============================|| MINIMAL LAYOUT ||============================== //

const MinimalLayout = (props) => (
  <>
    {props.children}
    <Customization />
  </>
);

export default MinimalLayout;
