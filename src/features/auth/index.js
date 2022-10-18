import { Button, Container, Grid } from "@mui/material";
import AnimateButton from "components/extended/AnimateButton";
import { useState } from "react";
import SignInComponent from "./SignIn";
import SignUpComponent from "./SignUp";

const AuthComponent = () => {
  const [random, setRandom] = useState(true);
  return (
    <Container fixed>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Grid item>{random ? <SignInComponent /> : <SignUpComponent />}</Grid>
      </Grid>
    </Container>
  );
};

export default AuthComponent;
