import { Routes } from "@/config/routes";
import { redirect } from "next/navigation";

export const SystemPage = () => {
  redirect(Routes.SystemMaster);
};
