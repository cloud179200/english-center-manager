import React from "react";
import SignInComponent from "../features/auth/component/SignIn";
import SignUpComponent from "../features/auth/component/SignUp";
import MainLayout from "../layout/MainLayout";
import MinimalLayout from "../layout/MinimalLayout";

export const PRIVATE_ROUTE = [
  {
    path: "/dashboard",
    exact: true,
    component: <div>dashboard</div>,
  },
];
export const AUTH_ROUTE = [
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

export const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <div>chill</div>,
    },
    {
      path: "dashboard",
      element: <div>dashboard</div>,
    },
  ],
};

export const AuthenticationRoutes = {
  path: "/",
  element: <MinimalLayout />,
  children: [
    {
      path: "auth",
      children: [
        {
          path: "signin",
          element: <SignInComponent />,
        },
        {
          path: "signup",
          element: <SignUpComponent />,
        },
      ],
    },
  ],
};
