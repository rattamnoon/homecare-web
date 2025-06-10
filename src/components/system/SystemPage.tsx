"use client";

import { LayoutWithBreadcrumb } from "@/components/common/LayoutWithBreadcrumb";
import { MasterType } from "@/gql/generated/graphql";
import { useMastersQuery } from "@/gql/generated/master.generated";
import { Table } from "antd";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export const SystemPage = () => {
  const searchParams = useSearchParams();
  const type = (searchParams.get("type") as MasterType) || MasterType.Sla;
  const { data, loading } = useMastersQuery({
    variables: {
      types: [type],
    },
  });

  const dataSource = useMemo(() => data?.masters, [data]);

  return (
    <LayoutWithBreadcrumb>
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
