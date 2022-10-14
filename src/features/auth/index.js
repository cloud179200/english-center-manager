import { Container, Grid } from "@mui/material";
import SignInComponent from "./SignIn";
import SignUpComponent from "./SignUp";

const AuthComponent = () => {
  const random = Math.floor(Math.random() * 2) === 1;
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
