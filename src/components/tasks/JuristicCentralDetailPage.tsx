"use client";

import { LayoutWithBreadcrumb } from "@/components/layout/LayoutWithBreadcrumb";
import { CreateUploadFileInput, UploadFileType } from "@/gql/generated/graphql";
import {
  TaskDetailFragment,
  TaskDocument,
  useTaskQuery,
} from "@/gql/generated/tasks.generated";
import { useCreateUploadFileMutation } from "@/gql/generated/upload-files.generated";
import imageToken from "@/utils/imageToken";
import { UserOutlined } from "@ant-design/icons";
import {
  faEdit,
  faHistory,
  faPaperclip,
  faSave,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
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
} from "antd";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { getImageUrl } from "../layout/TopNavBar";
import { RepairImagePreview } from "./components/RepairImagePreview";
import { JuristicCentralEditDialog } from "./components/dialogs/JuristicCentralEditDialog";
import { JuristicCentralLogsDialog } from "./components/dialogs/JuristicCentralLogsDialog";
import { JuristicCentralUploadFilesDialog } from "./components/dialogs/JuristicCentralUploadFilesDialog";

const { Title, Text } = Typography;

const AvatarWithEmployeeId = ({ employeeId }: { employeeId: string }) => {
  const [avatar, setAvatar] = useState<string>("");

  useEffect(() => {
    const fetchAvatar = async () => {
      const avatarUrl = await getImageUrl(employeeId);
      setAvatar(avatarUrl);
    };

    fetchAvatar();
  }, [employeeId]);

  return (
    <Avatar
      src={avatar}
      icon={<UserOutlined />}
      onClick={() => {
        window.open(
          imageToken(
            `${process.env.NEXT_PUBLIC_MYORIGIN_API_URL}/static/employee_mid/${employeeId}.jpg`
          ),
          "_blank"
        );
      }}
      style={{ cursor: "pointer" }}
    />
  );
};

