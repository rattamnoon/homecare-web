"use client";

import { makeClient } from "@/apolloClient";
import { Routes } from "@/config/routes";
import { siteConfig } from "@/config/site";
import { imageBlob } from "@/utils/imageBlob";
import { LogoutOutlined, MenuOutlined, UserOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
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
  Typography,
} from "antd";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useEffect, useMemo, useState } from "react";
import { useLocalStorage, useMediaQuery } from "usehooks-ts";

const { Header } = Layout;
const { Text } = Typography;

const getImageUrl = async (employeeId: string): Promise<string> => {
  const url = `${process.env.NEXT_PUBLIC_MYORIGIN_API_URL}/static`;
  const blob = await imageBlob(`${url}/employee_mid/${employeeId}.jpg`);

  return blob;
};

export const ProfilePlaceholder = ({
  styles,
}: {
  styles?: React.CSSProperties;
}) => {
  const { data } = useSession({
    required: true,
  });
  const [avatar, setAvatar] = useState<string>("");

  useEffect(() => {
    const fetchAvatar = async () => {
      const avatarUrl = await getImageUrl(data?.user?.employeeId ?? "");
      setAvatar(avatarUrl);
    };

    fetchAvatar();
  }, [data?.user?.employeeId]);

  const { name, description } = useMemo(() => {
    if (!data?.user)
      return {
        name: "",
        description: "",
      };

    return {
      name: `${data?.user?.firstName} ${data?.user?.lastName}`,
    };
  }, [data?.user]);

  return (
    <Flex align="center" gap={8} style={styles}>
      <Avatar
        size="large"
        icon={<UserOutlined />}
        {...(avatar && { src: avatar })}
      />
      <Flex vertical>
        <Text>{name}</Text>
        <Text style={{ fontSize: 12 }} type="secondary">
          {description}
        </Text>
      </Flex>
    </Flex>
  );
};

const MainMenu = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await makeClient().clearStore();
    await signOut();
  };

  const menuItems: MenuProps["items"] = [
    ...siteConfig.navMenuItems.map((item) => ({
      ...item,
      icon: <FontAwesomeIcon icon={item.icon} />,
      key: item.key,
      onClick: () => router.push(item.href),
    })),
    ...(!isMobile
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
  return (
    <Drawer width={250} closable={false} open={open} onClose={onClose}>
      <ProfilePlaceholder />
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
            <div>
              <ProfilePlaceholder
                styles={{
                  cursor: "pointer",
                  paddingLeft: 16,
                  paddingRight: 16,
                }}
              />
            </div>
          </Dropdown>
        </Space>
      ) : (
        <Button
          variant="filled"
          color="primary"
          size="large"
          onClick={() => setIsMobileMenuOpen(true)}
          icon={<MenuOutlined />}
        />
      )}

      {isMobile && <MobileMenu open={isMobileMenuOpen} onClose={onClose} />}
    </Header>
  );
};
