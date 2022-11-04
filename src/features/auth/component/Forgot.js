import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import LoadingComponent from "../../../loading";

const ForgotComponent = () => {
  return (
    <Container maxWidth="sm">
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Box sx={{ mb: 2 }}>
          <Typography sx={{ fontWeight: "bold" }} variant="h3" color="black">
            Check your email for verify account
          </Typography>
        </Box>
        <LoadingComponent />
      </Grid>
    </Container>
  );
};

export default ForgotComponent;
