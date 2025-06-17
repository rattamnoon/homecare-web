import { CustomModal } from "@/components/common/CustomModal";
import { TaskStatus, UpdateTaskDetailInput } from "@/gql/generated/graphql";
import {
  TaskDetailFragment,
  TaskDocument,
  useUpdateTaskDetailMutation,
} from "@/gql/generated/tasks.generated";
import { faSave } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Input, notification } from "antd";

interface RepairClosedDialogProps {
  open: boolean;
  onCancel: () => void;
  taskDetail: TaskDetailFragment | null;
}

export const RepairClosedDialog = ({
  open,
  onCancel,
  taskDetail,
}: RepairClosedDialogProps) => {
  const [notificationApi, notificationContextHolder] =
    notification.useNotification();
  const [form] = Form.useForm();

  const [updateTaskDetail, { loading: updateTaskDetailLoading }] =
    useUpdateTaskDetailMutation({
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
          variables: {
            id: taskDetail?.taskId ?? "",
          },
        },
      ],
    });

  return (
    <>
      {notificationContextHolder}
      <CustomModal
        open={open}
        onCancel={onCancel}
        title="ปิดเศส"
        okText="บันทึก"
        cancelText="ยกเลิก"
        okButtonProps={{
          icon: <FontAwesomeIcon icon={faSave} />,
        }}
        onOk={() => {
          form.submit();
        }}
        confirmLoading={updateTaskDetailLoading}
        destroyOnHidden
      >
        <Form
          layout="vertical"
          form={form}
          preserve={false}
          onFinish={async (values) => {
            const updateTaskDetailInput: UpdateTaskDetailInput = {
              id: taskDetail?.id ?? "",
              status: TaskStatus.Closed,
              priority: taskDetail?.priority?.id ?? 0,
              homecareRemark: values.remark,
            };

            await updateTaskDetail({
              variables: { updateTaskDetailInput },
            });
          }}
        >
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
    </>
  );
};
