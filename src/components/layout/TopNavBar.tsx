"use client";

import { makeClient } from "@/apolloClient";
import { Routes } from "@/constant/routes";
import {
  AppstoreOutlined,
  DashboardOutlined,
  HomeOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  Dropdown,
  Flex,
  Layout,
  Menu,
  MenuProps,
  Space,
  theme,
} from "antd";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";

const { Header } = Layout;

export const TopNavBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { data } = useSession({
    required: true,
  });

  const username = data?.user?.username;

  const menuItems: MenuProps["items"] = [
    {
      label: "ออกจากระบบ",
      key: "logout",
      icon: <LogoutOutlined />,
      onClick: async () => {
        await makeClient().clearStore();
        await signOut();
      },
    },
  ];

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: colorBgContainer,
        paddingLeft: 16,
        paddingRight: 16,
      }}
    >
      <Flex align="center" gap={16} flex={1}>
        <Image
          src="/images/origin-vertical-logo.png"
          alt="Logo"
          onClick={() => router.push(Routes.Home)}
          style={{ cursor: "pointer", objectFit: "contain" }}
          width={135}
          height={32}
          priority
        />
        <Menu
          mode="horizontal"
          selectedKeys={[pathname]}
          style={{
            flex: 1,
            minWidth: 0,
            width: "100%",
            border: "none",
            borderRadius: 0,
          }}
          theme="light"
          items={[
            {
              label: "หน้าหลัก",
              key: Routes.Home,
              icon: <HomeOutlined />,
              onClick: () => router.push(Routes.Home),
            },
            {
              label: "ระบบจัดการงาน",
              key: Routes.Tasks,
              icon: <AppstoreOutlined />,
              onClick: () => router.push(Routes.Tasks),
            },
            {
              label: "Dashboard",
              key: Routes.Dashboard,
              icon: <DashboardOutlined />,
              onClick: () => router.push(Routes.Dashboard),
            },
            {
              label: "จัดการระบบ",
              key: Routes.System,
              icon: <SettingOutlined />,
              onClick: () => router.push(Routes.System),
            },
            {
              label: "ระบบจัดการผู้ใช้งาน",
              key: Routes.Admin,
              icon: <UserOutlined />,
              onClick: () => router.push(Routes.Admin),
            },
          ]}
        />
      </Flex>

      <Space direction="horizontal" align="center">
        <Dropdown menu={{ items: menuItems }} trigger={["click", "hover"]}>
          <Button variant="filled" color="primary">
            <UserOutlined /> {username}
          </Button>
        </Dropdown>
      </Space>
    </Header>
  );
};
