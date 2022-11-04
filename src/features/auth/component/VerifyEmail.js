import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
const VerifyEmailComponent = () => {
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
            Check your email for verify account !
          </Typography>
        </Box>
        {/* <Icon
        <EmailIcon color="secondary" sx={{ fontSize: 40 }}/> */}
      </Grid>
    </Container>
  );
};

export default VerifyEmailComponent;
