import React from "react";
import { Box, Button } from "@mui/material";
import NotFoundPNG from "../../assets/images/404.png";
import SearchSVG from "../../assets/images/search.svg";
import { useHistory } from "react-router-dom";
import Animate from "../../components/extended/Animate";

const NotFoundComponent = () => {
  const history = useHistory();
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width:"100%"
        }}
      >
        <img src={SearchSVG} width="10%" /><img src={NotFoundPNG} width="30%" />
      </Box>
      <Animate>
        <Button
          disableElevation
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="secondary"
          onClick={() => history.push("/")}
        >
          Back Home
        </Button>
      </Animate>
    </Box>
  );
};

export default NotFoundComponent;
