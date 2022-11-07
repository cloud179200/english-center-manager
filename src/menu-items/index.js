import * as icons from "@tabler/icons";

const listMenuItems = {
  id: "dashboard",
  title: "",
  type: "group",
  children: [
    {
      id: "default",
      title: "Dashboard",
      type: "item",
      url: "/dashboard",
      icon: icons.IconDashboard,
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
      id: "default",
      title: "Trang chủ",
      type: "item",
      url: "/dashboard",
      icon: icons.IconDashboard,
      breadcrumbs: false,
    },
    {
      id: "class",
      title: "Lớp",
      type: "item",
      url: "/class",
      icon: icons.IconChalkboard,
      breadcrumbs: false,
    },
    {
      id: "teacher",
      title: "Giảng viên",
      type: "item",
      url: "/teacher",
      icon: icons.IconUser,
      breadcrumbs: false,
    },
    {
      id: "student",
      title: "Học viên",
      type: "item",
      url: "/student",
      icon: icons.IconUser,
      breadcrumbs: false,
    },
  ],
};

export const menuItemsAdmin = {
  items: [listMenuItemsAdmin],
};
