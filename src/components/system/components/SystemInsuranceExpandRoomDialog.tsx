import { CustomModal } from "@/components/common/CustomModal";
import { InsuranceExtensionFragment } from "@/gql/generated/insurance-extensions.generated";
import { useFileUpload } from "@/hooks/useFileUpload";
import { faSave, faUpload } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Row,
  Typography,
  Upload,
  UploadFile,
} from "antd";
import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const { Text } = Typography;

const schema = z.object({
  insuranceDate: z.date({ message: "กรุณาเลือกวันหมดประกัน" }),
  files: z.array(z.custom<UploadFile>()),
});

interface SystemInsuranceExpandRoomDialogProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: { insuranceDate: Date; files: UploadFile[] }) => void;
  insuranceExpand?: InsuranceExtensionFragment | null;
  confirmLoading: boolean;
}

export const SystemInsuranceExpandRoomDialog = ({
  open,
  onCancel,
  onSubmit,
  insuranceExpand,
  confirmLoading,
}: SystemInsuranceExpandRoomDialogProps) => {
  const { control, handleSubmit } = useForm<z.infer<typeof schema>>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });
  const uploadFile = useFileUpload("file", "insurance-expand");

  return (
    <CustomModal
      title="ขยายวันหมดประกันห้อง"
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
      <Form layout="horizontal" preserve={false}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="จากวันที่">
              <Text>
                {dayjs(insuranceExpand?.insuranceDateExpand).format(
                  "DD/MM/YYYY"
                )}
              </Text>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Controller
              control={control}
              name="insuranceDate"
              render={({ field, formState: { errors } }) => (
                <Form.Item
                  label="เป็นวันที่"
                  required={false}
                  validateStatus={errors.insuranceDate ? "error" : ""}
                  help={errors.insuranceDate?.message}
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
          <Col span={24}>
            <Controller
              control={control}
              name="files"
              render={({ field, formState: { errors } }) => (
                <Form.Item
                  label="ไฟล์หลักฐาน"
                  required={false}
                  validateStatus={errors.files ? "error" : ""}
                  help={errors.files?.message}
                >
                  <Upload
                    {...field}
                    {...uploadFile}
                    multiple
                    listType="picture"
                    onChange={(info) => {
                      field.onChange(info.fileList);
                    }}
                    fileList={field.value as unknown as UploadFile[]}
                  >
                    <Button icon={<FontAwesomeIcon icon={faUpload} />}>
                      อัพโหลดไฟล์
                    </Button>
                  </Upload>
                </Form.Item>
              )}
            />
          </Col>
        </Row>
      </Form>
    </CustomModal>
  );
};
