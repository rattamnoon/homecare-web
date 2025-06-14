import { CustomModal } from "@/components/common/CustomModal";
import { TaskDetailFragment } from "@/gql/generated/tasks.generated";
import { faSave } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, DatePicker, Form, InputNumber, Row, Select } from "antd";
import dayjs from "dayjs";

interface RepairAssignedDialogProps {
  open: boolean;
  onCancel: () => void;
  taskDetail: TaskDetailFragment | null;
}

export const RepairAssignedDialog = ({
  open,
  onCancel,
  taskDetail,
}: RepairAssignedDialogProps) => {
  const [form] = Form.useForm();
  return (
    <CustomModal
      title="จ่ายงาน"
      open={open}
      onCancel={onCancel}
      okText="บันทึก"
      cancelText="ยกเลิก"
      onOk={() => {}}
      okButtonProps={{
        icon: <FontAwesomeIcon icon={faSave} />,
      }}
      width={800}
    >
      <Form form={form} labelCol={{ span: 8 }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Form.Item label="ประเภทหลัก" name="assign">
              <Select placeholder="เลือกประเภทหลัก" options={[]} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="ประเภทย่อย" name="assign">
              <Select placeholder="เลือกประเภทย่อย" options={[]} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="ผู้รับผิดชอบ" name="assign">
              <Select placeholder="เลือกผู้รับผิดชอบ" options={[]} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="SLA" name="assign">
              <InputNumber
                disabled
                variant="borderless"
                defaultValue={24}
                addonAfter="ชั่วโมง"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="วันที่เข้าตรวจสอบ" name="assign">
              <DatePicker
                placeholder="เลือกวันที่เข้าตรวจสอบ"
                format="DD/MM/YYYY"
                style={{ width: "100%" }}
                disabledDate={(current) => {
                  return (
                    current && current < dayjs().subtract(1, "day").endOf("day")
                  );
                }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="วันที่จ่ายงาน" name="assign">
              <DatePicker
                placeholder="เลือกวันที่จ่ายงาน"
                format="DD/MM/YYYY"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </CustomModal>
  );
};
