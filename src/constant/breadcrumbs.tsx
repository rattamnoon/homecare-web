import { Routes } from "./routes";

export const Breadcrumbs: {
  [key: string]: { title: string; href: string };
} = {
  Home: {
    title: "หน้าหลัก",
    href: Routes.Home,
  },
};
