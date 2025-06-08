import { MainLayout } from "@/components/layout/MainLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ORIGIN | HOMECARE - หน้าหลัก",
  description: "ORIGIN | HOMECARE - หน้าหลัก",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MainLayout>{children}</MainLayout>;
}
