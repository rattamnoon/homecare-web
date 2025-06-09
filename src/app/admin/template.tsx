"use client";

import { CustomBreadcrumb } from "@/components/common/CustomBreadcrumb";
import { Routes } from "@/config/routes";
import { UsergroupAddOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { usePathname } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";

const { Content, Sider } = Layout;

export default function AdminTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);

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
          defaultSelectedKeys={[pathname]}
          defaultOpenKeys={[pathname]}
          style={{ height: "100%", borderRight: 0 }}
          items={[
            {
              key: Routes.AdminUsers,
              label: "ผู้ใช้งาน",
              icon: <UserOutlined />,
              onClick: () => router.push(Routes.AdminUsers),
            },
            {
              key: Routes.AdminRoles,
              label: "สิทธิ์การใช้งาน",
              icon: <UsergroupAddOutlined />,
              onClick: () => router.push(Routes.AdminRoles),
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
