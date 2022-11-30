import * as icons from "@tabler/icons";
import { NAME_TRANS_VN } from "../config/constant";

const listMenuItems = {
  id: "dashboard",
  title: "",
  type: "group",
  children: [
    {
      id: NAME_TRANS_VN.HOME,
      title: NAME_TRANS_VN.HOME,
      type: "item",
      url: "/dashboard",
      icon: icons.IconDashboard,
      breadcrumbs: false,
    },
    {
      id: NAME_TRANS_VN.CLASS,
      title: NAME_TRANS_VN.CLASS,
      type: "item",
      url: "/class",
      icon: icons.IconChalkboard,
      breadcrumbs: false,
    },
    {
      id: NAME_TRANS_VN.TRANSACTION_HISTORY,
      title: NAME_TRANS_VN.TRANSACTION_HISTORY,
      type: "item",
      url: "/transaction/history",
      icon: icons.IconHistory,
      breadcrumbs: false,
    },
  ],
};
export const menuItems = {
  items: [listMenuItems],
};

const listMenuItemsAdmin = {
  id: "dashboard",
  title: "",
  type: "group",
  children: [
    {
      id: NAME_TRANS_VN.HOME,
      title: NAME_TRANS_VN.HOME,
      type: "item",
      url: "/dashboard",
      icon: icons.IconDashboard,
      breadcrumbs: false,
    },
    {
      id: NAME_TRANS_VN.CLASS,
      title: NAME_TRANS_VN.CLASS,
      type: "item",
      url: "/class",
      icon: icons.IconChalkboard,
      breadcrumbs: false,
    },
    {
      id: NAME_TRANS_VN.TEACHER,
      title: NAME_TRANS_VN.TEACHER,
      type: "item",
      url: "/teacher",
      icon: icons.IconUser,
      breadcrumbs: false,
    },
    {
      id: NAME_TRANS_VN.STUDENT,
      title: NAME_TRANS_VN.STUDENT,
      type: "item",
      url: "/student",
      icon: icons.IconUser,
      breadcrumbs: false,
    },
    {
      id: NAME_TRANS_VN.TRANSACTION_HISTORY,
      title: NAME_TRANS_VN.TRANSACTION_HISTORY,
      type: "item",
      url: "/transaction/history",
      icon: icons.IconHistory,
      breadcrumbs: false,
    },
  ],
};

export const menuItemsAdmin = {
  items: [listMenuItemsAdmin],
};
