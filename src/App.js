import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import { useSelector } from "react-redux";
// defaultTheme
import themes from "./themes";
import { BrowserRouter, Link, Redirect, Route, Switch } from "react-router-dom";
import { AUTH_ROUTE, PRIVATE_ROUTE } from "config/route";

function App() {
  const customization = useSelector((state) => state.customization);

  const AuthRoute = (props) => {
    if (false) {
      return <Redirect push to="/" />;
    }
    return (
      <Route
        exact={props.routeInfo.exact}
        path={props.routeInfo.path}
        component={props.routeInfo.component}
      />
    );
  };
  const PrivateRoute = (props) => {
    if (false) {
      return <Redirect push to="/" />;
    }
    return (
      <Route
        exact={props.routeInfo.exact}
        path={props.routeInfo.path}
        component={props.routeInfo.component}
      />
    );
  };
  const authenticationRouter = AUTH_ROUTE.map((routeInfo) => (
    <AuthRoute key={routeInfo.path} routeInfo={routeInfo} />
  ));
  const privateRouter = PRIVATE_ROUTE.map((routeInfo) => (
    <PrivateRoute key={routeInfo.path} routeInfo={routeInfo} />
  ));

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <BrowserRouter>
          <div className="app">
            <Link to="/">Home</Link>
            <Link to="/signin">signin</Link>
            <Link to="/signup">signup</Link>
            <Switch>
              <Route exact path="/" component={<>vcl</>} />
              {privateRouter}
              {authenticationRouter}
            </Switch>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
