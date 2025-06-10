"use client";

import { Layout, theme } from "antd";
import { BreadcrumbItem, CustomBreadcrumb } from "./CustomBreadcrumb";

const { Content } = Layout;

const getPadding = (withBreadcrumb: boolean, fullWidth: boolean) => {
  if (fullWidth) {
    return "0";
  }
  if (withBreadcrumb) {
    return "0 24px 24px";
  }
  return "24px";
};

export const LayoutWithBreadcrumb = ({
  children,
  withBreadcrumb = true,
  breadcrumb,
  fullWidth = false,
}: {
  children: React.ReactNode;
  withBreadcrumb?: boolean;
  fullWidth?: boolean;
  breadcrumb?: BreadcrumbItem[];
}) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const padding = getPadding(withBreadcrumb, fullWidth);

  return (
    <Layout style={{ padding }}>
      {withBreadcrumb && <CustomBreadcrumb breadcrumb={breadcrumb} />}
      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        {children}
      </Content>
    </Layout>
  );
};
