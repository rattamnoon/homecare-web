"use client";

import { Routes } from "@/constant/routes";
import { UsergroupAddOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";
import { CustomBreadcrumb } from "../common/CustomBreadcrumb";
import { RolePage } from "./RolePage";
import { UserPage } from "./UserPage";

const { Content, Sider } = Layout;

export const AdminPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "users";
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);

  const handleMenuClick = (key: string) => {
    router.push(`${Routes.Admin}?tab=${key}`);
  };

  const renderContent = () => {
    switch (tab) {
      case "users":
        return <UserPage />;
      case "roles":
        return <RolePage />;
      default:
        return <UserPage />;
    }
  };

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsedWidth={0}
        theme="light"
        breakpoint="lg"
        width={180}
        style={{ background: colorBgContainer }}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={["users"]}
          defaultOpenKeys={["users"]}
          style={{ height: "100%", borderRight: 0 }}
          items={[
            {
              key: "users",
              label: "ผู้ใช้งาน",
              icon: <UserOutlined />,
              onClick: () => handleMenuClick("users"),
            },
            {
              key: "roles",
              label: "สิทธิ์การใช้งาน",
              icon: <UsergroupAddOutlined />,
              onClick: () => handleMenuClick("roles"),
            },
          ]}
        />
      </Sider>
      <Layout style={{ padding: "0 24px 24px" }}>
        <CustomBreadcrumb />
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};
