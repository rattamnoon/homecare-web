import {
  faBell,
  faClockRotateLeft,
  faDatabase,
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
      key: "login",
      icon: faSignInAlt,
    },
  ],
  navMenuItems: [
    {
      label: "หน้าหลัก",
      href: Routes.Home,
      key: "home",
      icon: faHouse,
    },
    {
      label: "จัดการงาน",
      href: Routes.Tasks,
      key: "tasks",
      icon: faListCheck,
    },
    {
      label: "Dashboard",
      href: Routes.Dashboard,
      key: "dashboard",
      icon: faDisplayChartUpCircleDollar,
    },
    {
      label: "จัดการผู้ใช้งาน",
      href: Routes.Admin,
      key: "admin",
      icon: faUsers,
    },
    {
      label: "ตั้งค่า",
      key: "system",
      icon: faGear,
      children: [
        {
          label: "ข้อมูลพื้นฐาน",
          key: "master",
          icon: faDatabase,
          href: Routes.SystemMaster,
        },
        {
          label: "ขยายวันประกัน",
          key: "insurance-expand",
          icon: faClockRotateLeft,
          href: Routes.SystemInsuranceExpand,
        },
        {
          label: "แจ้งเตือน",
          key: "notification",
          icon: faBell,
          href: Routes.SystemNotification,
          disabled: true,
        },
      ],
    },
  ],
};
