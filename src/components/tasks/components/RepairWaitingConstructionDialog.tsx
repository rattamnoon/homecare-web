import { CustomModal } from "@/components/common/CustomModal";
import { useTaskOptionsQuery } from "@/gql/generated/option.generated";
import { TaskDetailFragment } from "@/gql/generated/tasks.generated";
import { faSave } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DatePicker, Flex, Form, Input, Select, Typography } from "antd";
import { useMemo } from "react";

interface RepairWaitingConstructionDialogProps {
  open: boolean;
  onCancel: () => void;
  taskDetail: TaskDetailFragment | null;
}

const { Text } = Typography;

// ของไม่ครบ
export const RepairWaitingConstructionDialog = ({
  open,
  onCancel,
  taskDetail,
}: RepairWaitingConstructionDialogProps) => {
  const [form] = Form.useForm();
  const { data: taskOptions } = useTaskOptionsQuery();

  const checkInRangeTimeOptions = useMemo(() => {
    return taskOptions?.rangeTimes.map((option) => ({
      label: option.nameTh,
      value: option.id,
    }));
  }, [taskOptions]);

  const errorMessage = useMemo(() => {
    const errors = form.getFieldsError();
    return errors.map((error) => error.errors[0]).join("\n");
  }, [form]);

  return (
    <CustomModal
      title="ติดต่อลูกค้าไม่ได้"
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
    >
      <Form
        form={form}
        layout="horizontal"
        labelCol={{ span: 8 }}
        preserve={false}
      >
        <Form.Item
          label="วันที่ของมาถึง"
          name="callBackDate"
          required={false}
          rules={[{ required: true, message: "กรุณาเลือกวันที่ของมาถึง" }]}
        >
          <DatePicker
            placeholder="เลือกวันที่ของมาถึง"
            format="DD/MM/YYYY"
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item label="วันที่และเวลาเข้าซ่อม" required={false}>
          <Flex gap={8}>
            <Form.Item
              name="checkInDate"
              noStyle
              rules={[
                { required: true, message: "กรุณาเลือกวันที่และเวลาเข้าซ่อม" },
              ]}
            >
              <DatePicker
                placeholder="เลือกวันที่และเวลาเข้าซ่อม"
                format="DD/MM/YYYY"
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item
              name="checkInRangeTime"
              noStyle
              rules={[
                { required: true, message: "กรุณาเลือกช่วงเวลาเข้าซ่อม" },
              ]}
            >
              <Select
                placeholder="เลือกช่วงเวลาเข้าซ่อม"
                options={checkInRangeTimeOptions}
                style={{ width: "100%" }}
              />
            </Form.Item>
            {errorMessage && <Text type="danger">{errorMessage}</Text>}
          </Flex>
        </Form.Item>
        <Form.Item
          label="หมายเหตุ"
          name="remark"
          required={false}
          rules={[{ required: true, message: "กรุณาระบุหมายเหตุ" }]}
        >
          <Input.TextArea
            placeholder="รายละเอียด"
            rows={4}
            style={{ width: "100%" }}
          />
        </Form.Item>
      </Form>
    </CustomModal>
  );
};
