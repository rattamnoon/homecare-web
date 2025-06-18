import { CustomModal } from "@/components/common/CustomModal";
import { useProjectQuery } from "@/gql/generated/project.generated";
import { faSave } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Col,
  DatePicker,
  Divider,
  Form,
  Row,
  Skeleton,
  Typography,
} from "antd";
import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const { Text, Title } = Typography;

const schema = z.object({
  insuranceDate: z.date({ message: "กรุณาเลือกวันหมดประกัน" }),
});

interface SystemInsuranceExpandProjectDialogProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: { insuranceDate: Date }) => void;
  projectId: string;
  confirmLoading: boolean;
}

export const SystemInsuranceExpandProjectDialog = ({
  open,
  onCancel,
  onSubmit,
  projectId,
  confirmLoading,
}: SystemInsuranceExpandProjectDialogProps) => {
  const { data: project, loading: projectLoading } = useProjectQuery({
    variables: {
      projectId,
    },
    skip: !open,
  });

  const { control, handleSubmit, formState } = useForm<z.infer<typeof schema>>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  return (
    <CustomModal
      title="ขยายวันหมดประกันทั้งโครงการ"
      open={open}
      onCancel={onCancel}
      onOk={handleSubmit(onSubmit)}
      okText="บันทึก"
      cancelText="ยกเลิก"
      okButtonProps={{
        icon: <FontAwesomeIcon icon={faSave} />,
      }}
      confirmLoading={confirmLoading}
      destroyOnHidden
    >
      <Skeleton loading={projectLoading} active>
        <Form layout="horizontal" preserve={false}>
          <Row gutter={16}>
            <Col span={24}>
              <Title level={5}>
                {project?.project?.id} - {project?.project?.nameTh ?? ""}
              </Title>
              <Text type="secondary">
                จำนวนห้อง: {project?.project?.units?.length}
              </Text>
              <Divider style={{ margin: "16px 0" }} />
            </Col>
            <Col span={12}>
              <Form.Item label="จากวันที่">
                <Text>
                  {project?.project?.insuranceDate
                    ? dayjs(project?.project?.insuranceDate).format(
                        "DD/MM/YYYY"
                      )
                    : "-"}
                </Text>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Controller
                control={control}
                name="insuranceDate"
                render={({ field }) => (
                  <Form.Item
                    label="เป็นวันที่"
                    name="insuranceDate"
                    required={false}
                    validateStatus={
                      formState.errors.insuranceDate ? "error" : ""
                    }
                    help={formState.errors.insuranceDate?.message}
                  >
                    <DatePicker
                      format="DD/MM/YYYY"
                      {...field}
                      value={field.value ? dayjs(field.value) : undefined}
                      onChange={(date) => {
                        field.onChange(date?.toDate());
                      }}
                    />
                  </Form.Item>
                )}
              />
            </Col>
          </Row>
        </Form>
      </Skeleton>
    </CustomModal>
  );
};
