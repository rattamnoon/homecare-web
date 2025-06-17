import { CustomModal } from "@/components/common/CustomModal";
import { useTaskOptionsQuery } from "@/gql/generated/option.generated";
import { TaskDetailFragment } from "@/gql/generated/tasks.generated";
import { faSave } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Radio, Skeleton, Space } from "antd";
import { useEffect, useMemo } from "react";

interface RepairPriorityDialogProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: { priority: number }) => void;
  taskDetail: TaskDetailFragment | null;
  confirmLoading: boolean;
}

export const RepairPriorityDialog = ({
  open,
  onCancel,
  onSubmit,
  taskDetail,
  confirmLoading,
}: RepairPriorityDialogProps) => {
  const [form] = Form.useForm();

  const { data: optionsData, loading: optionsLoading } = useTaskOptionsQuery({
    skip: !open,
  });
  const priorities = useMemo(
    () => optionsData?.priorities || [],
    [optionsData]
  );

  useEffect(() => {
    form.setFieldsValue({
      priority: taskDetail?.priority?.id || 0,
    });
  }, [form, taskDetail]);

  return (
    <CustomModal
      title="Priority"
      open={open}
      onCancel={onCancel}
      onOk={() => {
        form.submit();
      }}
      okText="บันทึก"
      cancelText="ยกเลิก"
      confirmLoading={confirmLoading}
      okButtonProps={{
        icon: <FontAwesomeIcon icon={faSave} />,
      }}
      destroyOnHidden
    >
      <Skeleton loading={optionsLoading}>
        <Form
          form={form}
          layout="vertical"
          preserve={false}
          onFinish={onSubmit}
          initialValues={{
            priority: taskDetail?.priority?.id || 0,
          }}
        >
          <Form.Item
            name="priority"
            required={false}
            rules={[{ required: true, message: "กรุณาเลือกความสำคัญ" }]}
          >
            <Radio.Group>
              <Space direction="vertical">
                {priorities.map((priority) => (
                  <Radio key={priority.id} value={priority.id}>
                    {priority.nameTh}
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Skeleton>
    </CustomModal>
  );
};
