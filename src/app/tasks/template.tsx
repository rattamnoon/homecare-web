"use client";

import { Routes } from "@/config/routes";
import {
  faBuilding,
  faCalendarDays,
  faClock,
  faClockRotateLeft,
  faList,
  faPhoneIntercom,
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

  const isJuristic = pathname.includes("/tasks/juristic");

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
          openKeys={isJuristic ? ["juristic"] : ["repair"]}
          selectedKeys={[pathname]}
          style={{ height: "100%", borderRight: 0 }}
          items={[
            {
              key: "repair",
              label: "รายการแจ้งซ่อม",
              icon: <FontAwesomeIcon icon={faList} />,
              children: [
                {
                  key: Routes.TasksRepair,
                  label: "งานแจ้งซ่อม",
                  icon: <FontAwesomeIcon icon={faWrench} />,
                  onClick: () => router.push(Routes.TasksRepair),
                },
                {
                  key: Routes.TasksRepairCalendar,
                  label: "ปฏิทิน",
                  icon: <FontAwesomeIcon icon={faCalendarDays} />,
                  onClick: () => router.push(Routes.TasksRepairCalendar),
                },
                {
                  key: Routes.TasksRepairCallCenter,
                  label: "Call Center",
                  icon: <FontAwesomeIcon icon={faPhoneIntercom} />,
                  onClick: () => router.push(Routes.TasksRepairCallCenter),
                },
                {
                  key: Routes.TasksRepairPending,
                  label: "รอดำเนินการ",
                  icon: <FontAwesomeIcon icon={faClockRotateLeft} />,
                  onClick: () => router.push(Routes.TasksRepairPending),
                },
                {
                  key: Routes.TasksRepairWaitingApproval,
                  label: "รออนุมัติ",
                  icon: <FontAwesomeIcon icon={faClock} />,
                  onClick: () => router.push(Routes.TasksRepairWaitingApproval),
                },
              ],
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
