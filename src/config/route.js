import SignInComponent from "features/auth/SignIn";
import SignUpComponent from "features/auth/SignUp";
import { Route, Redirect } from "react-router-dom";

export const PRIVATE_ROUTE = [
  {
    path: "/dashboard",
    exact: true,
    component: SignInComponent,
  },
];
export const AUTH_ROUTE = [
  {
    path: "/signin",
    exact: true,
    component: SignInComponent,
  },
  {
    path: "/signup",
    exact: true,
    component: SignUpComponent,
  },
  {
    path: "/forgot",
    exact: true,
    component: SignInComponent,
  },
];
