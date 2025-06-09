import { Routes } from "@/config/routes";
import { redirect } from "next/navigation";

export default async function Home() {
  redirect(Routes.Home);
}
