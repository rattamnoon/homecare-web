"use client";

import { makeClient } from "@/apolloClient";
import { Routes } from "@/constant/routes";
import { LogoutOutlined, MenuOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, MenuProps, Space, theme } from "antd";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export const TopNavBar = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { data } = useSession({
    required: true,
  });

  const email = data?.user?.email;

  const menuItems: MenuProps["items"] = [
    {
      label: email,
      key: "avatar",
      icon: (
        <Avatar
          size={16}
          icon={<UserOutlined />}
          style={{ backgroundColor: "#870E06" }}
        />
      ),
    },
    {
      label: "Logout",
      key: "2",
      icon: <LogoutOutlined />,
      onClick: async () => {
        await makeClient().clearStore();
        await signOut();
      },
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        backgroundColor: colorBgContainer,
        padding: 16,
        height: 48,
        alignItems: "center",
        boxShadow: "0px -1px 0px 0px #F0F0F0 inset",
      }}
    >
      <Link href={Routes.Home} style={{ width: "100%" }}>
        <Space align="center">
          <Image
            src="/images/origin-vertical-logo.png"
            alt="Logo"
            height={32}
            width={100}
          />
        </Space>
      </Link>

      <Space direction="horizontal" align="center">
        <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
          <Button type="text">
            <MenuOutlined />
          </Button>
        </Dropdown>
      </Space>
    </div>
  );
};
