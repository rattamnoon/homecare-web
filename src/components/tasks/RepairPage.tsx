"use client";

import { TaskStatus } from "@/gql/generated/graphql";
import { useTasksQuery } from "@/gql/generated/tasks.generated";
import { getTablePaginationProps } from "@/utils/utils";
import { Col, Row, Table, Tag } from "antd";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { RepairFilter, useRepairFilter } from "./components/RepairFilter";

export const RepairPage = () => {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { searchText, statuses, projectIds } = useRepairFilter();
  const { data, loading } = useTasksQuery({
    variables: {
      page: currentPage,
      limit: pageSize,
      searchText,
      statuses: statuses as TaskStatus[],
      projectIds,
    },
  });

  const tasks = useMemo(() => data?.tasks, [data]);
  const dataSource = useMemo(() => tasks?.items, [tasks]);
  const meta = useMemo(() => tasks?.meta, [tasks]);

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <RepairFilter />
      </Col>
      <Col span={24}>
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
          columns={[
            {
              title: "สถานะ",
              dataIndex: "status",
              key: "status",
              align: "center",
              render: (_, record) => {
                return record.status ? (
                  <Tag color={record.status.color} bordered={false}>
                    {record.status.nameEn}
                  </Tag>
                ) : (
                  "-"
                );
              },
            },
            {
              title: "รหัสงาน",
              dataIndex: "code",
              key: "code",
              align: "center",
              onCell: () => ({
                style: {
                  cursor: "pointer",
                  textAlign: "center",
                },
              }),
            },
            {
              title: "ชื่อลูกค้า",
              dataIndex: "customerName",
              key: "customerName",
              align: "center",
              onCell: () => ({
                style: {
                  textAlign: "left",
                },
              }),
            },
            {
              title: "เบอร์โทรลูกค้า",
              dataIndex: "customerPhone",
              key: "customerPhone",
              align: "center",
              onCell: () => ({
                style: {
                  textAlign: "left",
                },
              }),
            },
            {
              title: "วันที่นัดตรวจสอบ",
              dataIndex: "checkInDate",
              key: "checkInDate",
              align: "center",
              render: (_, record) => {
                return record.checkInDate
                  ? dayjs(record.checkInDate).format("DD/MM/YYYY")
                  : "-";
              },
            },
            {
              title: "ช่วงเวลานัดตรวจสอบ",
              dataIndex: "checkInRangeTime",
              key: "checkInRangeTime",
              align: "center",
              render: (_, record) => {
                return record.checkInRangeTime
                  ? record.checkInRangeTime.nameTh
                  : "-";
              },
            },
            {
              title: "วันหมดประกัน",
              dataIndex: "insuranceDate",
              key: "insuranceDate",
              align: "center",
              render: (_, record) => {
                return record.insuranceDate
                  ? dayjs(record.insuranceDate).format("DD/MM/YYYY")
                  : "-";
              },
            },
          ]}
        />
      </Col>
    </Row>
  );
};
