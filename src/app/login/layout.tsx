import { getSession } from "@/auth";
import { Routes } from "@/constant/routes";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function LoginLayout({ children }: PropsWithChildren) {
  const session = await getSession();

  if (session) {
    redirect(Routes.Home);
  }

  return children;
}
