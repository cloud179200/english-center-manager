import React from "react";
import { Redirect } from "react-router";
import ForgotComponent from "../features/auth/component/Forgot";
import SignInComponent from "../features/auth/component/SignIn";
import SignUpComponent from "../features/auth/component/SignUp";
import VerifyEmailComponent from "../features/auth/component/VerifyEmail";
import ClassComponent from "../features/class/component/Class";
import DashBoard from "../features/dashboard/component/DashBoard";

export const PRIVATE_ROUTE = [
  {
    path: "/dashboard",
    exact: true,
    component: <DashBoard />,
  },
  {
    path: "/class",
    exact: true,
    component: <ClassComponent />,
  },
  {
    path: "/student",
    exact: true,
    component: <DashBoard />,
  },
  {
    path: "/teacher",
    exact: true,
    component: <DashBoard />,
  },
  {
    path: "/user/settings",
    exact: true,
    component: <div>Settings</div>,
  },
];
export const AUTH_ROUTE = [
  {
    path: "/",
    exact: true,
    component: <Redirect to={"/signin"} />,
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
    path: "/verify-email",
    exact: true,
    component: <VerifyEmailComponent />,
  },
  {
    path: "/forgot",
    exact: true,
    component: <ForgotComponent />,
  },
];
