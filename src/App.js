import React, { useCallback, useEffect } from "react";
import {
  Alert,
  CssBaseline,
  Slide,
  Snackbar,
  Stack,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// defaultTheme
import themes from "./themes";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { AUTH_ROUTE, PRIVATE_ROUTE } from "./config/route";
import MinimalLayout from "./layout/MinimalLayout";
import MainLayout from "./layout/MainLayout";
import { removeNotificationAction } from "./redux/utils/operators";
import NotFoundComponent from "./utils/component/NotFound";

function App() {
  const customization = useSelector((state) => state.customization);
  const notifications = useSelector((state) => state.common.notifications);
  const userInfo = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  const isValidPath = AUTH_ROUTE.some((route) => route.path === window.location.pathname) || PRIVATE_ROUTE.some((route) => route.path === window.location.pathname);

  const AuthRoute = useCallback(
    ({ routeInfo }) => {
      const { exact, path, component } = routeInfo;
      return (
        <Route exact={exact} path={path}>
          {userInfo?.token ? (
            <Redirect to={"/dashboard"} />
          ) : (
            <MinimalLayout>{component}</MinimalLayout>
          )}
        </Route>
      );
    },
    [userInfo]
  );

  const PrivateRoute = useCallback(
    ({ routeInfo }) => {
      const { exact, path, component } = routeInfo;
      return (
        <Route exact={exact} path={path}>
          {!userInfo?.token ? (
            <Redirect to={"/signin"} />
          ) : (
            <MainLayout>{component}</MainLayout>
          )}
        </Route>
      );
    },
    [userInfo]
  );

  const authenticationRouter = AUTH_ROUTE.map((routeInfo) => (
    <AuthRoute key={routeInfo.path} routeInfo={routeInfo} />
  ));

  const privateRouter = PRIVATE_ROUTE.map((routeInfo) => (
    <PrivateRoute key={routeInfo.path} routeInfo={routeInfo} />
  ));

  const router = (
    <>
      {privateRouter}
      {authenticationRouter}
      {!isValidPath && <Route component={NotFoundComponent} />}
    </>
  );

  // Toast
  const ToastNotificationContainer = (
    <Stack
      position="absolute"
      direction="column-reverse"
      alignItems="flex-end"
      top="2%"
      right="2%"
      rowGap={2}
      zIndex="tooltip"
    >
      {notifications.map((notification) => {
        const handleCloseNotification = () => {
          dispatch(removeNotificationAction(notification.id));
        };

        return (
          <Snackbar
            key={notification.id}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={true}
            autoHideDuration={5000}
            onClose={handleCloseNotification}
            TransitionProps={{ direction: "left" }}
            TransitionComponent={Slide}
          >
            <Alert
              sx={{ width: "fit-content" }}
              variant="filled"
              severity={notification.error ? "error" : "success"}
              onClose={handleCloseNotification}
            >
              {notification.message}
            </Alert>
          </Snackbar>
        );
      })}
    </Stack>
  );

  useEffect(() => {
    userInfo?.token && localStorage.setItem("auth_token", userInfo.token);
  }, [userInfo]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <BrowserRouter>
          <Switch>
            <div className="app">
              {ToastNotificationContainer}
              {router}
            </div>
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
