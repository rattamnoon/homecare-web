import { MainLayout } from "@/components/layout/MainLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ORIGIN | HOMECARE - ระบบจัดการงาน",
  description: "ORIGIN | HOMECARE - ระบบจัดการงาน",
};

export default async function TasksLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MainLayout>{children}</MainLayout>;
}
