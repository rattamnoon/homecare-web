import { CustomModal } from "@/components/common/CustomModal";
import { UploadFileType } from "@/gql/generated/graphql";
import { TaskDetailFragment } from "@/gql/generated/tasks.generated";
import { useFileUpload } from "@/hooks/useFileUpload";
import { faSave, faUpload } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Divider, Form, Upload, UploadFile } from "antd";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { RepairImagePreview } from "../RepairImagePreview";

const schema = z.object({
  images: z.array(z.custom<UploadFile>()).min(1, {
    message: "กรุณาเลือกรูปภาพ",
  }),
});

interface JuristicCentralUploadFilesProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: z.infer<typeof schema>) => void;
  confirmLoading: boolean;
  taskDetail?: TaskDetailFragment | null;
}

export const JuristicCentralUploadFilesDialog = ({
  open,
  onCancel,
  onSubmit,
  confirmLoading,
  taskDetail,
}: JuristicCentralUploadFilesProps) => {
  const additionalImages = useMemo(() => {
    return taskDetail?.images.filter(
      (image) => image.fileType === UploadFileType.CentralAdditional
    );
  }, [taskDetail]);

  const uploadFile = useFileUpload("file", "central/additional");

  const { control, handleSubmit } = useForm<z.infer<typeof schema>>({
    defaultValues: {
      images: [],
    },
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  return (
    <CustomModal
      title="แนบรูปภาพเพิ่มเติม"
      open={open}
      onCancel={onCancel}
      onOk={handleSubmit(onSubmit)}
      okText="บันทึก"
      cancelText="ยกเลิก"
      okButtonProps={{
        icon: <FontAwesomeIcon icon={faSave} />,
      }}
      width={800}
      confirmLoading={confirmLoading}
      destroyOnHidden
    >
      <RepairImagePreview images={additionalImages ?? []} />
      <Divider />
      <Form layout="vertical" preserve={false}>
        <Controller
          control={control}
          name="images"
          render={({ field, formState: { errors } }) => (
            <Form.Item
              label="รูปภาพ"
              required={false}
              validateStatus={errors?.images ? "error" : ""}
              help={errors.images?.message}
              labelCol={{ span: 4 }}
            >
              <Upload
                {...field}
                {...uploadFile}
                multiple
                onChange={(info) => {
                  field.onChange(info.fileList);
                }}
                fileList={field.value as unknown as UploadFile[]}
                listType="picture"
                accept="image/*"
              >
                <Button icon={<FontAwesomeIcon icon={faUpload} />}>
                  อัพโหลดรูปภาพ
                </Button>
              </Upload>
            </Form.Item>
          )}
        />
      </Form>
    </CustomModal>
  );
};
