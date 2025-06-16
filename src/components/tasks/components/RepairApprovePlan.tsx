import { CustomModal } from "@/components/common/CustomModal";
import {
  CreateTaskDetailReportLogInput,
  TaskStatus,
} from "@/gql/generated/graphql";
import {
  TaskDetailFragment,
  TaskDocument,
  useCreateTaskDetailReportLogMutation,
  useCreateTaskDetailReportLogWithAssignMutation,
} from "@/gql/generated/tasks.generated";
import { faCheck, faSave, faXmark } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Col,
  Descriptions,
  Flex,
  Form,
  Input,
  notification,
  Row,
  Space,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import dayjs from "dayjs";
import { useMemo, useState } from "react";

type RepairApprovePlanProps = {
  taskDetail: TaskDetailFragment;
};

const { Text } = Typography;

const RepairApprovePlanDialog = ({
  open,
  onCancel,
  approveLabel,
  taskDetail,
  taskStatus,
}: {
  open: boolean;
  onCancel: () => void;
  approveLabel: string;
  taskDetail: TaskDetailFragment;
  taskStatus?: TaskStatus;
}) => {
  const [form] = Form.useForm();

  const [notificationApi, notificationContextHolder] =
    notification.useNotification();

  const [
    createTaskDetailReportLogWithAssign,
    { loading: createTaskDetailReportLogWithAssignLoading },
  ] = useCreateTaskDetailReportLogWithAssignMutation({
    onCompleted: () => {
      notificationApi.success({
        message: "สำเร็จ !!",
        description: "บันทึกข้อมูลเรียบร้อย",
        duration: 3,
      });
      onCancel();
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
        variables: { id: taskDetail.id },
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
      onCancel();
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
        variables: { id: taskDetail.id },
      },
    ],
  });

  const reportLogs = useMemo(() => {
    return taskDetail.reportLogs?.[0];
  }, [taskDetail]);

  return (
    <>
      {notificationContextHolder}
      <CustomModal
        title={approveLabel}
        open={open}
        onCancel={onCancel}
        onOk={() => {
          form.submit();
        }}
        okText="บันทึก"
        cancelText="ยกเลิก"
        okButtonProps={{
          icon: <FontAwesomeIcon icon={faSave} />,
        }}
        destroyOnHidden
        confirmLoading={
          createTaskDetailReportLogWithAssignLoading ||
          createTaskDetailReportLogLoading
        }
      >
        <Flex vertical gap={16}>
          <Descriptions bordered size="small" column={1}>
            <Descriptions.Item label="สถานะ">
              <Tag color={reportLogs?.type?.color}>
                {reportLogs?.type?.nameEn}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="วันที่และเวลา">
              {dayjs(reportLogs?.createdAt).format("DD/MM/YYYY HH:mm")}
            </Descriptions.Item>
            <Descriptions.Item label="หมายเหตุ">
              {reportLogs?.remark}
            </Descriptions.Item>
          </Descriptions>
          <Form
            form={form}
            layout="vertical"
            preserve={false}
            onFinish={async (values) => {
              if (!taskStatus) {
                return;
              }
              const hasAssign = taskDetail.assigns?.length > 0;

              if (hasAssign) {
                const taskDetailId = taskDetail.id;
                const taskDetailAssignId = taskDetail.assigns?.[0]?.id;
                const createTaskDetailReportLogInput: CreateTaskDetailReportLogInput =
                  {
                    taskDetailId,
                    taskDetailAssignId,
                    type: taskStatus,
                    remark: values.remark,
                  };

                await createTaskDetailReportLogWithAssign({
                  variables: {
                    createTaskDetailReportLogInput,
                  },
                });
              } else {
                const taskDetailId = taskDetail.id;
                const createTaskDetailReportLogInput: CreateTaskDetailReportLogInput =
                  {
                    taskDetailId,
                    type: taskStatus,
                    remark: values.remark,
                  };

                await createTaskDetailReportLog({
                  variables: {
                    createTaskDetailReportLogInput,
                  },
                });
              }
            }}
          >
            <Form.Item
              label="หมายเหตุ"
              name="remark"
              required={false}
              rules={[{ required: true, message: "กรุณากรอกหมายเหตุ" }]}
            >
              <Input.TextArea
                rows={4}
                placeholder="กรุณากรอกหมายเหตุ"
                translate="no"
                allowClear
                maxLength={500}
                showCount
              />
            </Form.Item>
          </Form>
        </Flex>
      </CustomModal>
    </>
  );
};

export const RepairApprovePlan = ({ taskDetail }: RepairApprovePlanProps) => {
  const [openApproveDialog, setOpenApproveDialog] = useState(false);
  const [approveLabel, setApproveLabel] = useState<string>("อนุมัติ");
  const [taskStatus, setTaskStatus] = useState<TaskStatus>();

  const currentStatus = taskDetail.status;

  const handleApprove = () => {
    if (taskStatus === TaskStatus.HomecareFinished) {
      setTaskStatus(TaskStatus.ApproveFinishHomecare);
    } else if (taskStatus === TaskStatus.Hold) {
      setTaskStatus(TaskStatus.ApprovedHold);
    }
    setOpenApproveDialog(true);
    setApproveLabel("อนุมัติ");
  };

  const handleReject = () => {
    if (taskStatus === TaskStatus.HomecareFinished) {
      setTaskStatus(TaskStatus.RejectFinishedHomecare);
    } else if (taskStatus === TaskStatus.Hold) {
      setTaskStatus(TaskStatus.RejectHold);
    }
    setOpenApproveDialog(true);
    setApproveLabel("ยกเลิก");
  };

  return (
    <div
      style={{
        borderLeft: `4px solid ${currentStatus?.color}`,
        padding: 8,
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
      }}
    >
      <Row gutter={16} justify="space-between" align="middle">
        <Col span={6}>
          <Text>{currentStatus?.nameEn}</Text>
        </Col>
        <Col span={6}>
          <Text>
            วันที่และเวลา :{" "}
            {dayjs(taskDetail?.reportLogs?.[0]?.createdAt).format(
              "DD/MM/YYYY HH:mm"
            )}
          </Text>
        </Col>
        <Col span={6}>
          <Text>หมายเหตุ : {taskDetail?.reportLogs?.[0]?.remark}</Text>
        </Col>
        <Col span={6}>
          <Space.Compact>
            <Tooltip title="อนุมัติงาน">
              <Button
                variant="filled"
                color="green"
                size="small"
                icon={<FontAwesomeIcon icon={faCheck} />}
                onClick={handleApprove}
              >
                อนุมัติ
              </Button>
            </Tooltip>
            <Tooltip title="ยกเลิกงาน">
              <Button
                variant="filled"
                color="red"
                size="small"
                icon={<FontAwesomeIcon icon={faXmark} />}
                onClick={handleReject}
              >
                ยกเลิก
              </Button>
            </Tooltip>
          </Space.Compact>
        </Col>
      </Row>
      <RepairApprovePlanDialog
        open={openApproveDialog}
        onCancel={() => setOpenApproveDialog(false)}
        approveLabel={approveLabel}
        taskDetail={taskDetail}
        taskStatus={taskStatus}
      />
    </div>
  );
};
