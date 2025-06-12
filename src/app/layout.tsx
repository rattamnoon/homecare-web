import { getSession } from "@/auth";
import { ApolloClientProvider } from "@/components/ApolloClientProvider";
import { NextAuthProvider } from "@/components/NextAuthProvider";
import { notoSansThai } from "@/config/fonts";
import { Routes } from "@/config/routes";
import { siteConfig } from "@/config/site";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

config.autoAddCss = false;

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  if (session?.error === "RefreshAccessTokenError") {
    redirect(Routes.Login);
  }

  return (
    <html lang="en">
      <body className={`${notoSansThai.className}`}>
        <NextTopLoader color="#EA7F2F" showSpinner={false} />
        <AntdRegistry>
          <NextAuthProvider session={session}>
            <ApolloClientProvider>{children}</ApolloClientProvider>
          </NextAuthProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
