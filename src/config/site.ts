import {
  faDisplayChartUpCircleDollar,
  faGear,
  faHouse,
  faListCheck,
  faSignInAlt,
  faUsers,
} from "@fortawesome/pro-regular-svg-icons";

import { Routes } from "./routes";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "ORIGIN | HOMECARE",
  description: "บริการดูแลสุขภาพที่ดีที่สุด",
  navItems: [
    {
      label: "เข้าสู่ระบบ",
      href: Routes.Login,
      key: "/login",
      icon: faSignInAlt,
    },
  ],
  navMenuItems: [
    {
      label: "หน้าหลัก",
      href: Routes.Home,
      key: "/home",
      icon: faHouse,
    },
    {
      label: "จัดการงาน",
      href: Routes.Tasks,
      key: "/tasks",
      icon: faListCheck,
    },
    {
      label: "Dashboard",
      href: Routes.Dashboard,
      key: "/dashboard",
      icon: faDisplayChartUpCircleDollar,
    },
    {
      label: "จัดการผู้ใช้งาน",
      href: Routes.Admin,
      key: "/admin",
      icon: faUsers,
    },
    {
      label: "ตั้งค่า",
      href: Routes.System,
      key: "/system",
      icon: faGear,
    },
  ],
};
