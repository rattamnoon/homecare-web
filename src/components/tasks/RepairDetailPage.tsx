"use client";

import { LayoutWithBreadcrumb } from "@/components/layout/LayoutWithBreadcrumb";
import { TaskStatus, UploadFileType } from "@/gql/generated/graphql";
import {
  TaskDetailFragment,
  TaskStatusFragment,
  useTaskQuery,
} from "@/gql/generated/tasks.generated";
import {
  faClock,
  faEdit,
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
  Result,
  Skeleton,
  Space,
  Tag,
  Typography,
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
  const [priorityDialogOpen, setPriorityDialogOpen] = useState(false);
  const [priorityDialogTaskDetail, setPriorityDialogTaskDetail] =
    useState<TaskDetailFragment | null>(null);
  const [assignedDialogOpen, setAssignedDialogOpen] = useState(false);
  const [assignedDialogTaskDetail, setAssignedDialogTaskDetail] =
    useState<TaskDetailFragment | null>(null);
  const [editAssignDialogOpen, setEditAssignDialogOpen] = useState(false);
  const [editAssignDialogTaskDetail, setEditAssignDialogTaskDetail] =
    useState<TaskDetailFragment | null>(null);
  const [misscallDialogOpen, setMisscallDialogOpen] = useState(false);
  const [misscallDialogTaskDetail, setMisscallDialogTaskDetail] =
    useState<TaskDetailFragment | null>(null);
  const [waitingConstructionDialogOpen, setWaitingConstructionDialogOpen] =
    useState(false);
  const [
    waitingConstructionDialogTaskDetail,
    setWaitingConstructionDialogTaskDetail,
  ] = useState<TaskDetailFragment | null>(null);
  const [logsDialogOpen, setLogsDialogOpen] = useState(false);
  const [logsDialogTaskDetail, setLogsDialogTaskDetail] =
    useState<TaskDetailFragment | null>(null);
  const [evaluationDialogOpen, setEvaluationDialogOpen] = useState(false);
  const [evaluationDialogTaskDetail, setEvaluationDialogTaskDetail] =
    useState<TaskDetailFragment | null>(null);

  const { data, loading, error } = useTaskQuery({
    variables: { id: taskId },
    skip: !taskId,
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
      onOk: () => {
        console.log("finish");
      },
    });
  };

  const handleDisabled = (status?: TaskStatusFragment | null) => {
    // if (!status) return true;
    // return (
    //   status?.id === TaskStatus.Finished || status?.id === TaskStatus.Closed
    // );
    return false;
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
          <Skeleton loading={loading} active paragraph={{ rows: 6 }}>
            <Title level={5}>รายละเอียดงานแจ้งซ่อม</Title>
            <Descriptions size="small">
              <Descriptions.Item label="รหัสงาน" span={3}>
                {task?.code}
              </Descriptions.Item>
              <Descriptions.Item label="โครงการ">
                {task?.project?.nameTh}
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
                              setEvaluationDialogTaskDetail(detail);
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
                        {detail.finishDate ? (
                          `${dayjs(detail.finishDate).format(
                            "DD/MM/YYYY"
                          )} ${dayjs(detail.finishDate).format("HH:mm")} น.`
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
                              setMisscallDialogTaskDetail(detail);
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
                              setWaitingConstructionDialogTaskDetail(detail);
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
                              setLogsDialogTaskDetail(detail);
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
                            color="blue"
                            icon={<FontAwesomeIcon icon={faPlus} />}
                            onClick={() => {
                              setAssignedDialogTaskDetail(detail);
                              setAssignedDialogOpen(true);
                            }}
                            disabled={handleDisabled(detail.status)}
                          >
                            จ่ายงาน
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
                              setPriorityDialogTaskDetail(detail);
                              setPriorityDialogOpen(true);
                            }}
                            disabled={handleDisabled(detail.status)}
                          >
                            Piority
                          </Button>
                          <Button
                            variant="solid"
                            color="orange"
                            icon={<FontAwesomeIcon icon={faEdit} />}
                            disabled={
                              detail.assigns?.length === 0 ||
                              handleDisabled(detail.status)
                            }
                            onClick={() => {
                              setEditAssignDialogTaskDetail(detail);
                              setEditAssignDialogOpen(true);
                            }}
                          >
                            แก้ไขข้อมูล
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
                          {detail.assigns?.[0]?.requestDate && (
                            <>
                              {dayjs(detail.assigns?.[0]?.requestDate).format(
                                "DD/MM/YYYY"
                              )}{" "}
                              {detail.assigns?.[0]?.requestRangeTime?.nameTh}
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
      {priorityDialogOpen && (
        <RepairPriorityDialog
          open={priorityDialogOpen}
          onCancel={() => setPriorityDialogOpen(false)}
          taskDetail={priorityDialogTaskDetail}
        />
      )}
      {assignedDialogOpen && (
        <RepairAssignedDialog
          open={assignedDialogOpen}
          onCancel={() => setAssignedDialogOpen(false)}
          taskDetail={assignedDialogTaskDetail}
        />
      )}
      {misscallDialogOpen && (
        <RepairMisscallDialog
          open={misscallDialogOpen}
          onCancel={() => setMisscallDialogOpen(false)}
          taskDetail={misscallDialogTaskDetail}
        />
      )}
      {waitingConstructionDialogOpen && (
        <RepairWaitingConstructionDialog
          open={waitingConstructionDialogOpen}
          onCancel={() => setWaitingConstructionDialogOpen(false)}
          taskDetail={waitingConstructionDialogTaskDetail}
        />
      )}
      {logsDialogOpen && (
        <RepairLogsDialog
          open={logsDialogOpen}
          onCancel={() => setLogsDialogOpen(false)}
          taskDetail={logsDialogTaskDetail}
        />
      )}
      {evaluationDialogOpen && (
        <RepairEvaluationDialog
          open={evaluationDialogOpen}
          onCancel={() => setEvaluationDialogOpen(false)}
          taskDetail={evaluationDialogTaskDetail}
        />
      )}
    </LayoutWithBreadcrumb>
  );
};
