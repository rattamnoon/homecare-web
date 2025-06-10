"use client";

import { LayoutWithBreadcrumb } from "@/components/common/LayoutWithBreadcrumb";
import { TaskType } from "@/gql/generated/graphql";
import { useTasksQuery } from "@/gql/generated/tasks.generated";
import { getTablePaginationProps } from "@/utils/utils";
import { Table, Tag, theme } from "antd";
import dayjs from "dayjs";
import { useMemo, useState } from "react";

export const JuristicServicePage = () => {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const { data, loading } = useTasksQuery({
    variables: {
      type: TaskType.Service,
      page: currentPage,
      limit: pageSize,
    },
  });

  const tasks = useMemo(() => data?.tasks, [data]);
  const dataSource = useMemo(() => tasks?.items, [tasks]);
  const meta = useMemo(() => tasks?.meta, [tasks]);

  return (
    <LayoutWithBreadcrumb>
      <Table
        rowKey="id"
        loading={loading}
        dataSource={dataSource}
        scroll={{ x: "max-content" }}
        pagination={{
          position: ["bottomCenter"],
          ...getTablePaginationProps(meta),
          onChange: (page) => {
            setCurrentPage(page);
          },
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "30", "40", "50"],
          onShowSizeChange: (page, size) => {
            setPageSize(size);
          },
        }}
        onRow={() => ({
          style: {
            cursor: "pointer",
          },
        })}
        columns={[
          {
            title: "รหัสงาน",
            dataIndex: "code",
            key: "code",
            align: "center",
            width: 100,
            onCell: () => ({
              style: {
                cursor: "pointer",
                textAlign: "center",
                fontWeight: "bold",
                color: colorPrimary,
              },
            }),
          },
          {
            title: "โครงการ",
            dataIndex: "project",
            key: "project",
            align: "center",
            width: 300,
            render: (_, record) => {
              return record.project
                ? `${record.project.id} - ${record.project.nameTh}`
                : "-";
            },
            onCell: () => ({
              style: {
                textAlign: "left",
              },
            }),
          },
          {
            title: "ห้อง (เลขที่ห้อง)",
            dataIndex: "unit",
            key: "unit",
            align: "center",
            width: 200,
            render: (_, record) => {
              return record.unit
                ? `${record.unit.unitNumber} (${record.unit.houseNumber})`
                : "-";
            },
            onCell: () => ({
              style: {
                textAlign: "left",
              },
            }),
          },
          {
            title: "สถานะ",
            dataIndex: "status",
            key: "status",
            align: "center",
            width: 100,
            render: (_, record) => {
              return record.status ? (
                <Tag color={record.status.color}>{record.status.nameEn}</Tag>
              ) : (
                "-"
              );
            },
          },
          {
            title: "ผู้แจ้งซ่อม",
            dataIndex: "customerName",
            key: "customerName",
            align: "center",
            width: 200,
            onCell: () => ({
              style: {
                textAlign: "left",
              },
            }),
          },
          {
            title: "เบอร์โทรผู้แจ้งซ่อม",
            dataIndex: "customerPhone",
            key: "customerPhone",
            align: "center",
            width: 150,
          },
          {
            title: "วันหมดประกัน",
            dataIndex: "insuranceDate",
            key: "insuranceDate",
            align: "center",
            width: 150,
            render: (_, record) => {
              return record.insuranceDate
                ? dayjs(record.insuranceDate).format("DD/MM/YYYY")
                : "-";
            },
            onCell: (record) => ({
              style: {
                color: dayjs(record.insuranceDate).isBefore(dayjs())
                  ? "red"
                  : "green",
                fontWeight: "bold",
                textDecoration: dayjs(record.insuranceDate).isBefore(dayjs())
                  ? "line-through"
                  : "none",
              },
            }),
          },
          {
            title: "วันที่โอนกรรมสิทธิ์",
            dataIndex: "transferDate",
            key: "transferDate",
            align: "center",
            width: 150,
            render: (_, record) => {
              return record.transferDate
                ? dayjs(record.transferDate).format("DD/MM/YYYY")
                : "-";
            },
          },
          {
            title: "วันที่แจ้งซ่อม",
            dataIndex: "createdAt",
            key: "createdAt",
            align: "center",
            width: 150,
            render: (_, record) => {
              return record.createdAt
                ? dayjs(record.createdAt).format("DD/MM/YYYY")
                : "-";
            },
          },
        ]}
      />
    </LayoutWithBreadcrumb>
  );
};
