import { CustomModal } from "@/components/common/CustomModal";
import { useTaskOptionsQuery } from "@/gql/generated/option.generated";
import {
  TaskDetailFragment,
  TaskDocument,
  useUpdateTaskDetailMutation,
} from "@/gql/generated/tasks.generated";
import { faSave } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, message, Radio, Space } from "antd";
import { useEffect, useMemo } from "react";

interface RepairPriorityDialogProps {
  open: boolean;
  onCancel: () => void;
  taskDetail: TaskDetailFragment | null;
}

export const RepairPriorityDialog = ({
  open,
  onCancel,
  taskDetail,
}: RepairPriorityDialogProps) => {
  const [form] = Form.useForm();
  const [updateTaskDetail, { loading: updateTaskDetailLoading }] =
    useUpdateTaskDetailMutation({
      onCompleted: () => {
        message.success("บันทึกสำเร็จ");
        onCancel();
        form.resetFields();
      },
      onError: (error) => {
        message.error(error.message);
      },
      refetchQueries: [
        {
          query: TaskDocument,
          variables: {
            id: taskDetail?.taskId,
          },
        },
      ],
    });
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

  const onOk = async (priority: number) => {
    await updateTaskDetail({
      variables: {
        updateTaskDetailInput: {
          id: taskDetail?.id || "",
          priority,
        },
      },
    });
  };

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
      confirmLoading={updateTaskDetailLoading}
      okButtonProps={{
        icon: <FontAwesomeIcon icon={faSave} />,
      }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          onOk(values.priority);
        }}
        initialValues={{
          priority: taskDetail?.priority?.id || 0,
        }}
      >
        <Form.Item
          label="Priority"
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
    </CustomModal>
  );
};
