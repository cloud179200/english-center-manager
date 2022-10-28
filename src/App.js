import React, { useCallback } from "react";
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import { useSelector } from "react-redux";
// defaultTheme
import themes from "./themes";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AUTH_ROUTE, PRIVATE_ROUTE } from "./config/route";
import MinimalLayout from "./layout/MinimalLayout";

function App() {
  const customization = useSelector((state) => state.customization);
  const userInfo = useSelector((state) => state.user.userInfo);

  const AuthRoute = useCallback(
    ({ routeInfo }) => {
      const { exact, path, component } = routeInfo;
      if (userInfo) {
        return null;
      }
      return <Route exact={exact} path={path} component={component} />;
    },
    [userInfo]
  );

  const PrivateRoute = useCallback(
    ({ routeInfo }) => {
      const { exact, path, component } = routeInfo;
      if (!userInfo) {
        return null;
      }
      return <Route exact={exact} path={path} component={component} />;
    },
    [userInfo]
  );

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
            <MinimalLayout>
              <Switch>
                <Route exact path={"/"} component={<div>Hi</div>} />;
                {authenticationRouter}
                {privateRouter}
              </Switch>
            </MinimalLayout>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
