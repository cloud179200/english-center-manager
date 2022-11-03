import React from "react";
import { Redirect } from "react-router";
import SignInComponent from "../features/auth/component/SignIn";
import SignUpComponent from "../features/auth/component/SignUp";
import DashBoard from "../features/dashboard/component/DashBoard";

export const PRIVATE_ROUTE = [
  {
    path: "/dashboard",
    exact: true,
    component: <DashBoard />,
  },
  {
    path: "/user/settings",
    exact: true,
    component: <div>Settings</div>,
  }
];
export const AUTH_ROUTE = [
  {
    path: "/",
    exact: true,
    component: <Redirect to={"/signin"}/>,
  },
  {
    path: "/signin",
    exact: true,
    component: <SignInComponent />,
  },
  {
    path: "/signup",
    exact: true,
    component: <SignUpComponent />,
  },
  {
    path: "/forgot",
    exact: true,
    component: <div>forgot</div>,
  },
];