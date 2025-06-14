import { CustomModal } from "@/components/common/CustomModal";
import { useTaskOptionsQuery } from "@/gql/generated/option.generated";
import {
  TaskDetailFragment,
  TaskDocument,
  useUpdateTaskDetailMutation,
} from "@/gql/generated/tasks.generated";
import { faSave } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Select } from "antd";
import { useMemo, useState } from "react";

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
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [updateTaskDetail] = useUpdateTaskDetailMutation({
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

  const onOk = async (priority: number) => {
    setConfirmLoading(true);
    await updateTaskDetail({
      variables: {
        updateTaskDetailInput: {
          id: taskDetail?.id || "",
          priority,
        },
      },
    });
    setConfirmLoading(false);
    onCancel();
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
      confirmLoading={confirmLoading}
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
      >
        <Form.Item
          label="Priority"
          name="priority"
          required
          rules={[{ required: true, message: "กรุณาเลือกความสำคัญ" }]}
        >
          <Select
            placeholder="เลือกความสำคัญ"
            options={priorities.map((priority) => ({
              label: priority.nameTh,
              value: priority.id,
            }))}
            loading={optionsLoading}
          />
        </Form.Item>
      </Form>
    </CustomModal>
  );
};
