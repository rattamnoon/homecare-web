"use client";

import { useCreateCallingMutation } from "@/gql/generated/callings.generated";
import { useCreateCsatMutation } from "@/gql/generated/csat.generated";
import {
  TaskStatus,
  TaskType,
  UpdateTaskDetailInput,
} from "@/gql/generated/graphql";
import {
  TaskDetailFragment,
  TaskDetailsDocument,
  useTaskDetailsQuery,
  useUpdateTaskDetailMutation,
} from "@/gql/generated/tasks.generated";
import { getTablePaginationProps } from "@/utils/utils";
import {
  faClose,
  faContactBook,
  faEllipsis,
  faHistory,
  faPhoneArrowUp,
  faRotateLeft,
  faStar,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Col,
  Dropdown,
  notification,
  Row,
  Table,
  Tag,
  theme,
  Tooltip,
} from "antd";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { LayoutWithBreadcrumb } from "../layout/LayoutWithBreadcrumb";
import {
  RepairCallCenterCallingDialog,
  RepairCallCenterCallingHistoryDialog,
} from "./components/RepairCallCenterCallingDialog";
import {
  RepairCallCenterFilter,
  useRepairCallCenterFilter,
} from "./components/RepairCallCenterFilter";
import { RepairClosedDialog } from "./components/RepairClosedDialog";
import { RepairEvaluationDialog } from "./components/RepairEvaluationDialog";

