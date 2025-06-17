"use client";

import { LayoutWithBreadcrumb } from "@/components/layout/LayoutWithBreadcrumb";
import { Routes } from "@/config/routes";
import { Button, Result } from "antd";
import { useRouter } from "nextjs-toploader/app";

export const RepairWaitingApprovalPage = () => {
  const router = useRouter();

  return (
    <LayoutWithBreadcrumb showBackButton backButtonText="รายการงานรออนุมัติ">
      <Result
        status="403"
        title="403"
        subTitle="ขออภัย หน้านี้ยังไม่พร้อมใช้งาน"
        extra={
          <Button type="primary" onClick={() => router.push(Routes.Home)}>
            กลับหน้าหลัก
          </Button>
        }
      />
    </LayoutWithBreadcrumb>
  );
};
