import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import { AppBar, Box, CssBaseline, Toolbar } from "@mui/material";
import Header from "./Header";
import { useSelector } from "react-redux";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme }) => ({
    ...theme.typography.mainContent,
    borderRadius: 0,
    boxShadow: 4,
    width: `100%`,
    paddingTop: theme.spacing(4),
    // [theme.breakpoints.up("md")]: {
    //   marginLeft: -(drawerWidth - 20),
    //   width: `calc(100% - ${drawerWidth}px)`,
    // },
    // [theme.breakpoints.down("md")]: {
    //   marginLeft: "20px",
    //   width: `calc(100% - ${drawerWidth}px)`,
    //   padding: "16px",
    // },
    // [theme.breakpoints.down("sm")]: {
    //   marginLeft: "10px",
    //   width: `calc(100% - ${drawerWidth}px)`,
    //   padding: "16px",
    //   marginRight: "10px",
    // },
  })
);

// ==============================|| MAIN LAYOUT ||============================== //

const PublicLayout = (props) => {
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* header */}
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.default,
          minHeight: "88px",
          boxShadow: 4,
          borderEndEndRadius: `${customization.borderRadius}px`,
          borderEndStartRadius: `${customization.borderRadius}px`,
        }}
      >
        <Toolbar>
          <Header />
        </Toolbar>
      </AppBar>

      {/* main content */}
      <Main
        theme={theme}
        style={{
          padding: 0,
          overflow: "auto",
          height: "calc(100vh - 88px)",
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
          marginTop: 88,
        }}
      >
        {props.children}
      </Main>
    </Box>
  );
};

export default PublicLayout;
