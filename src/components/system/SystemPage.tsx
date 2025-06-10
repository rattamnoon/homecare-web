"use client";

import { LayoutWithBreadcrumb } from "@/components/common/LayoutWithBreadcrumb";
import { Result } from "antd";

export const SystemPage = () => {
  return (
    <LayoutWithBreadcrumb>
      <Result status="403" title="403" subTitle="Forbidden" />
    </LayoutWithBreadcrumb>
  );
};
