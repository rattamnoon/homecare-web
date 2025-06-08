"use client";

import { makeClient } from "@/apolloClient";
import { Routes } from "@/constant/routes";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Button, Dropdown, Flex, Menu, MenuProps, Space, theme } from "antd";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";

const Container = styled.div<{ backgroundColor: string }>`
  display: flex;
  width: 100%;
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding: 16px;
  height: 48px;
  align-items: center;
  box-shadow: 0px -1px 0px 0px #f0f0f0 inset;
`;

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
    <Container backgroundColor={colorBgContainer}>
      <Flex align="center" gap={16} flex={1}>
        <Image
          src="/images/origin-vertical-logo.png"
          alt="Logo"
          height={32}
          width={100}
          onClick={() => router.push(Routes.Home)}
          style={{ cursor: "pointer" }}
        />
        <Menu
          mode="horizontal"
          selectedKeys={[pathname]}
          style={{ width: "100%" }}
          items={[
            {
              label: "หน้าหลัก",
              key: Routes.Home,
              onClick: () => router.push(Routes.Home),
            },
            {
              label: "ระบบจัดการงาน",
              key: Routes.Tasks,
              onClick: () => router.push(Routes.Tasks),
            },
            {
              label: "Dashboard",
              key: Routes.Dashboard,
              onClick: () => router.push(Routes.Dashboard),
            },
            {
              label: "ระบบจัดการผู้ใช้งาน",
              key: Routes.Admin,
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
    </Container>
  );
};
