"use client";

import { Flex, Typography } from "antd";
import { LayoutWithBreadcrumb } from "../layout/LayoutWithBreadcrumb";

const { Title } = Typography;

export const RepairCallCenter = () => {
  return (
    <LayoutWithBreadcrumb>
      <Flex vertical gap={16}>
        <Title level={3}>Call Center</Title>
      </Flex>
    </LayoutWithBreadcrumb>
  );
};
