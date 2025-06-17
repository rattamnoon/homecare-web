"use client";

import { LayoutWithBreadcrumb } from "@/components/layout/LayoutWithBreadcrumb";
import { MasterType } from "@/gql/generated/graphql";
import { useMastersQuery } from "@/gql/generated/master.generated";
import { Table } from "antd";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

const getBreadcrumb = (type: MasterType) => {
  switch (type) {
    case MasterType.Sla:
      return [{ title: "ข้อตกลงการให้บริการ (SLA)" }];
    case MasterType.Contractor:
      return [{ title: "ผู้รับเหมา" }];
    case MasterType.Central:
      return [{ title: "หมวดหมู่งานส่วนกลาง" }];
    case MasterType.Area:
      return [{ title: "แผนที่งานส่วนกลาง" }];
    case MasterType.Service:
      return [{ title: "หมวดหมู่งาน Service" }];
    case MasterType.Csat:
      return [{ title: "CSAT" }];
    case MasterType.Category:
      return [{ title: "หมวดหมู่งานแจ้งซ่อม" }];
    case MasterType.Cause:
      return [{ title: "สาเหตุ" }];
    default:
      return [];
  }
};

export const SystemMasterPage = () => {
  const searchParams = useSearchParams();
  const type = (searchParams.get("type") as MasterType) || MasterType.Sla;
  const { data, loading } = useMastersQuery({
    variables: {
      types: [type],
    },
  });

  const dataSource = useMemo(() => data?.masters, [data]);

  return (
    <LayoutWithBreadcrumb breadcrumb={getBreadcrumb(type)}>
      <Table
        rowKey="id"
        dataSource={dataSource}
        loading={loading}
        scroll={{ x: "max-content" }}
        expandable={{
          showExpandColumn: false,
        }}
        columns={[
          {
            title: "ชื่อ (ภาษาไทย)",
            dataIndex: "nameTh",
            key: "nameTh",
            render: (_, record) => {
              return record.nameTh;
            },
          },
          {
            title: "ชื่อ (ภาษาอังกฤษ)",
            dataIndex: "nameEn",
            key: "nameEn",
            render: (_, record) => {
              return record.nameEn;
            },
          },
        ]}
      />
    </LayoutWithBreadcrumb>
  );
};
