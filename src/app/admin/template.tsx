"use client";

import { CustomBreadcrumb } from "@/components/common/CustomBreadcrumb";
import { AdminMenu, Routes } from "@/config/routes";
import { UsergroupAddOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { useParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";

const { Content, Sider } = Layout;

export default function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const params = useParams();
  const menu = (params.menu as AdminMenu) || AdminMenu.Users;
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);

  const handleMenuClick = (key: string) => {
    router.push(Routes.Admin(key as AdminMenu));
  };

  return (
    <Layout>
      <style jsx global>{`
        .ant-menu-light.ant-menu-root.ant-menu-vertical {
          border-inline-end: transparent;
        }
      `}</style>
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
          defaultSelectedKeys={[menu]}
          defaultOpenKeys={[menu]}
          style={{ height: "100%", borderRight: 0 }}
          items={[
            {
              key: AdminMenu.Users,
              label: "ผู้ใช้งาน",
              icon: <UserOutlined />,
              onClick: () => handleMenuClick("users"),
            },
            {
              key: AdminMenu.Roles,
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
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
