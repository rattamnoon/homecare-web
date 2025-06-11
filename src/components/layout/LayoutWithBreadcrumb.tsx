"use client";

import { Layout, theme } from "antd";
import { CSSProperties } from "react";
import { BreadcrumbItem, CustomBreadcrumb } from "../common/CustomBreadcrumb";

const { Content } = Layout;

interface LayoutWithBreadcrumbProps {
  children: React.ReactNode;
  withBreadcrumb?: boolean;
  fullWidth?: boolean;
  breadcrumb?: BreadcrumbItem[];
}

interface PaddingConfig {
  withBreadcrumb: boolean;
  fullWidth: boolean;
}

const PADDING_VALUES = {
  FULL_WIDTH: "0",
  WITH_BREADCRUMB: "0 24px 24px",
  DEFAULT: "24px",
} as const;

const CONTENT_STYLES = {
  padding: 24,
  margin: 0,
  minHeight: 280,
} as const;

const calculatePadding = ({
  withBreadcrumb,
  fullWidth,
}: PaddingConfig): string => {
  if (fullWidth) return PADDING_VALUES.FULL_WIDTH;
  if (withBreadcrumb) return PADDING_VALUES.WITH_BREADCRUMB;
  return PADDING_VALUES.DEFAULT;
};

const createContentStyle = (
  colorBgContainer: string,
  borderRadiusLG: number
): CSSProperties => ({
  ...CONTENT_STYLES,
  background: colorBgContainer,
  borderRadius: borderRadiusLG,
});

export const LayoutWithBreadcrumb = ({
  children,
  withBreadcrumb = true,
  breadcrumb,
  fullWidth = false,
}: LayoutWithBreadcrumbProps) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const padding = calculatePadding({ withBreadcrumb, fullWidth });
  const contentStyle = createContentStyle(colorBgContainer, borderRadiusLG);

  return (
    <Layout style={{ padding }}>
      {withBreadcrumb && <CustomBreadcrumb breadcrumb={breadcrumb} />}
      <Content style={contentStyle}>{children}</Content>
    </Layout>
  );
};
