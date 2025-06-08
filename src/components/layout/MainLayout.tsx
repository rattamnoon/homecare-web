import { Layout } from "antd";
import { PropsWithChildren } from "react";
import { TopNavBar } from "./TopNavBar";

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <Layout className="App" style={{ minHeight: "100vh" }}>
      <TopNavBar />
      {children}
    </Layout>
  );
};
