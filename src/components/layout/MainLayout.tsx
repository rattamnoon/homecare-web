import { themeConfig } from "@/theme/themeConfig";
import { ConfigProvider, Layout } from "antd";
import { Locale } from "antd/es/locale";
import thTH from "antd/es/locale/th_TH";
import { PropsWithChildren } from "react";
import { TopNavBar } from "./TopNavBar";

const locale: Locale = {
  ...thTH,
  Calendar: {
    ...thTH.Calendar,
  },
};

export const withTheme = (node: React.ReactNode) => (
  <ConfigProvider theme={themeConfig} locale={locale}>
    {node}
  </ConfigProvider>
);

export const MainLayout = ({ children }: PropsWithChildren) => {
  return withTheme(
    <Layout className="App" style={{ minHeight: "100vh" }}>
      <TopNavBar />
      {children}
    </Layout>
  );
};
