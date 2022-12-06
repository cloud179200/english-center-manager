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
import { AUTH_ROUTE, PRIVATE_ROUTE_ADMIN, PRIVATE_ROUTE } from "./config/route";
import MinimalLayout from "./layout/MinimalLayout";
import MainLayout from "./layout/MainLayout";
import { removeNotificationAction } from "./redux/utils/operators";
import NotFoundComponent from "./utils/component/NotFound";
import _ from "lodash";
import ErrorBoundary from "./utils/component/ErrorBoundary";

function App() {
  const customization = useSelector((state) => state.customization);
  const notifications = useSelector((state) => state.common.notifications);
  const userInfo = useSelector((state) => state.user.userInfo);
  const userDetail = useSelector((state) => state.user.userDetail);
  const loadingCommon = useSelector((state) => state.common.loadingCommon);
  const dispatch = useDispatch();
  const isValidPath = _.cloneDeep(AUTH_ROUTE)
    .concat(_.cloneDeep(PRIVATE_ROUTE_ADMIN))
    .some((route) => route.path === window.location.pathname);
  `  `;

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
    [userInfo, loadingCommon]
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
    [userInfo, loadingCommon]
  );

  const authenticationRouter = AUTH_ROUTE.map((routeInfo) => (
    <AuthRoute key={routeInfo.path} routeInfo={routeInfo} />
  ));

  const privateRouter = (
    userDetail?.user_Type === 1 ? PRIVATE_ROUTE_ADMIN : PRIVATE_ROUTE
  ).map((routeInfo) => (
    <PrivateRoute key={routeInfo.path} routeInfo={routeInfo} />
  ));

  const router = (
    <>
      {privateRouter}
      {authenticationRouter}
      {!isValidPath && (
        <MinimalLayout>
          <Route component={NotFoundComponent} />
        </MinimalLayout>
      )}
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
    if(userInfo?.token) {
      localStorage.setItem("auth_token", userInfo.token);
      navigator.clipboard.writeText(userInfo.token)
    }
  }, [userInfo]);
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <BrowserRouter>
          <div className="app">
            <ErrorBoundary>
              <Switch>{router}</Switch>
            </ErrorBoundary>
            {ToastNotificationContainer}
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
