import { CustomModal } from "@/components/common/CustomModal";
import {
  TaskDetailFragment,
  TaskFragment,
} from "@/gql/generated/tasks.generated";
import { faSave } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Divider, Flex, Form, Input, Row, Typography } from "antd";

const { Title, Text } = Typography;

interface RepairClosedDialogProps {
  open: boolean;
  onSubmit: (values: { remark: string }) => void;
  onCancel: () => void;
  confirmLoading: boolean;
}

export const RepairTaskDetailClosedDialog = ({
  open,
  onCancel,
  onSubmit,
  confirmLoading,
}: RepairClosedDialogProps & {
  taskDetail?: TaskDetailFragment | null;
}) => {
  const [form] = Form.useForm();

  return (
    <CustomModal
      open={open}
      onCancel={onCancel}
      title="ปิดเศส"
      okText="บันทึก"
      cancelText="ยกเลิก"
      okButtonProps={{
        icon: <FontAwesomeIcon icon={faSave} />,
      }}
      onOk={() => form.submit()}
      confirmLoading={confirmLoading}
      destroyOnHidden
    >
      <Form layout="vertical" form={form} preserve={false} onFinish={onSubmit}>
        <Form.Item label="หมายเหตุ" name="remark" colon={false}>
          <Input.TextArea
            rows={4}
            placeholder="หมายเหตุ"
            maxLength={500}
            showCount
          />
        </Form.Item>
      </Form>
    </CustomModal>
  );
};

export const RepairTaskClosedDialog = ({
  open,
  onCancel,
  onSubmit,
  confirmLoading,
  task,
}: RepairClosedDialogProps & {
  task?: TaskFragment | null;
}) => {
  const [form] = Form.useForm();
  return (
    <CustomModal
      title="ปิดงาน"
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
      <Form
        form={form}
        layout="horizontal"
        preserve={false}
        labelCol={{ span: 4 }}
        onFinish={onSubmit}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Title level={5}>
              {task?.project?.id} - {task?.project?.nameTh ?? ""}
            </Title>
            <Flex vertical>
              <Text type="secondary">รหัสงาน: {task?.code}</Text>
              <Text type="secondary">ห้อง: {task?.unit?.unitNumber}</Text>
              <Text type="secondary">
                เลขที่ห้อง: {task?.unit?.houseNumber}
              </Text>
            </Flex>
            <Divider style={{ margin: "16px 0" }} />
          </Col>
          <Col span={24}>
            <Form.Item label="หมายเหตุ" name="remark" required={false}>
              <Input.TextArea rows={4} maxLength={500} showCount allowClear />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </CustomModal>
  );
};
