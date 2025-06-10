"use client";

import { MasterType } from "@/gql/generated/graphql";
import {
  faBuilding,
  faClock,
  faFolderOpen,
  faLocationDot,
  faSearch,
  faStar,
  faUserHardHat,
  faWrench,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Layout, Menu, theme } from "antd";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";

const { Sider } = Layout;

export default function AdminTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = (searchParams.get("type") as MasterType) || MasterType.Sla;
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);

  const handleClick = (key: string) => {
    router.push(`/system?type=${key}`);
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
          defaultSelectedKeys={[type]}
          defaultOpenKeys={[type]}
          style={{ height: "100%", borderRight: 0 }}
          items={[
            {
              key: MasterType.Sla,
              label: "ข้อตกลงการให้บริการ (SLA)",
              icon: <FontAwesomeIcon icon={faClock} />,
              onClick: () => handleClick(MasterType.Sla),
            },
            {
              key: MasterType.Contractor,
              label: "ผู้รับเหมา",
              icon: <FontAwesomeIcon icon={faUserHardHat} />,
              onClick: () => handleClick(MasterType.Contractor),
            },
            {
              key: MasterType.Central,
              label: "หมวดหมู่งานส่วนกลาง",
              icon: <FontAwesomeIcon icon={faBuilding} />,
              onClick: () => handleClick(MasterType.Central),
            },
            {
              key: MasterType.Area,
              label: "แผนที่งานส่วนกลาง",
              icon: <FontAwesomeIcon icon={faLocationDot} />,
              onClick: () => handleClick(MasterType.Area),
            },
            {
              key: MasterType.Service,
              label: "หมวดหมู่งาน Service",
              icon: <FontAwesomeIcon icon={faWrench} />,
              onClick: () => handleClick(MasterType.Service),
            },
            {
              key: MasterType.Csat,
              label: "CSAT",
              icon: <FontAwesomeIcon icon={faStar} />,
              onClick: () => handleClick(MasterType.Csat),
            },
            {
              key: MasterType.Category,
              label: "หมวดหมู่งานแจ้งซ่อม",
              icon: <FontAwesomeIcon icon={faFolderOpen} />,
              onClick: () => handleClick(MasterType.Category),
            },
            {
              key: MasterType.Cause,
              label: "สาเหตุ",
              icon: <FontAwesomeIcon icon={faSearch} />,
              onClick: () => handleClick(MasterType.Cause),
            },
          ]}
        />
      </Sider>
      {children}
    </Layout>
  );
}
