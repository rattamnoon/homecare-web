"use client";

import { LayoutWithBreadcrumb } from "@/components/layout/LayoutWithBreadcrumb";
import { useCreateCsatMutation } from "@/gql/generated/csat.generated";
import {
  CreateTaskDetailReportLogInput,
  CreateUploadFileInput,
  TaskStatus,
  UpdateTaskDetailInput,
  UploadFileType,
} from "@/gql/generated/graphql";
import {
  TaskDetailFragment,
  TaskDocument,
  TaskStatusFragment,
  useCreateTaskDetailReportLogMutation,
  useTaskQuery,
  useUpdateTaskDetailMutation,
} from "@/gql/generated/tasks.generated";
import {
  faClock,
  faFaceSmile,
  faHouseCircleCheck,
  faListDots,
  faPersonCircleCheck,
  faPlus,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Collapse,
  Descriptions,
  Divider,
  Flex,
  Modal,
  notification,
  Result,
  Skeleton,
  Space,
  Tag,
  Typography,
  UploadFile,
} from "antd";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { RepairApprovePlan } from "./components/RepairApprovePlan";
import { RepairAssignedDialog } from "./components/RepairAssignedDialog";
import { RepairEvaluationDialog } from "./components/RepairEvaluationDialog";
import { RepairImagePreview } from "./components/RepairImagePreview";
import { RepairLogsDialog } from "./components/RepairLogsDialog";
import { RepairMisscallDialog } from "./components/RepairMisscallDialog";
import { RepairPriorityDialog } from "./components/RepairPriorityDialog";
import { RepairSOPImagePreview } from "./components/RepairSOPImagePreview";
import { RepairWaitingConstructionDialog } from "./components/RepairWaitingConstructionDialog";

const { Title, Text } = Typography;

const DividerWithIcon = ({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <Divider plain orientation="left">
      <Space>
        {icon} {children}
      </Space>
    </Divider>
  );
};

