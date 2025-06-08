import { getSession } from "@/auth";
import { ApolloClientProvider } from "@/components/ApolloClientProvider";
import { NextAuthProvider } from "@/components/NextAuthProvider";
import theme, { notoSansThai } from "@/theme/themeConfig";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

export const metadata: Metadata = {
  title: "ORIGIN | HOMECARE",
  description: "ORIGIN | HOMECARE - บริการดูแลสุขภาพที่ดีที่สุด",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  if (session?.error === "RefreshAccessTokenError") {
    redirect("/login");
  }

  return (
    <html lang="en">
      <body className={`${notoSansThai.className}`}>
        <NextTopLoader color="#EA7F2F" showSpinner={false} />
        <AntdRegistry>
          <NextAuthProvider session={session}>
            <ApolloClientProvider>
              <ConfigProvider theme={theme}>{children}</ConfigProvider>
            </ApolloClientProvider>
          </NextAuthProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
