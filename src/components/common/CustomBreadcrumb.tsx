import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const route: { [key: string]: string } = {
  "/home": "หน้าหลัก",
  "/tasks": "งานที่ต้องทำ",
  "/dashboard": "กระดานข่าว",
  "/admin": "ระบบจัดการผู้ใช้งาน",
  "/system": "ระบบจัดการระบบ",
};

type BreadcrumbItem = {
  title: string;
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
