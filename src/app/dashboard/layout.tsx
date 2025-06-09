import { MainLayout } from "@/components/layout/MainLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ORIGIN | HOMECARE - Dashboard",
  description: "ORIGIN | HOMECARE - Dashboard",
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MainLayout>{children}</MainLayout>;
}
