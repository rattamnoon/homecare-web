import { CustomModal } from "@/components/common/CustomModal";
import { TaskFragment } from "@/gql/generated/tasks.generated";
import { faSave } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { Col, DatePicker, Divider, Flex, Form, Row, Typography } from "antd";
import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const { Text, Title } = Typography;

const schema = z.object({
  insuranceDate: z.date({ message: "กรุณาระบุวันที่" }),
});

interface RepairInsuranceExpandDialogProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: z.infer<typeof schema>) => void;
  confirmLoading: boolean;
  task?: TaskFragment | null;
}

export const RepairInsuranceExpandDialog = ({
  open,
  onCancel,
  onSubmit,
  task,
  confirmLoading,
}: RepairInsuranceExpandDialogProps) => {
  const { control, handleSubmit } = useForm<z.infer<typeof schema>>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  return (
    <CustomModal
      open={open}
      onCancel={onCancel}
      title="ขยายประกัน"
      okText="บันทึก"
      cancelText="ยกเลิก"
      onOk={handleSubmit(onSubmit)}
      okButtonProps={{
        icon: <FontAwesomeIcon icon={faSave} />,
      }}
      confirmLoading={confirmLoading}
      destroyOnHidden
    >
      <Form layout="horizontal" preserve={false} labelCol={{ span: 8 }}>
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
            <Form.Item label="วันที่ขยายประกันปัจจุบัน">
              <Text>
                {task?.insuranceDate
                  ? dayjs(task?.insuranceDate).format("DD/MM/YYYY")
                  : "-"}
              </Text>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Controller
              control={control}
              name="insuranceDate"
              render={({ field, formState: { errors } }) => (
                <Form.Item
                  label="วันที่ขยายประกันใหม่"
                  required={false}
                  validateStatus={errors.insuranceDate ? "error" : ""}
                  help={errors.insuranceDate?.message}
                >
                  <DatePicker
                    {...field}
                    format="DD/MM/YYYY"
                    style={{ width: "100%" }}
                    value={field.value ? dayjs(field.value) : undefined}
                    onChange={(value) => {
                      field.onChange(value?.toDate());
                    }}
                    disabledDate={(current) => {
                      return current && current < dayjs();
                    }}
                  />
                </Form.Item>
              )}
            />
          </Col>
        </Row>
      </Form>
    </CustomModal>
  );
};
