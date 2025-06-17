import { CustomModal } from "@/components/common/CustomModal";
import { TaskDetailFragment } from "@/gql/generated/tasks.generated";
import { faSave } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DatePicker, Flex, Form, Input, List, Typography } from "antd";
import dayjs from "dayjs";
import { useMemo } from "react";

const { Text } = Typography;

interface RepairCallCenterCallingDialogProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: { callDate: Date; callComment: string }) => void;
  taskDetail: TaskDetailFragment | null;
  confirmLoading: boolean;
}

export const RepairCallCenterCallingDialog = ({
  open,
  onCancel,
  onSubmit,
  taskDetail,
  confirmLoading,
}: RepairCallCenterCallingDialogProps) => {
  const [form] = Form.useForm();

  return (
    <CustomModal
      title="โทรติดต่อลูกบ้าน"
      open={open}
      onCancel={onCancel}
      okText="บันทึก"
      cancelText="ยกเลิก"
      onOk={() => form.submit()}
      okButtonProps={{
        icon: <FontAwesomeIcon icon={faSave} />,
      }}
      confirmLoading={confirmLoading}
      destroyOnHidden
    >
      <Form layout="vertical" form={form} preserve={false} onFinish={onSubmit}>
        <Form.Item
          label="วันที่และเวลา"
          name="callDate"
          required={false}
          rules={[{ required: true, message: "กรุณาเลือกวันที่และเวลา" }]}
        >
          <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm"
            placeholder="เลือกวันที่และเวลา"
          />
        </Form.Item>
        <Form.Item
          label="ความคิดเห็น"
          name="callComment"
          required={false}
          rules={[{ required: true, message: "กรุณาระบุความคิดเห็น" }]}
        >
          <Input.TextArea rows={4} placeholder="ความคิดเห็น" />
        </Form.Item>
      </Form>
    </CustomModal>
  );
};

interface RepairCallCenterCallingHistoryDialogProps {
  open: boolean;
  onCancel: () => void;
  taskDetail: TaskDetailFragment | null;
}

export const RepairCallCenterCallingHistoryDialog = ({
  open,
  onCancel,
  taskDetail,
}: RepairCallCenterCallingHistoryDialogProps) => {
  const callings = useMemo(() => taskDetail?.callings, [taskDetail]);
  return (
    <CustomModal
      title="ประวัติการโทร"
      open={open}
      onCancel={onCancel}
      footer={null}
    >
      <List
        dataSource={callings}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={`โทรครั้งที่ ${item.callOrder}`}
              description={
                <Flex vertical>
                  <Text type="secondary">
                    วันที่ : {dayjs(item.callDate).format("DD/MM/YYYY HH:mm")}
                  </Text>
                  <Text type="secondary">ความคิดเห็น : {item.callComment}</Text>
                </Flex>
              }
            />
          </List.Item>
        )}
      />
    </CustomModal>
  );
};
