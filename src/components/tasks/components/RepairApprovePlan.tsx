import { CustomModal } from "@/components/common/CustomModal";
import { TaskStatus } from "@/gql/generated/graphql";
import { TaskDetailFragment } from "@/gql/generated/tasks.generated";
import { faCheck, faSave, faXmark } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Col,
  Descriptions,
  Flex,
  Form,
  Input,
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
  onOk,
  approveLabel,
  taskDetail,
}: {
  open: boolean;
  onCancel: () => void;
  onOk: () => void;
  approveLabel: string;
  taskDetail: TaskDetailFragment;
}) => {
  const [form] = Form.useForm();

  const reportLogs = useMemo(() => {
    return taskDetail.reportLogs?.[0];
  }, [taskDetail]);

  return (
    <CustomModal
      title={approveLabel}
      open={open}
      onCancel={onCancel}
      onOk={onOk}
      okText="บันทึก"
      cancelText="ยกเลิก"
      okButtonProps={{
        icon: <FontAwesomeIcon icon={faSave} />,
      }}
      destroyOnHidden
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
        <Form form={form} layout="vertical" preserve={false}>
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
        onOk={handleApprove}
        approveLabel={approveLabel}
        taskDetail={taskDetail}
      />
    </div>
  );
};
