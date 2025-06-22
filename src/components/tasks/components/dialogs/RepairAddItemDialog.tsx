import { CustomModal } from "@/components/common/CustomModal";
import { faSave } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, notification } from "antd";

interface RepairAddItemDialogProps {
  open: boolean;
  onCancel: () => void;
  confirmLoading: boolean;
  taskId?: string | null;
}

export const RepairAddItemDialog = ({
  open,
  onCancel,
  confirmLoading,
  taskId,
}: RepairAddItemDialogProps) => {
  const [notificationApi, notificationContextHolder] =
    notification.useNotification();
  const [form] = Form.useForm();

  return (
    <>
      {notificationContextHolder}
      <CustomModal
        title="เพิ่มรายการงานแจ้งซ่อม"
        open={open}
        onCancel={onCancel}
        okText="บันทึก"
        cancelText="ยกเลิก"
        onOk={() => {
          form.submit();
        }}
        okButtonProps={{
          icon: <FontAwesomeIcon icon={faSave} />,
        }}
        width={800}
        confirmLoading={confirmLoading}
        destroyOnHidden
      >
        <pre>{JSON.stringify(taskId, null, 2)}</pre>
      </CustomModal>
    </>
  );
};
