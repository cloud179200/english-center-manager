import React from "react";
import { Redirect } from "react-router-dom";
import ForgotComponent from "../features/auth/components/Forgot";
import SignInComponent from "../features/auth/components/SignIn";
import SignUpComponent from "../features/auth/components/SignUp";
import VerifyEmailComponent from "../features/auth/components/VerifyEmail";
import ClassComponent from "../features/class/components/Class";
import DashBoard from "../features/dashboard/components/DashBoard";
import LandingComponent from "../features/landing/component/Landing";
import LandingManageComponent from "../features/landing/component/LandingManage";
import Settings from "../features/settings/components/Settings";
import StudentComponent from "../features/student/components/Student";
import TeacherComponent from "../features/teacher/components/Teacher";
import TransactionComponent from "../features/transaction/components/Transaction";

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
    component: <TransactionComponent />,
  },
  { path: "/landing/manage", exact: true, component: <LandingManageComponent /> },
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
    component: <TransactionComponent />,
  },

  {
    path: "/settings",
    exact: true,
    component: <Settings />,
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

export const PUBLIC_ROUTE = [
  {
    path: "/",
    exact: true,
    component: <Redirect to={"/welcome"} />,
  },
  {
    path: "/welcome",
    exact: true,
    component: <LandingComponent />,
  },
];
