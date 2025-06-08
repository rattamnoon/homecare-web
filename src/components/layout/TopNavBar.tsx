"use client";

import { makeClient } from "@/apolloClient";
import { Routes } from "@/constant/routes";
import {
  AppstoreOutlined,
  DashboardOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  Divider,
  Drawer,
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
import { useLocalStorage, useMediaQuery } from "usehooks-ts";

const { Header } = Layout;

const MainMenu = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await makeClient().clearStore();
    await signOut();
  };

  const menuItems: MenuProps["items"] = [
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
    ...(isMobile
      ? []
      : [
          {
            label: "ออกจากระบบ",
            key: "logout",
            icon: <LogoutOutlined />,
            onClick: handleLogout,
          },
        ]),
  ];

  return (
    <Menu
      mode={isMobile ? "vertical" : "horizontal"}
      selectedKeys={[pathname]}
      style={{
        flex: 1,
        minWidth: 0,
        width: "100%",
        border: "none",
        borderRadius: 0,
      }}
      theme="light"
      items={menuItems}
    />
  );
};

const MobileMenu = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const router = useRouter();

  return (
    <Drawer width={250} closable={false} open={open} onClose={onClose}>
      <Flex align="center" gap={16} flex={1} justify="center">
        <Image
          src="/images/origin-vertical-logo.png"
          alt="Logo"
          onClick={() => router.push(Routes.Home)}
          style={{ cursor: "pointer", objectFit: "contain" }}
          width={135}
          height={32}
          priority
        />
      </Flex>
      <Divider />
      <MainMenu />
    </Drawer>
  );
};

export const TopNavBar = () => {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useLocalStorage(
    "isMobileMenuOpen",
    false
  );

  const onClose = () => {
    setIsMobileMenuOpen(false);
  };

  const { data } = useSession({
    required: true,
  });

  const username = data?.user?.username;

  const handleLogout = async () => {
    await makeClient().clearStore();
    await signOut();
  };

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
        {!isMobile && <MainMenu />}
      </Flex>

      {!isMobile ? (
        <Space direction="horizontal" align="center">
          <Dropdown
            menu={{
              items: [
                {
                  label: "ออกจากระบบ",
                  key: "logout",
                  icon: <LogoutOutlined />,
                  onClick: handleLogout,
                },
              ],
            }}
            trigger={["click", "hover"]}
          >
            <Button variant="filled" color="primary">
              <UserOutlined /> {username}
            </Button>
          </Dropdown>
        </Space>
      ) : (
        <Button
          variant="filled"
          color="primary"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <MenuOutlined />
        </Button>
      )}

      <MobileMenu open={isMobileMenuOpen} onClose={onClose} />
    </Header>
  );
};
