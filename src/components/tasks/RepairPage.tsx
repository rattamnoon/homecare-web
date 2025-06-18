"use client";

import {
  SearchFilter,
  useSearchFilter,
} from "@/components/common/SearchFilter";
import { LayoutWithBreadcrumb } from "@/components/layout/LayoutWithBreadcrumb";
import { RepairInsuranceExpandDialog } from "@/components/tasks/components/RepairInsuranceExpandDialog";
import { Routes } from "@/config/routes";
import { TaskStatus, TaskType } from "@/gql/generated/graphql";
import {
  TaskFragment,
  TasksDocument,
  useTasksQuery,
  useUpdateTaskMutation,
} from "@/gql/generated/tasks.generated";
import { getTablePaginationProps } from "@/utils/utils";
import {
  faClockRotateLeft,
  faEllipsisVertical,
  faGear,
  faHouseCircleCheck,
  faHouseCircleXmark,
  faXmark,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Col,
  Dropdown,
  Modal,
  notification,
  Row,
  Space,
  Table,
  Tag,
  theme,
} from "antd";
import dayjs from "dayjs";
import { useRouter } from "nextjs-toploader/app";
import { useMemo, useState } from "react";

export const RepairPage = () => {
  const [notificationApi, notificationContextHolder] =
    notification.useNotification();
  const [modalApi, modalContextHolder] = Modal.useModal();
  const router = useRouter();
  const [openInsuranceExpandDialog, setOpenInsuranceExpandDialog] =
    useState(false);
  const [task, setTask] = useState<TaskFragment | null>(null);

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
  } = useSearchFilter("TasksRepair");
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const variables = useMemo(() => {
    return {
      type: TaskType.Repair,
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

  const [updateTask, { loading: updateTaskLoading }] = useUpdateTaskMutation({
    onCompleted: () => {
      notificationApi.success({
        message: "สำเร็จ !!",
        description: "บันทึกข้อมูลเรียบร้อย",
        duration: 3,
      });
      setOpenInsuranceExpandDialog(false);
    },
    onError: (error) => {
      notificationApi.error({
        message: "เกิดข้อผิดพลาด !!",
        description: error.message,
        duration: 5,
      });
    },
    refetchQueries: [
      {
        query: TasksDocument,
        variables,
      },
    ],
  });

  const tasks = useMemo(() => data?.tasks, [data]);
  const dataSource = useMemo(() => tasks?.items, [tasks]);
  const meta = useMemo(() => tasks?.meta, [tasks]);

  return (
    <>
      {notificationContextHolder}
      {modalContextHolder}
      <LayoutWithBreadcrumb>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <SearchFilter
              route="TasksRepair"
              isSearchText
              isCreateButton
              isStatus
              isProject
              isUnit
              isSource
              isCheckInDate
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
              // onRow={(record) => ({
              //   style: {
              //     cursor: "pointer",
              //   },
              //   onClick: () => {
              //     router.push(Routes.TasksRepairDetail(record.id));
              //   },
              // })}
              columns={[
                {
                  dataIndex: "action",
                  key: "action",
                  align: "center",
                  width: 60,
                  fixed: "left",
                  render: (_, record) => {
                    return (
                      <Dropdown
                        menu={{
                          items: [
                            {
                              label: "จัดการงาน",
                              key: "manage",
                              icon: <FontAwesomeIcon icon={faGear} />,
                              onClick: () => {
                                router.push(
                                  Routes.TasksRepairDetail(record.id)
                                );
                              },
                            },
                            {
                              label: "ขยายประกัน",
                              key: "extend",
                              icon: (
                                <FontAwesomeIcon icon={faClockRotateLeft} />
                              ),
                              onClick: () => {
                                setOpenInsuranceExpandDialog(true);
                                setTask(record);
                              },
                            },
                            {
                              label: "ปิดงาน",
                              key: "close",
                              icon: <FontAwesomeIcon icon={faXmark} />,
                            },
                          ],
                        }}
                      >
                        <Button
                          type="link"
                          size="small"
                          icon={<FontAwesomeIcon icon={faEllipsisVertical} />}
                        />
                      </Dropdown>
                    );
                  },
                },
                {
                  title: "รหัสงาน",
                  dataIndex: "code",
                  key: "code",
                  align: "center",
                  width: 150,
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
                      <Tag color={record.status.color}>
                        {record.status.nameEn}
                      </Tag>
                    ) : (
                      "-"
                    );
                  },
                },
                {
                  title: "ชื่อลูกค้า",
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
                  title: "เบอร์โทรลูกค้า",
                  dataIndex: "customerPhone",
                  key: "customerPhone",
                  align: "center",
                  width: 120,
                },
                {
                  title: "ช่องทาง",
                  dataIndex: "source",
                  key: "source",
                  align: "center",
                  width: 100,
                  render: (_, record) => {
                    return record.source ? (
                      <Tag
                        {...(record.source.color
                          ? { color: record.source.color }
                          : {})}
                      >
                        {record.source.nameTh}
                      </Tag>
                    ) : (
                      "-"
                    );
                  },
                },
                {
                  title: "วันที่นัดตรวจสอบ",
                  dataIndex: "checkInDate",
                  key: "checkInDate",
                  align: "center",
                  width: 150,
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
                  width: 150,
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
                  width: 150,
                  render: (_, record) => {
                    const isBefore = dayjs(record.insuranceDate).isBefore(
                      dayjs(record.createdAt)
                    );
                    return (
                      <Space>
                        <FontAwesomeIcon
                          icon={
                            isBefore ? faHouseCircleXmark : faHouseCircleCheck
                          }
                        />
                        {record.insuranceDate
                          ? dayjs(record.insuranceDate).format("DD/MM/YYYY")
                          : "-"}
                      </Space>
                    );
                  },
                  onCell: (record) => ({
                    style: {
                      color: dayjs(record.insuranceDate).isBefore(
                        dayjs(record.createdAt)
                      )
                        ? "red"
                        : "green",
                      fontWeight: "bold",
                      textDecoration: dayjs(record.insuranceDate).isBefore(
                        dayjs(record.createdAt)
                      )
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
                  title: "จำนวนงานแจ้งซ่อม",
                  dataIndex: "details",
                  key: "details",
                  align: "center",
                  width: 150,
                  render: (_, record) => {
                    return record.details?.length ?? 0;
                  },
                },
              ]}
            />
          </Col>
        </Row>
        <RepairInsuranceExpandDialog
          open={openInsuranceExpandDialog}
          onCancel={() => setOpenInsuranceExpandDialog(false)}
          confirmLoading={updateTaskLoading}
          task={task}
          onSubmit={async (values) => {
            if (!task) return;
            await modalApi.confirm({
              title: "ยืนยันการขยายประกัน",
              content: "ยืนยันการขยายประกันห้องนี้หรือไม่",
              okText: "ยืนยัน",
              cancelText: "ยกเลิก",
              onOk: async () => {
                await updateTask({
                  variables: {
                    updateTaskInput: {
                      id: task.id,
                      status: task.status?.id,
                      insuranceDate: values.insuranceDate,
                    },
                  },
                });
              },
            });
          }}
        />
      </LayoutWithBreadcrumb>
    </>
  );
};
