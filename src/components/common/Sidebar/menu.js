import { Home } from "react-feather";
export const menuitems = [
  {
    title: "Dashboard",
    icon: "home",
    type: "link",
    path: "/Dashboard",
    badgeType: "primary",
    active: false
  },
  {
    title: "Todo",
    icon: "home",
    type: "link",
    path: "/todo",
    badgeType: "primary",
    active: true,
    modelName: "todo",
    displayModelName: "Todo",
    alwaysShow: false
  },
  {
    title: "User",
    icon: "home",
    type: "link",
    path: "/user",
    badgeType: "primary",
    active: false,
    modelName: "user",
    displayModelName: "User",
    alwaysShow: false
  }
];