export const RepairCallCenter = () => {
  const [notificationApi, notificationContextHolder] =
    notification.useNotification();
  const [evaluationDialogOpen, setEvaluationDialogOpen] = useState(false);
  const [closedDialogOpen, setClosedDialogOpen] = useState(false);
  const [callCenterCallingDialogOpen, setCallCenterCallingDialogOpen] =
    useState(false);
  const [
    callCenterCallingHistoryDialogOpen,
    setCallCenterCallingHistoryDialogOpen,
  ] = useState(false);
  const [taskDetail, setTaskDetail] = useState<TaskDetailFragment | null>(null);

  const {
    searchText,
    projectId,
    unitIds,
    finishedDate,
    currentPage,
    pageSize,
    handleSearch,
    isCall,
  } = useRepairCallCenterFilter();
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const variables = useMemo(() => {
    return {
      type: TaskType.Repair,
      statuses: [TaskStatus.Finished],
      isCsat: false,
      page: currentPage,
      limit: pageSize,
      searchText,
      projectId,
      unitIds,
      finishedDate: finishedDate.map((date) =>
        dayjs(date, "YYYY-MM-DD").toDate()
      ),
      isCall: isCall === "all" ? undefined : isCall === "has" ? true : false,
    };
  }, [
    currentPage,
    finishedDate,
    isCall,
    pageSize,
    projectId,
    searchText,
    unitIds,
  ]);

  const { data, loading } = useTaskDetailsQuery({
    variables,
    fetchPolicy: "cache-and-network",
  });

  const tasksDetails = useMemo(() => data?.taskDetails, [data]);
  const dataSource = useMemo(() => tasksDetails?.items, [tasksDetails]);
  const meta = useMemo(() => tasksDetails?.meta, [tasksDetails]);

  const [updateTaskDetail, { loading: updateTaskDetailLoading }] =
    useUpdateTaskDetailMutation({
      onCompleted: () => {
        notificationApi.success({
          message: "สำเร็จ !!",
          description: "บันทึกข้อมูลเรียบร้อย",
          duration: 3,
        });
        setClosedDialogOpen(false);
        setTaskDetail(null);
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
          query: TaskDetailsDocument,
          variables,
        },
      ],
    });

  const [createCsat, { loading: createCsatLoading }] = useCreateCsatMutation({
    onCompleted: () => {
      notificationApi.success({
        message: "สำเร็จ !!",
        description: "บันทึกข้อมูลเรียบร้อย",
        duration: 3,
      });
      setTaskDetail(null);
      setEvaluationDialogOpen(false);
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
        query: TaskDetailsDocument,
        variables,
      },
    ],
  });

  const [createCalling, { loading: createCallingLoading }] =
    useCreateCallingMutation({
      onCompleted: () => {
        notificationApi.success({
          message: "สำเร็จ !!",
          description: "บันทึกข้อมูลเรียบร้อย",
          duration: 3,
        });
        setTaskDetail(null);
        setCallCenterCallingDialogOpen(false);
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
          query: TaskDetailsDocument,
          variables,
        },
      ],
    });

  return (
    <LayoutWithBreadcrumb>
      {notificationContextHolder}
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <RepairCallCenterFilter />
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
                handleSearch("currentPage", page);
              },
              showQuickJumper: true,
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "30", "40", "50"],
              onShowSizeChange: (page, size) => {
                handleSearch("pageSize", size);
              },
            }}
            columns={[
              {
                title: "Action",
                dataIndex: "action",
                key: "action",
                align: "center",
                width: 100,
                fixed: "left",
                render: (_, record) => {
                  return (
                    <Tooltip title="จัดการงาน">
                      <Dropdown
                        trigger={["click"]}
                        menu={{
                          items: [
                            {
                              label: "ประเมิน",
                              key: "evaluate",
                              icon: <FontAwesomeIcon icon={faStar} />,
                              onClick: () => {
                                setTaskDetail(record);
                                setEvaluationDialogOpen(true);
                              },
                            },
                            {
                              label: "ปิดเศส",
                              key: "close",
                              icon: <FontAwesomeIcon icon={faClose} />,
                              onClick: () => {
                                setTaskDetail(record);
                                setClosedDialogOpen(true);
                              },
                            },
                            {
                              label: "ติดต่อลูกบ้าน",
                              key: "contact",
                              icon: <FontAwesomeIcon icon={faContactBook} />,
                              children: [
                                {
                                  label: "โทรติดต่อ",
                                  key: "call",
                                  icon: (
                                    <FontAwesomeIcon icon={faPhoneArrowUp} />
                                  ),
                                  onClick: () => {
                                    setTaskDetail(record);
                                    setCallCenterCallingDialogOpen(true);
                                  },
                                },
                                {
                                  label: "ประวัติการโทร",
                                  key: "call-history",
                                  icon: <FontAwesomeIcon icon={faHistory} />,
                                  onClick: () => {
                                    setTaskDetail(record);
                                    setCallCenterCallingHistoryDialogOpen(true);
                                  },
                                },
                              ],
                            },
                            {
                              label: "Re-inprogress",
                              key: "re-inprogress",
                              icon: <FontAwesomeIcon icon={faRotateLeft} />,
                            },
                          ],
                        }}
                      >
                        <Button
                          type="link"
                          size="small"
                          icon={<FontAwesomeIcon icon={faEllipsis} />}
                        />
                      </Dropdown>
                    </Tooltip>
                  );
                },
              },
              {
                title: "รหัสงาน",
                dataIndex: "code",
                key: "code",
                align: "center",
                width: 200,
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
                title: "โทรครั้งที่",
                dataIndex: "callCount",
                key: "callCount",
                align: "center",
                width: 100,
                render: (_, record) => {
                  return record.callings?.length || 0;
                },
                onCell: () => ({
                  style: {
                    textAlign: "center",
                  },
                }),
              },
              {
                title: "โครงการ",
                dataIndex: "projectName",
                key: "projectName",
                align: "center",
                width: 300,
                render: (_, record) => {
                  return record.task.project
                    ? `${record.task.project.id} - ${record.task.project.nameTh}`
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
                dataIndex: "unitNumber",
                key: "unitNumber",
                align: "center",
                width: 200,
                render: (_, record) => {
                  return record.task.unit
                    ? `${record.task.unit.unitNumber} (${record.task.unit.houseNumber})`
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
                render: (_, record) => {
                  return record.task.customerName;
                },
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
                width: 150,
                render: (_, record) => {
                  return record.task.customerPhone;
                },
                onCell: () => ({
                  style: {
                    textAlign: "center",
                  },
                }),
              },
              {
                title: "วันที่เสร็จงาน",
                dataIndex: "finishedDate",
                key: "finishedDate",
                align: "center",
                width: 150,
                render: (_, record) => {
                  return record.finishedDate
                    ? dayjs(record.finishedDate).format("DD/MM/YYYY")
                    : "-";
                },
                onCell: () => ({
                  style: {
                    textAlign: "center",
                  },
                }),
              },
              {
                title: "วันที่นัดตรวจสอบ",
                dataIndex: "checkInDate",
                key: "checkInDate",
                align: "center",
                width: 150,
                render: (_, record) => {
                  return record.task.checkInDate
                    ? dayjs(record.task.checkInDate).format("DD/MM/YYYY")
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
                  return record.task.checkInRangeTime
                    ? record.task.checkInRangeTime.nameTh
                    : "-";
                },
              },
              {
                title: "วันที่สร้าง",
                dataIndex: "createdAt",
                key: "createdAt",
                align: "center",
                width: 150,
                render: (_, record) => {
                  return record.createdAt
                    ? dayjs(record.createdAt).format("DD/MM/YYYY")
                    : "-";
                },
                onCell: () => ({
                  style: {
                    textAlign: "center",
                  },
                }),
              },
              {
                title: "วันที่อัพเดตล่าสุด",
                dataIndex: "updatedAt",
                key: "updatedAt",
                align: "center",
                width: 150,
                render: (_, record) => {
                  return record.updatedAt
                    ? dayjs(record.updatedAt).format("DD/MM/YYYY")
                    : "-";
                },
                onCell: () => ({
                  style: {
                    textAlign: "center",
                  },
                }),
              },
            ]}
          />
        </Col>
      </Row>
      <RepairEvaluationDialog
        open={evaluationDialogOpen}
        onCancel={() => {
          setTaskDetail(null);
          setEvaluationDialogOpen(false);
        }}
        taskDetail={taskDetail}
        onSubmit={async (values) => {
          await createCsat({
            variables: {
              taskDetailId: taskDetail?.id ?? "",
              csatComment: values.CSATComment,
              createCsatInput: values.evaluation.map((item) => ({
                taskId: taskDetail?.taskId ?? "",
                taskDetailId: taskDetail?.id ?? "",
                questionId: item.questionId,
                score: item.score,
                comment: values.CSATComment,
              })),
            },
          });
        }}
        confirmLoading={createCsatLoading}
      />
      <RepairClosedDialog
        open={closedDialogOpen}
        onCancel={() => {
          setTaskDetail(null);
          setClosedDialogOpen(false);
        }}
        taskDetail={taskDetail}
        onSubmit={async (values) => {
          const updateTaskDetailInput: UpdateTaskDetailInput = {
            id: taskDetail?.id ?? "",
            status: TaskStatus.Closed,
            priority: taskDetail?.priority?.id ?? 0,
            homecareRemark: values.remark,
          };

          await updateTaskDetail({
            variables: { updateTaskDetailInput },
          });
        }}
        confirmLoading={updateTaskDetailLoading}
      />
      <RepairCallCenterCallingDialog
        open={callCenterCallingDialogOpen}
        onCancel={() => {
          setTaskDetail(null);
          setCallCenterCallingDialogOpen(false);
        }}
        onSubmit={async (values) => {
          await createCalling({
            variables: {
              createCallingInput: {
                taskDetailId: taskDetail?.id ?? "",
                callDate: values.callDate,
                callComment: values.callComment,
              },
            },
          });
        }}
        taskDetail={taskDetail}
        confirmLoading={createCallingLoading}
      />
      <RepairCallCenterCallingHistoryDialog
        open={callCenterCallingHistoryDialogOpen}
        onCancel={() => {
          setTaskDetail(null);
          setCallCenterCallingHistoryDialogOpen(false);
        }}
        taskDetail={taskDetail}
      />
    </LayoutWithBreadcrumb>
  );
};