export const RepairDetailPage = () => {
  const params = useParams();
  const taskId = params.id as string;
  const [modalApi, modalContextHolder] = Modal.useModal();
  const [notificationApi, notificationContextHolder] =
    notification.useNotification();
  const [priorityDialogOpen, setPriorityDialogOpen] = useState(false);
  const [assignedDialogOpen, setAssignedDialogOpen] = useState(false);
  const [misscallDialogOpen, setMisscallDialogOpen] = useState(false);
  const [waitingConstructionDialogOpen, setWaitingConstructionDialogOpen] =
    useState(false);
  const [logsDialogOpen, setLogsDialogOpen] = useState(false);
  const [evaluationDialogOpen, setEvaluationDialogOpen] = useState(false);
  const [taskDetail, setTaskDetail] = useState<TaskDetailFragment | null>(null);

  const { data, loading, error } = useTaskQuery({
    variables: { id: taskId },
    skip: !taskId,
    fetchPolicy: "cache-and-network",
  });

  const [updateTaskDetail, { loading: updateTaskDetailLoading }] =
    useUpdateTaskDetailMutation({
      onCompleted: () => {
        notificationApi.success({
          message: "สำเร็จ !!",
          description: "บันทึกข้อมูลเรียบร้อย",
          duration: 3,
        });
        setTaskDetail(null);
        setAssignedDialogOpen(false);
        setPriorityDialogOpen(false);
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
          query: TaskDocument,
          variables: { id: taskId },
        },
      ],
    });

  const [
    createTaskDetailReportLog,
    { loading: createTaskDetailReportLogLoading },
  ] = useCreateTaskDetailReportLogMutation({
    onCompleted: () => {
      notificationApi.success({
        message: "สำเร็จ !!",
        description: "บันทึกข้อมูลเรียบร้อย",
        duration: 3,
      });
      setTaskDetail(null);
      setWaitingConstructionDialogOpen(false);
      setMisscallDialogOpen(false);
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
        query: TaskDocument,
        variables: { id: taskId },
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
        query: TaskDocument,
        variables: { id: taskDetail?.taskId },
      },
    ],
  });

  const task = useMemo(() => data?.task, [data]);
  const taskDetails = useMemo(() => task?.details || [], [task]);

  const handleFinishTaskDetail = async (detail: TaskDetailFragment) => {
    await modalApi.confirm({
      title: "คุณต้องการจบงานหรือไม่",
      content:
        "งานจะถูกจบงานอัตโนมัติ หากต้องการจบงานเอง กรุณากดปุ่มจบงานด้านล่าง",
      okText: "ตกลง",
      cancelText: "ยกเลิก",
      onOk: async () => {
        await updateTaskDetail({
          variables: {
            updateTaskDetailInput: {
              id: detail.id,
              priority: detail.priority?.id,
              status: TaskStatus.Finished,
              homecareStatus: TaskStatus.Finished,
              finishedDate: dayjs().toDate(),
            },
          },
        });
      },
    });
  };

  const handleDisabled = (status?: TaskStatusFragment | null) => {
    if (!status) return true;
    return (
      status?.id === TaskStatus.Finished || status?.id === TaskStatus.Closed
    );
  };

  const handleHide = (detail: TaskDetailFragment) => {
    return false;
  };

  const handleShowApprovePlan = (detail: TaskDetailFragment) => {
    if (!detail.status) return false;
    return [TaskStatus.HomecareFinished, TaskStatus.Hold].includes(
      detail.status?.id
    );
  };

  const handleSubmitMisscallOrWaitingConstruction = async (values: {
    type: TaskStatus;
    callbackDate: Date;
    checkInDate: Date;
    checkInRangeTime: string;
    remark: string;
    images: UploadFile[];
  }) => {
    const createTaskDetailReportLogInput: CreateTaskDetailReportLogInput = {
      taskDetailId: taskDetail?.id,
      callbackDate: values.callbackDate
        ? dayjs(values.callbackDate).startOf("day").toDate()
        : undefined,
      checkInDate: values.checkInDate
        ? dayjs(values.checkInDate).startOf("day").toDate()
        : undefined,
      checkInRangeTime: values.checkInRangeTime,
      remark: values.remark,
      type: values.type,
    };

    let createUploadFileInput: CreateUploadFileInput[] = [];

    if (values?.images?.length > 0) {
      createUploadFileInput = values.images.map((image: UploadFile) => ({
        fileType: UploadFileType.Other,
        fileId: image.response?.fileId,
        fileName: image.response?.fileName,
        fileFolder: image.response?.fileFolder,
        filePath: image.response?.filePath,
        fileBucket: image.response?.fileBucket,
        fileExtension: image.response?.fileExtension,
      }));
    }

    await createTaskDetailReportLog({
      variables: {
        createTaskDetailReportLogInput,
        createUploadFileInput,
      },
    });
  };

  return (
    <LayoutWithBreadcrumb
      showBackButton
      breadcrumb={[
        {
          title: loading ? (
            <Skeleton.Input size="small" active />
          ) : (
            task?.code ?? ""
          ),
        },
      ]}
    >
      {error ? (
        <Result
          status="error"
          title="เกิดข้อผิดพลาด"
          subTitle={error.message}
        />
      ) : (
        <>
          {modalContextHolder}
          {notificationContextHolder}
          <Skeleton loading={loading} active paragraph={{ rows: 6 }}>
            <Title level={5}>รายละเอียดงานแจ้งซ่อม</Title>
            <Descriptions size="small">
              <Descriptions.Item label="รหัสงาน" span={3}>
                {task?.code}
              </Descriptions.Item>
              <Descriptions.Item label="โครงการ">
                {task?.project
                  ? `${task?.project.id} - ${task?.project.nameTh}`
                  : "-"}
              </Descriptions.Item>
              <Descriptions.Item label="ห้อง (เลขที่ห้อง)" span={3}>
                {task?.unit?.unitNumber}
              </Descriptions.Item>
              <Descriptions.Item label="สถานะ" span={3}>
                <Tag color={task?.status?.color}>{task?.status?.nameEn}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="ชื่อลูกค้า">
                {task?.customerName}
              </Descriptions.Item>
              <Descriptions.Item label="เบอร์โทรลูกค้า">
                {task?.customerPhone}
              </Descriptions.Item>
              <Descriptions.Item label="ช่องทาง" span={3}>
                <Tag
                  {...(task?.source?.color
                    ? { color: task?.source?.color }
                    : {})}
                >
                  {task?.source?.nameTh}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="วันที่นัดตรวจสอบ">
                {dayjs(task?.checkInDate).format("DD/MM/YYYY")}
              </Descriptions.Item>
              <Descriptions.Item label="ช่วงเวลานัดตรวจสอบ" span={3}>
                {task?.checkInRangeTime?.nameTh}
              </Descriptions.Item>
              <Descriptions.Item
                label="วันหมดประกัน"
                styles={{
                  content: {
                    color: dayjs(task?.insuranceDate).isBefore(
                      dayjs(task?.createdAt)
                    )
                      ? "red"
                      : "green",
                    fontWeight: "bold",
                    textDecoration: dayjs(task?.insuranceDate).isBefore(
                      dayjs(task?.createdAt)
                    )
                      ? "line-through"
                      : "none",
                  },
                }}
              >
                {dayjs(task?.insuranceDate).format("DD/MM/YYYY")}
              </Descriptions.Item>
              <Descriptions.Item label="วันที่โอนกรรมสิทธิ์" span={3}>
                {dayjs(task?.transferDate).format("DD/MM/YYYY")}
              </Descriptions.Item>
              <Descriptions.Item label="วันที่สร้าง">
                {dayjs(task?.createdAt).format("DD/MM/YYYY HH:mm")}
              </Descriptions.Item>
              <Descriptions.Item label="วันที่อัพเดต">
                {dayjs(task?.updatedAt).format("DD/MM/YYYY HH:mm")}
              </Descriptions.Item>
            </Descriptions>
          </Skeleton>
          <Divider />
          <Title level={5}>รายการงานแจ้งซ่อม</Title>
          <Skeleton loading={loading} active paragraph={{ rows: 6 }}>
            <Collapse
              accordion
              ghost
              items={taskDetails.map((detail) => ({
                key: detail.id,
                label: (
                  <Flex justify="space-between" gap={8}>
                    <Text strong>{detail.code}</Text>
                    <Space size={4}>
                      <Space>
                        <Text type="secondary">Priority : </Text>
                        <Tag color={detail.priority?.color}>
                          {detail.priority?.nameTh}
                        </Tag>
                      </Space>
                      <Space>
                        <Text type="secondary">สถานะเคส : </Text>
                        <Tag color={detail.status?.color}>
                          {detail.status?.nameEn}
                        </Tag>
                      </Space>
                      <Space>
                        <Text type="secondary">สถานะผู้รับผิดชอบ : </Text>
                        <Tag color={detail.homecareStatus?.color}>
                          {detail.homecareStatus?.nameEn}
                        </Tag>
                      </Space>
                    </Space>
                  </Flex>
                ),
                children: (
                  <Flex vertical gap={8}>
                    <Descriptions size="small" bordered>
                      <Descriptions.Item label="ประเภทหลัก">
                        {detail.category?.nameTh}
                      </Descriptions.Item>
                      <Descriptions.Item label="ประเภทย่อย">
                        {detail.subCategory?.nameTh}
                      </Descriptions.Item>
                      <Descriptions.Item label="สถานะประเมิน">
                        {detail.isCSAT ? (
                          <Tag color="green">ประเมินแล้ว</Tag>
                        ) : (
                          <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            onClick={() => {
                              setTaskDetail(detail);
                              setEvaluationDialogOpen(true);
                            }}
                          >
                            ยังไม่ได้ประเมิน
                          </Button>
                        )}
                      </Descriptions.Item>
                      <Descriptions.Item label="รูปภาพ" span={3}>
                        <RepairImagePreview
                          images={detail.images.filter(
                            (image) =>
                              image.fileType === UploadFileType.Customer
                          )}
                        />
                      </Descriptions.Item>
                      <Descriptions.Item label="รายละเอียด">
                        {detail.description}
                      </Descriptions.Item>
                    </Descriptions>
                    <DividerWithIcon
                      icon={<FontAwesomeIcon icon={faPersonCircleCheck} />}
                    >
                      ตรวจสอบหน้างาน
                    </DividerWithIcon>
                    <Descriptions size="small" bordered>
                      <Descriptions.Item label="ผู้รับผิดชอบ" span={3}>
                        {detail.homecare?.firstName} {detail.homecare?.lastName}
                      </Descriptions.Item>
                      <Descriptions.Item label="วันและเวลาที่เข้าตรวจสอบ">
                        {dayjs(detail.homecareInDate).format("DD/MM/YYYY")}{" "}
                        {detail.homecareInRangeTime?.nameTh}
                      </Descriptions.Item>
                      <Descriptions.Item label="วันที่และเวลาเข้าแก้ไขงาน">
                        {detail.assigns?.[0]?.createdAt ? (
                          `${dayjs(detail.assigns?.[0]?.createdAt).format(
                            "DD/MM/YYYY"
                          )} ${dayjs(detail.assigns?.[0]?.createdAt).format(
                            "HH:mm"
                          )} น.`
                        ) : (
                          <Tag color="default" bordered={false}>
                            ยังไม่ได้เข้าแก้ไขงาน
                          </Tag>
                        )}
                      </Descriptions.Item>
                      <Descriptions.Item label="วันที่และเวลาจบงาน">
                        {detail.finishedDate ? (
                          `${dayjs(detail.finishedDate).format(
                            "DD/MM/YYYY"
                          )} ${dayjs(detail.finishedDate).format("HH:mm")} น.`
                        ) : (
                          <Tag color="default" bordered={false}>
                            ยังไม่ได้จบงาน
                          </Tag>
                        )}
                      </Descriptions.Item>
                      <Descriptions.Item label="รูปภาพ" span={3}>
                        <RepairImagePreview
                          images={detail.images.filter(
                            (image) => image.fileType === UploadFileType.Task
                          )}
                        />
                      </Descriptions.Item>
                      <Descriptions.Item label="หมายเหตุ" span={3}>
                        {detail.homecareRemark}
                      </Descriptions.Item>
                      <Descriptions.Item label="เหตุผล" span={3}>
                        <Space.Compact>
                          <Button
                            size="small"
                            variant="outlined"
                            color="primary"
                            onClick={() => {
                              setTaskDetail(detail);
                              setMisscallDialogOpen(true);
                            }}
                            disabled={handleDisabled(detail.status)}
                          >
                            ติดต่อลูกค้าไม่ได้
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            color="primary"
                            onClick={() => {
                              setTaskDetail(detail);
                              setWaitingConstructionDialogOpen(true);
                            }}
                            disabled={handleDisabled(detail.status)}
                          >
                            ของไม่ครบ
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            color="primary"
                            onClick={() => {
                              setTaskDetail(detail);
                              setLogsDialogOpen(true);
                            }}
                          >
                            Logs
                          </Button>
                        </Space.Compact>
                      </Descriptions.Item>
                    </Descriptions>
                    {handleShowApprovePlan(detail) && (
                      <Flex vertical gap={8}>
                        <DividerWithIcon
                          icon={<FontAwesomeIcon icon={faClock} />}
                        >
                          รายการรออนุมัติงาน
                        </DividerWithIcon>
                        <RepairApprovePlan taskDetail={detail} />
                      </Flex>
                    )}
                    <DividerWithIcon
                      icon={<FontAwesomeIcon icon={faListDots} />}
                    >
                      รายการจ่ายงาน
                    </DividerWithIcon>
                    <Flex vertical gap={8}>
                      <Flex justify="space-between" gap={8}>
                        <Space>
                          <Button
                            variant="solid"
                            color={detail.slaId ? "orange" : "blue"}
                            icon={<FontAwesomeIcon icon={faPlus} />}
                            onClick={() => {
                              setTaskDetail(detail);
                              setAssignedDialogOpen(true);
                            }}
                            disabled={handleDisabled(detail.status)}
                          >
                            {detail.slaId ? "แก้ไขข้อมูลจ่ายงาน" : "จ่ายงาน"}
                          </Button>
                          <Button
                            variant="solid"
                            color="green"
                            icon={<FontAwesomeIcon icon={faHouseCircleCheck} />}
                            onClick={() => handleFinishTaskDetail(detail)}
                            disabled={handleDisabled(detail.status)}
                          >
                            Finish
                          </Button>
                          <Button
                            variant="solid"
                            color="cyan"
                            icon={<FontAwesomeIcon icon={faFaceSmile} />}
                            onClick={() => {
                              setTaskDetail(detail);
                              setPriorityDialogOpen(true);
                            }}
                            disabled={handleDisabled(detail.status)}
                          >
                            Piority
                          </Button>
                        </Space>
                      </Flex>
                      <Descriptions size="small" bordered>
                        <Descriptions.Item label="ประเภทหลัก">
                          {detail.sla?.parent?.nameTh}
                        </Descriptions.Item>
                        <Descriptions.Item label="ประเภทย่อย">
                          {detail.sla?.nameTh}
                        </Descriptions.Item>
                        <Descriptions.Item label="SLA">
                          {detail.sla?.SLA1H} ชั่วโมง หรือ {detail.sla?.SLA1D}{" "}
                          วัน
                        </Descriptions.Item>
                        <Descriptions.Item label="ผู้รับผิดชอบ" span={3}>
                          {detail.homecare?.firstName}{" "}
                          {detail.homecare?.lastName}
                        </Descriptions.Item>
                        <Descriptions.Item label="ผู้รับเหมา" span={3}>
                          {detail.contractor?.nameTh ? (
                            detail.contractor?.nameTh
                          ) : (
                            <Text type="secondary">ยังไม่ได้ระบุ</Text>
                          )}
                        </Descriptions.Item>
                        <Descriptions.Item label="วันที่และเวลาเข้าตรวจสอบ">
                          {detail.homecareInDate ? (
                            <>
                              {dayjs(detail.homecareInDate).format(
                                "DD/MM/YYYY"
                              )}{" "}
                              {detail.homecareInRangeTime?.nameTh}
                            </>
                          ) : (
                            <Text type="secondary">ยังไม่ได้ระบุ</Text>
                          )}
                        </Descriptions.Item>
                        <Descriptions.Item
                          label="วันที่และเวลาเข้าซ่อม"
                          span={3}
                        >
                          {detail.assigns?.[0]?.requestedDate && (
                            <>
                              {dayjs(detail.assigns?.[0]?.requestedDate).format(
                                "DD/MM/YYYY"
                              )}{" "}
                              {detail.assigns?.[0]?.requestedRangeTime?.nameTh}
                            </>
                          )}
                        </Descriptions.Item>
                        <Descriptions.Item label="สถานะเคส">
                          {detail.status && (
                            <Tag color={detail.status?.color}>
                              {detail.status?.nameEn}
                            </Tag>
                          )}
                        </Descriptions.Item>
                        <Descriptions.Item label="สถานะผู้รับผิดชอบ" span={3}>
                          {detail.homecareStatus && (
                            <Tag color={detail.homecareStatus?.color}>
                              {detail.homecareStatus?.nameEn}
                            </Tag>
                          )}
                        </Descriptions.Item>
                        <Descriptions.Item label="รูปขั้นตอน SOP">
                          <RepairSOPImagePreview
                            status={detail.status}
                            images={detail.assigns?.[0]?.images}
                          />
                        </Descriptions.Item>
                      </Descriptions>
                    </Flex>
                  </Flex>
                ),
              }))}
            />
          </Skeleton>
        </>
      )}
      <RepairPriorityDialog
        open={priorityDialogOpen}
        onCancel={() => setPriorityDialogOpen(false)}
        taskDetail={taskDetail}
        onSubmit={async (values) => {
          await updateTaskDetail({
            variables: {
              updateTaskDetailInput: {
                id: taskDetail?.id ?? "",
                priority: values.priority,
              },
            },
          });
        }}
        confirmLoading={updateTaskDetailLoading}
      />
      <RepairAssignedDialog
        open={assignedDialogOpen}
        onCancel={() => setAssignedDialogOpen(false)}
        taskDetail={taskDetail}
        onSubmit={async (values) => {
          const updateTaskDetailInput: UpdateTaskDetailInput = {
            id: taskDetail?.id ?? "",
            slaId: values.slaId,
            priority: taskDetail?.priority?.id,
            status: TaskStatus.Open,
            homecareId: values.homecareId,
            homecareStatus: TaskStatus.Open,
            homecareInDate: values.homecareInDate
              ? dayjs(values.homecareInDate).startOf("day").toDate()
              : undefined,
            homecareRangeTime: values.homecareRangeTime
              ? values.homecareRangeTime
              : undefined,
          };

          await updateTaskDetail({
            variables: { updateTaskDetailInput },
          });
        }}
        confirmLoading={updateTaskDetailLoading}
      />
      <RepairMisscallDialog
        open={misscallDialogOpen}
        onCancel={() => setMisscallDialogOpen(false)}
        taskDetail={taskDetail}
        onSubmit={async (values) => {
          handleSubmitMisscallOrWaitingConstruction({
            type: TaskStatus.MissedCall,
            ...values,
          });
        }}
        confirmLoading={createTaskDetailReportLogLoading}
      />
      <RepairWaitingConstructionDialog
        open={waitingConstructionDialogOpen}
        onCancel={() => setWaitingConstructionDialogOpen(false)}
        taskDetail={taskDetail}
        onSubmit={async (values) => {
          handleSubmitMisscallOrWaitingConstruction({
            type: TaskStatus.WaitingConstruction,
            ...values,
          });
        }}
        confirmLoading={createTaskDetailReportLogLoading}
      />
      <RepairLogsDialog
        open={logsDialogOpen}
        onCancel={() => setLogsDialogOpen(false)}
        taskDetail={taskDetail}
      />
      <RepairEvaluationDialog
        open={evaluationDialogOpen}
        onCancel={() => setEvaluationDialogOpen(false)}
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
    </LayoutWithBreadcrumb>
  );
};
