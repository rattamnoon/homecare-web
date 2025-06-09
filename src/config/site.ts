import {
  faBuilding,
  faDisplayChartUpCircleDollar,
  faFileChartColumn,
  faGrid2,
  faSignInAlt,
  faUsers,
} from "@fortawesome/pro-regular-svg-icons";

import { faUser } from "@fortawesome/pro-regular-svg-icons";
import { AdminMenu, Routes } from "./routes";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "ORIGIN | HOMECARE",
  description: "บริการดูแลสุขภาพที่ดีที่สุด",
  navItems: [
    {
      label: "เข้าสู่ระบบ",
      href: Routes.Login,
      key: "login",
      icon: faSignInAlt,
    },
  ],
  navMenuItems: [
    {
      label: "หน้าหลัก",
      href: Routes.Home,
      key: "home",
      icon: faGrid2,
    },
    {
      label: "ระบบจัดการงาน",
      href: Routes.Tasks,
      key: "tasks",
      icon: faUser,
    },
    {
      label: "Dashboard",
      href: Routes.Dashboard,
      key: "dashboard",
      icon: faDisplayChartUpCircleDollar,
    },
    {
      label: "Dashboard",
      href: Routes.Dashboard,
      key: "dashboard",
      icon: faFileChartColumn,
    },
    {
      label: "จัดการระบบ",
      href: Routes.System,
      key: "system",
      icon: faBuilding,
    },
    {
      label: "ระบบจัดการผู้ใช้งาน",
      href: Routes.Admin(AdminMenu.Users),
      key: "admin",
      icon: faUsers,
    },
  ],
};
