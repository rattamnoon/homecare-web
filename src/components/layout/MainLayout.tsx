import { themeConfig } from "@/theme/themeConfig";
import { ConfigProvider, Layout } from "antd";
import { PropsWithChildren } from "react";
import { TopNavBar } from "./TopNavBar";

export const withTheme = (node: React.ReactNode) => (
  <ConfigProvider theme={themeConfig}>{node}</ConfigProvider>
);

export const MainLayout = ({ children }: PropsWithChildren) => {
  return withTheme(
    <Layout className="App" style={{ minHeight: "100vh" }}>
      <TopNavBar />
      {children}
    </Layout>
  );
};
