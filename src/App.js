import React, { useCallback, useEffect } from "react";
import {
  Alert,
  CssBaseline,
  Grow,
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
import {
  removeNotificationAction,
  resetUtilsReducerAction,
} from "./redux/utils/operators";
import { getUserAction } from "./redux/user/operators";

function App() {
  const customization = useSelector((state) => state.customization);
  const notifications = useSelector((state) => state.common.notifications);
  const userInfo = useSelector((state) => state.user.userInfo);
  const location = useSelector((state) => state.router.location);
  const dispatch = useDispatch();

  const AuthRoute = useCallback(
    ({ routeInfo }) => {
      const { exact, path, component } = routeInfo;
      return (
        <Route exact={exact} path={path}>
          {userInfo?.token ? <Redirect to={"/dashboard"} /> : component}
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
          {!userInfo?.token ? <Redirect to={"/signin"} /> : component}
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

  // Toast
  const ToastNotificationContainer = (
    <Stack
      position="absolute"
      direction="column-reverse"
      top="2%"
      right="5%"
      rowGap={2}
    >
      {notifications.map((notification) => {
        const timerRemoveNotification = setTimeout(() => {
          dispatch(removeNotificationAction(notification.id));
          clearTimeout(timerRemoveNotification);
        }, 5000);

        return (
          <Grow in key={notification.id}>
            <Alert
              variant="filled"
              severity={notification.error ? "error" : "success"}
              onClose={() => {
                dispatch(removeNotificationAction(notification.id));
              }}
            >
              {notification.message}
            </Alert>
          </Grow>
        );
      })}
    </Stack>
  );

  const loadData = async () => {
    if (userInfo?.token && userInfo?.email) {
      dispatch(getUserAction(userInfo?.email, () => {}));
    }
  };

  useEffect(() => {
    loadData();
    dispatch(resetUtilsReducerAction());
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <BrowserRouter>
          <Switch>
            <div className="app">
              {ToastNotificationContainer}
              {!AUTH_ROUTE.some((item) => item.path === location.pathname) ? (
                <MainLayout />
              ) : (
                <MinimalLayout />
              )}
              {privateRouter}
              {authenticationRouter}
              <Route path="/*">
                <div>404</div>
              </Route>
            </div>
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
