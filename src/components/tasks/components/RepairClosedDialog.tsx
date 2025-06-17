import { CustomModal } from "@/components/common/CustomModal";
import { TaskDetailFragment } from "@/gql/generated/tasks.generated";
import { faSave } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Input } from "antd";

interface RepairClosedDialogProps {
  open: boolean;
  onSubmit: (values: { remark: string }) => void;
  onCancel: () => void;
  confirmLoading: boolean;
  taskDetail: TaskDetailFragment | null;
}

export const RepairClosedDialog = ({
  open,
  onCancel,
  onSubmit,
  confirmLoading,
}: RepairClosedDialogProps) => {
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
