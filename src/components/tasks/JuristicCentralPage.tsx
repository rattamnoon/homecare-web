"use client";

import { LayoutWithBreadcrumb } from "@/components/layout/LayoutWithBreadcrumb";
import { Routes } from "@/config/routes";
import { TaskStatus, TaskType } from "@/gql/generated/graphql";
import { useTasksQuery } from "@/gql/generated/tasks.generated";
import { getTablePaginationProps } from "@/utils/utils";
import { Col, Row, Table, Tag, theme } from "antd";
import { useRouter } from "nextjs-toploader/app";
import { useMemo } from "react";
import { SearchFilter, useSearchFilter } from "../common/SearchFilter";

export const JuristicCentralPage = () => {
  const router = useRouter();
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const {
    searchText,
    statuses,
    projectId,
    unitIds,
    sources,
    checkInDate,
    createdAt,
    currentPage,
    pageSize,
    handleSearch,
  } = useSearchFilter("TasksJuristicCentral");

  const variables = useMemo(() => {
    return {
      type: TaskType.Central,
      page: currentPage,
      limit: pageSize,
      searchText,
      statuses: statuses as TaskStatus[],
      projectId,
      unitIds,
      sources: sources as string[],
      checkInDate: checkInDate as string[],
      createdAt: createdAt as string[],
    };
  }, [
    currentPage,
    pageSize,
    projectId,
    unitIds,
    searchText,
    statuses,
    sources,
    checkInDate,
    createdAt,
  ]);

  const { data, loading } = useTasksQuery({
    variables,
  });

  const tasks = useMemo(() => data?.tasks, [data]);
  const dataSource = useMemo(() => tasks?.items, [tasks]);
  const meta = useMemo(() => tasks?.meta, [tasks]);

  return (
    <LayoutWithBreadcrumb>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <SearchFilter
            route="TasksJuristicCentral"
            isSearchText
            isCreateButton
            onCreateButtonClick={() => {
              router.push(Routes.TasksJuristicCentralCreate);
            }}
            isStatus
            isProject
            isCreatedAt
          />
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
              onChange: (page, pageSize) => {
                handleSearch([
                  { key: "currentPage", value: page },
                  { key: "pageSize", value: pageSize },
                ]);
              },
              showQuickJumper: true,
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "30", "40", "50"],
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
                title: "สถานะ",
                dataIndex: "status",
                key: "status",
                align: "center",
                width: 100,
                render: (_, record) => {
                  return record.status ? (
                    <Tag color={record.status.color}>
                      {record.status.nameEn}
                    </Tag>
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
                title: "บริเวณ",
                dataIndex: "area",
                key: "area",
                align: "center",
                width: 200,
                render: (_, record) => {
                  return record.area ? `${record.area.nameEn}` : "-";
                },
                onCell: () => ({
                  style: {
                    textAlign: "left",
                  },
                }),
              },
              {
                title: "ตึก",
                dataIndex: "building",
                key: "building",
                align: "center",
                width: 200,
                render: (_, record) => {
                  return record.building ? `${record.building.nameEn}` : "-";
                },
                onCell: () => ({
                  style: {
                    textAlign: "left",
                  },
                }),
              },
              {
                title: "ชั้น",
                dataIndex: "floor",
                key: "floor",
                align: "center",
                width: 200,
                render: (_, record) => {
                  return record.floor ? `${record.floor.nameEn}` : "-";
                },
                onCell: () => ({
                  style: {
                    textAlign: "left",
                  },
                }),
              },
            ]}
          />
        </Col>
      </Row>
    </LayoutWithBreadcrumb>
  );
};
