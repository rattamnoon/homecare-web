import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const route: { [key: string]: string } = {
  "/home": "หน้าหลัก",
  "/tasks": "จัดการงาน",
  "/tasks/repair": "งานแจ้งซ่อม",
  "/tasks/repair/create": "เพิ่มงานแจ้งซ่อม",
  "/tasks/repair/calendar": "ปฏิทินงานแจ้งซ่อม",
  "/tasks/repair/call-center": "Call Center",
  "/tasks/repair/pending": "รายการงานรอดำเนินการ",
  "/tasks/repair/waiting-approval": "รายการงานรออนุมัติ",
  "/tasks/juristic/service": "Service",
  "/tasks/juristic/service/create": "เพิ่มงานแจ้งซ่อม",
  "/tasks/juristic/central": "ส่วนกลาง",
  "/tasks/juristic/central/create": "เพิ่มงานแจ้งซ่อม",
  "/dashboard": "Dashboard",
  "/admin": "จัดการผู้ใช้งาน",
  "/admin/user": "ผู้ใช้งาน",
  "/admin/role": "สิทธิ์การใช้งาน",
  "/system": "ตั้งค่า",
};

export type BreadcrumbItem = {
  title: string | React.ReactNode;
  href?: string;
};

type BreadcrumbProps = {
  breadcrumb?: BreadcrumbItem[];
};

export const CustomBreadcrumb = ({ breadcrumb }: BreadcrumbProps) => {
  const pathname = usePathname();

  const routes = useMemo(() => {
    const history = pathname
      .split("/")
      .slice(1)
      .reduce((results: string[], path) => {
        const href =
          results.length === 0
            ? `/${path}`
            : `${results[results.length - 1]}/${path}`;

        return [...results, href];
      }, [])
      .filter((path) => route[path]);

    return history.map((href) => ({
      title: route[href],
      href,
    }));
  }, [pathname]);

  const items = [
    {
      title: (
        <>
          <HomeOutlined /> {route["/home"]}
        </>
      ),
      href: "/",
    },
    ...routes,
    ...(breadcrumb ? breadcrumb : []),
  ];

  const breadcrumbItems = items.map((item, index) => ({
    ...item,
    href: index === items.length - 1 ? undefined : item.href,
  }));

  return <Breadcrumb style={{ margin: "16px 0" }} items={breadcrumbItems} />;
};
