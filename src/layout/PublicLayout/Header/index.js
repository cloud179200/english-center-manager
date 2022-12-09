import React from "react";
import PropTypes from "prop-types";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Box, Button } from "@mui/material";

// project imports
import LogoSection from "../LogoSection";
import { NAME_TRANS_VN } from "../../../config/constant";
import { IconChevronRight } from "@tabler/icons";

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = () => {
  const theme = useTheme();

  return (
    <>
      {/* logo & toggler button */}
      <Box
        sx={{
          width: 228,
          display: "flex",
          [theme.breakpoints.down("md")]: {
            width: "auto",
          },
        }}
      >
        <Box
          component="span"
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          <LogoSection />
        </Box>
      </Box>

      {/* header search */}
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />
      <Button variant="outlined" href="/signin" endIcon={<IconChevronRight strokeWidth={2} size="2rem" />}>
        {NAME_TRANS_VN.SIGN_IN}
      </Button>
    </>
  );
};

Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func,
};

export default Header;
