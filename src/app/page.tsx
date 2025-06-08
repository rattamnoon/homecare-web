import { Routes } from "@/constant/routes";
import { redirect } from "next/navigation";

export default async function Home() {
  redirect(Routes.Tasks);
}
