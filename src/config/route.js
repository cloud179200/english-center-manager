import React from "react";
import { Redirect } from "react-router";
import ForgotComponent from "../features/auth/components/Forgot";
import SignInComponent from "../features/auth/components/SignIn";
import SignUpComponent from "../features/auth/components/SignUp";
import VerifyEmailComponent from "../features/auth/components/VerifyEmail";
import ClassComponent from "../features/class/components/Class";
import DashBoard from "../features/dashboard/components/DashBoard";
import Settings from "../features/settings/components/Settings";
import StudentComponent from "../features/student/components/Student";
import TeacherComponent from "../features/teacher/components/Teacher";

export const PRIVATE_ROUTE_ADMIN = [
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
    path: "/teacher",
    exact: true,
    component: <TeacherComponent />,
  },
  {
    path: "/student",
    exact: true,
    component: <StudentComponent />,
  },
  {
    path: "/transaction/history",
    exact: true,
    component: <DashBoard />,
  },
  {
    path: "/settings",
    exact: true,
    component: <Settings />,
  },
];
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
    path: "/transaction/history",
    exact: true,
    component: <DashBoard />,
  },
  {
    path: "/settings",
    exact: true,
    component: <Settings />,
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
