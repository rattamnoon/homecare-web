import { CustomModal } from "@/components/common/CustomModal";
import { MasterType } from "@/gql/generated/graphql";
import { useMastersQuery } from "@/gql/generated/master.generated";
import { useFileUpload } from "@/hooks/useFileUpload";
import { faUpload } from "@fortawesome/pro-regular-svg-icons";
import { faSave } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Input, Select, Upload, UploadFile } from "antd";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  categoryId: z.string({ message: "กรุณาเลือกประเภท" }),
  subCategoryId: z.string({ message: "กรุณาเลือกประเภทย่อย" }),
  description: z.string({ message: "กรุณากรอกรายละเอียด" }),
  images: z.array(z.custom<UploadFile>()).optional(),
});

interface RepairAddItemDialogProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: z.infer<typeof schema>) => void;
  confirmLoading: boolean;
}

export const RepairAddItemDialog = ({
  open,
  onCancel,
  confirmLoading,
}: RepairAddItemDialogProps) => {
  const uploadFile = useFileUpload("file", "customer");

  const { control, handleSubmit, watch } = useForm<z.infer<typeof schema>>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  const categoryId = watch("categoryId");

  const { data: mastersData, loading: mastersLoading } = useMastersQuery({
    variables: {
      types: [MasterType.Category],
    },
  });

  const masters = useMemo(() => mastersData?.masters, [mastersData]);

  const categoryOptions = useMemo(() => {
    return masters?.map((master) => ({
      label: master.nameTh,
      value: master.id,
    }));
  }, [masters]);

  const subCategoryOptions = useMemo(() => {
    const options = masters?.filter((master) => {
      return master.id === categoryId;
    });

    if (!options) return [];

    return options
      .map((master) => master.children)
      .flat()
      .map((child) => ({
        label: child.nameTh,
        value: child.id,
      }));
  }, [categoryId, masters]);

  return (
    <CustomModal
      title="เพิ่มรายการงานแจ้งซ่อม"
      open={open}
      onCancel={onCancel}
      okText="บันทึก"
      cancelText="ยกเลิก"
      onOk={handleSubmit((values) => {
        console.log(values);
      })}
      okButtonProps={{
        icon: <FontAwesomeIcon icon={faSave} />,
      }}
      width={800}
      confirmLoading={confirmLoading}
      destroyOnHidden
    >
      <Form layout="vertical" preserve={false}>
        <Controller
          control={control}
          name="categoryId"
          render={({ field, formState: { errors } }) => (
            <Form.Item
              label="ประเภท"
              name="categoryId"
              required={false}
              validateStatus={errors?.categoryId ? "error" : ""}
              help={errors?.categoryId?.message}
            >
              <Select
                {...field}
                options={categoryOptions}
                placeholder="เลือกประเภท"
                allowClear
                showSearch
                loading={mastersLoading}
                optionFilterProp="label"
              />
            </Form.Item>
          )}
        />
        <Controller
          control={control}
          name="subCategoryId"
          render={({ field, formState: { errors } }) => (
            <Form.Item
              label="ประเภทย่อย"
              name="subCategoryId"
              required={false}
              validateStatus={errors?.subCategoryId ? "error" : ""}
              help={errors?.subCategoryId?.message}
              labelCol={{ span: 4 }}
            >
              <Select
                {...field}
                options={subCategoryOptions}
                disabled={!categoryId}
                placeholder="เลือกประเภทย่อย"
                allowClear
                showSearch
                optionFilterProp="label"
                loading={mastersLoading}
              />
            </Form.Item>
          )}
        />
        <Controller
          control={control}
          name="description"
          render={({ field, formState: { errors } }) => (
            <Form.Item
              label="รายละเอียด"
              name="description"
              required={false}
              validateStatus={errors?.description ? "error" : ""}
              help={errors?.description?.message}
              labelCol={{ span: 4 }}
            >
              <Input.TextArea {...field} placeholder="รายละเอียด" rows={4} />
            </Form.Item>
          )}
        />
        <Controller
          control={control}
          name="images"
          render={({ field, formState: { errors } }) => (
            <Form.Item
              label="รูปภาพ"
              name="images"
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