export const JuristicCentralDetailPage = () => {
  const params = useParams();
  const taskId = params.id as string;
  const [modalApi, modalContextHolder] = Modal.useModal();
  const [notificationApi, notificationContextHolder] =
    notification.useNotification();
  const [uploadFilesDialogOpen, setUploadFilesDialogOpen] = useState(false);
  const [logsDialogOpen, setLogsDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [taskDetail, setTaskDetail] = useState<TaskDetailFragment | null>(null);

  const { data, loading, error } = useTaskQuery({
    variables: { id: taskId },
    skip: !taskId,
    fetchPolicy: "cache-and-network",
  });

  const task = useMemo(() => data?.task, [data]);

  const [createUploadFile, { loading: createUploadFileLoading }] =
    useCreateUploadFileMutation({
      onCompleted: () => {
        notificationApi.success({
          message: "สำเร็จ !!",
          description: "สร้างรูปภาพสำเร็จ",
        });
        setUploadFilesDialogOpen(false);
        setTaskDetail(null);
      },
      onError: (error) => {
        notificationApi.error({
          message: "เกิดข้อผิดพลาด !!",
          description: error.message,
        });
      },
      refetchQueries: [
        {
          query: TaskDocument,
          variables: { id: taskId },
        },
      ],
    });

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
              <Descriptions.Item label="สถานะ" span={3}>
                <Tag color={task?.status?.color}>{task?.status?.nameEn}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="ผู้แจ้งซ่อม">
                {task?.customerName}
              </Descriptions.Item>
              <Descriptions.Item label="เบอร์โทรผู้แจ้งซ่อม">
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
              <Descriptions.Item label="บริเวณ">
                {task?.area?.nameEn}
              </Descriptions.Item>
              <Descriptions.Item label="ตึก">
                {task?.building?.nameEn}
              </Descriptions.Item>
              <Descriptions.Item label="ชั้น">
                {task?.floor?.nameEn}
              </Descriptions.Item>
            </Descriptions>
          </Skeleton>
          <Divider />
          <Title level={5}>รายการงานแจ้งซ่อม</Title>
          <Skeleton loading={loading} active paragraph={{ rows: 6 }}>
            <Collapse
              accordion
              ghost
              items={task?.details.map((detail) => ({
                key: detail.id,
                label: (
                  <Flex justify="space-between" gap={8}>
                    <Text strong>{detail.code}</Text>
                    <Space size={4}>
                      <Space>
                        <Text type="secondary">สถานะเคส : </Text>
                        {detail.status ? (
                          <Tag color={detail.status?.color}>
                            {detail.status?.nameEn}
                          </Tag>
                        ) : (
                          <Tag color="default" bordered={false}>
                            ยังไม่ได้ระบุ
                          </Tag>
                        )}
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
                      <Descriptions.Item label="SLA">
                        {detail.subCategory?.SLA1H} ชั่วโมง หรือ{" "}
                        {detail.subCategory?.SLA1D} วัน
                      </Descriptions.Item>
                      <Descriptions.Item label="วันที่และเวลาเข้าตรวจสอบ">
                        {detail.appointmentDate
                          ? dayjs(detail.appointmentDate).format("DD/MM/YYYY")
                          : ""}
                        {detail.appointmentTime
                          ? ` ${detail.appointmentTime.nameTh}`
                          : ""}
                      </Descriptions.Item>
                      <Descriptions.Item label="วันที่และเวลาเข้าซ่อม" span={3}>
                        {detail.appointmentRepairDate
                          ? dayjs(detail.appointmentRepairDate).format(
                              "DD/MM/YYYY"
                            )
                          : ""}
                        {detail.appointmentRepairTime
                          ? ` ${detail.appointmentRepairTime.nameTh}`
                          : ""}
                      </Descriptions.Item>
                      <Descriptions.Item label="ผู้รับผิดชอบ" span={3}>
                        <Flex align="center" gap={8}>
                          {detail?.homecare?.employeeId && (
                            <AvatarWithEmployeeId
                              employeeId={detail.homecare?.employeeId}
                            />
                          )}
                          {detail?.homecare && (
                            <Text>
                              {detail.homecare?.firstName}{" "}
                              {detail.homecare?.lastName} (
                              {detail.homecare?.employeeId})
                            </Text>
                          )}
                        </Flex>
                      </Descriptions.Item>
                      <Descriptions.Item label="รูปภาพ" span={3}>
                        <RepairImagePreview
                          images={detail.images.filter(
                            (image) =>
                              image.fileType ===
                              UploadFileType.CentralMainFormAttachment
                          )}
                        />
                      </Descriptions.Item>
                      <Descriptions.Item label="จัดการ">
                        <Flex gap={8}>
                          <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            styles={{
                              icon: {
                                display: "flex",
                                alignItems: "baseline",
                              },
                            }}
                            icon={<FontAwesomeIcon icon={faPaperclip} />}
                            onClick={() => {
                              setUploadFilesDialogOpen(true);
                              setTaskDetail(detail);
                            }}
                          >
                            แนบรูปภาพเพิ่มเติม
                          </Button>
                          <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            styles={{
                              icon: {
                                display: "flex",
                                alignItems: "baseline",
                              },
                            }}
                            icon={<FontAwesomeIcon icon={faEdit} />}
                            onClick={() => {
                              setEditDialogOpen(true);
                              setTaskDetail(detail);
                            }}
                          >
                            แก้ไข
                          </Button>
                          <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            styles={{
                              icon: {
                                display: "flex",
                                alignItems: "baseline",
                              },
                            }}
                            icon={<FontAwesomeIcon icon={faHistory} />}
                            onClick={() => {
                              setLogsDialogOpen(true);
                              setTaskDetail(detail);
                            }}
                          >
                            Logs
                          </Button>
                        </Flex>
                      </Descriptions.Item>
                    </Descriptions>
                  </Flex>
                ),
              }))}
            />
          </Skeleton>
        </>
      )}
      <JuristicCentralUploadFilesDialog
        open={uploadFilesDialogOpen}
        onCancel={() => {
          setUploadFilesDialogOpen(false);
          setTaskDetail(null);
        }}
        onSubmit={async (values) => {
          const createUploadFileInput: CreateUploadFileInput[] =
            values.images.map((image) => ({
              refId: taskDetail?.id ?? "",
              fileType: UploadFileType.CentralAdditional,
              fileId: image.response?.fileId,
              fileName: image.response?.fileName,
              fileFolder: image.response?.fileFolder,
              filePath: image.response?.filePath,
              fileBucket: image.response?.fileBucket,
              fileExtension: image.response?.fileExtension,
            }));

          await modalApi.confirm({
            title: "ยืนยันการแนบรูปภาพเพิ่มเติม",
            content: "ยืนยันการแนบรูปภาพเพิ่มเติม",
            okText: "ยืนยัน",
            cancelText: "ยกเลิก",
            okButtonProps: {
              icon: <FontAwesomeIcon icon={faSave} />,
            },
            onOk: async () => {
              await createUploadFile({
                variables: {
                  createUploadFileInput,
                },
              });
            },
          });
        }}
        confirmLoading={createUploadFileLoading}
        taskDetail={taskDetail}
      />
      <JuristicCentralEditDialog
        open={editDialogOpen}
        onCancel={() => {
          setEditDialogOpen(false);
          setTaskDetail(null);
        }}
        onSubmit={() => {
          setEditDialogOpen(false);
          setTaskDetail(null);
        }}
        taskDetail={taskDetail}
      />
      <JuristicCentralLogsDialog
        open={logsDialogOpen}
        onCancel={() => {
          setLogsDialogOpen(false);
          setTaskDetail(null);
        }}
        taskDetail={taskDetail}
      />
    </LayoutWithBreadcrumb>
  );
};
