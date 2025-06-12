"use client";

import { faArrowLeftLong } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Layout, Space, theme, Typography } from "antd";
import { useRouter } from "nextjs-toploader/app";
import { CSSProperties } from "react";
import { BreadcrumbItem, CustomBreadcrumb } from "../common/CustomBreadcrumb";

const { Content } = Layout;
const { Text } = Typography;

interface LayoutWithBreadcrumbProps {
  children: React.ReactNode;
  withBreadcrumb?: boolean;
  fullWidth?: boolean;
  breadcrumb?: BreadcrumbItem[];
  showBackButton?: boolean;
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
  showBackButton = false,
}: LayoutWithBreadcrumbProps) => {
  const router = useRouter();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const padding = calculatePadding({ withBreadcrumb, fullWidth });
  const contentStyle = createContentStyle(colorBgContainer, borderRadiusLG);

  return (
    <Layout style={{ padding }}>
      {withBreadcrumb && <CustomBreadcrumb breadcrumb={breadcrumb} />}

      <Content style={contentStyle}>
        {showBackButton && (
          <Space align="baseline" size={16} style={{ marginBottom: 16 }}>
            <FontAwesomeIcon
              icon={faArrowLeftLong}
              onClick={() => router.back()}
              style={{ cursor: "pointer" }}
              size="lg"
            />
            <Text strong>{breadcrumb?.[breadcrumb.length - 1]?.title}</Text>
          </Space>
        )}
        {children}
      </Content>
    </Layout>
  );
};
