import { auth } from "@/auth";
import { Routes } from "@/config/routes";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "ORIGIN | HOMECARE - เข้าสู่ระบบ",
  description: "ORIGIN | HOMECARE - เข้าสู่ระบบ",
};

export default async function LoginLayout({ children }: PropsWithChildren) {
  const session = await auth();

  if (session) {
    redirect(Routes.Home);
  }

  return children;
}
