import { Routes } from "@/config/routes";
import { redirect } from "next/navigation";

export default function AdminPage() {
  redirect(Routes.AdminUsers);
}
