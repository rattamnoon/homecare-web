import { MainLayout } from "@/components/layout/MainLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ORIGIN | HOMECARE - จัดการผู้ใช้งาน",
  description: "ORIGIN | HOMECARE - จัดการผู้ใช้งาน",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MainLayout>{children}</MainLayout>;
}
