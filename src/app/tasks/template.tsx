"use client";

import { Routes } from "@/config/routes";
import {
  faBuilding,
  faScrewdriverWrench,
  faWrench,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Layout, Menu, theme } from "antd";
import { usePathname } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";

const { Sider } = Layout;

export default function TasksTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const {
    token: { colorBgContainer },
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
              key: Routes.TasksRepair,
              label: "งานแจ้งซ่อม",
              icon: <FontAwesomeIcon icon={faWrench} />,
              onClick: () => router.push(Routes.TasksRepair),
            },
            {
              key: "juristic",
              label: "นิติบุคคล",
              icon: <FontAwesomeIcon icon={faBuilding} />,
              children: [
                {
                  key: Routes.TasksJuristicService,
                  label: "Service",
                  icon: <FontAwesomeIcon icon={faScrewdriverWrench} />,
                  onClick: () => router.push(Routes.TasksJuristicService),
                },
                {
                  key: Routes.TasksJuristicCentral,
                  label: "ส่วนกลาง",
                  icon: <FontAwesomeIcon icon={faBuilding} />,
                  onClick: () => router.push(Routes.TasksJuristicCentral),
                },
              ],
            },
          ]}
        />
      </Sider>
      {children}
    </Layout>
  );
}
