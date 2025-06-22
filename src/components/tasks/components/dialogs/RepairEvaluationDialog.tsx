import { CustomModal } from "@/components/common/CustomModal";
import { MasterType } from "@/gql/generated/graphql";
import { useMastersQuery } from "@/gql/generated/master.generated";
import { TaskDetailFragment } from "@/gql/generated/tasks.generated";
import { faSave } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Input, Rate, Skeleton } from "antd";
import { useEffect, useMemo } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  evaluation: z.array(
    z.object({
      label: z.string(),
      questionId: z.string({ message: "กรุณาเลือกคำถาม" }),
      score: z
        .number({ message: "กรุณาใส่คะแนน" })
        .min(1, { message: "กรุณาใส่คะแนน" })
        .max(5, { message: "กรุณาใส่คะแนน" }),
    })
  ),
  CSATComment: z
    .string({ message: "กรุณาใส่ความคิดเห็น" })
    .optional()
    .nullable(),
});

type Schema = z.infer<typeof schema>;

interface RepairEvaluationDialogProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: Schema) => void;
  confirmLoading: boolean;
  taskDetail: TaskDetailFragment | null;
}

export const RepairEvaluationDialog = ({
  open,
  onCancel,
  onSubmit,
  confirmLoading,
}: RepairEvaluationDialogProps) => {
  const { control, handleSubmit, getValues } = useForm<Schema>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });
  const { data: mastersData, loading: mastersLoading } = useMastersQuery({
    variables: {
      types: [MasterType.Csat],
    },
    skip: !open,
  });

  const masters = useMemo(() => mastersData?.masters || [], [mastersData]);

  const { fields, replace } = useFieldArray({
    control,
    shouldUnregister: true,
    name: "evaluation",
  });

  useEffect(() => {
    if (masters.length > 0) {
      replace(
        masters.map((master) => ({
          label: master.nameTh ?? "",
          questionId: master.id,
          score: master.defaultScore ?? 3,
        }))
      );
    }
  }, [masters, replace]);

  return (
    <CustomModal
      title="ประเมินงาน"
      open={open}
      onCancel={onCancel}
      onOk={handleSubmit(onSubmit)}
      okText="บันทึก"
      cancelText="ยกเลิก"
      okButtonProps={{
        icon: <FontAwesomeIcon icon={faSave} />,
      }}
      width={600}
      confirmLoading={confirmLoading}
      destroyOnHidden
    >
      <Skeleton loading={mastersLoading}>
        <Form layout="vertical" preserve={false}>
          {fields.map((field, index) => (
            <Controller
              key={field.id}
              control={control}
              name={`evaluation.${index}.score`}
              render={({ field, formState: { errors } }) => (
                <Form.Item
                  label={getValues(`evaluation.${index}.label`)}
                  required={false}
                  validateStatus={
                    errors?.evaluation?.[index]?.score ? "error" : undefined
                  }
                >
                  <Rate count={5} {...field} />
                </Form.Item>
              )}
            />
          ))}
          <Controller
            control={control}
            name="CSATComment"
            render={({ field, formState: { errors } }) => (
              <Form.Item
                label="ชมเชย/ข้อเสนอแนะ"
                required={false}
                validateStatus={errors.CSATComment ? "error" : undefined}
                help={errors.CSATComment?.message}
              >
                <Input.TextArea rows={4} {...field} value={field.value ?? ""} />
              </Form.Item>
            )}
          />
        </Form>
      </Skeleton>
    </CustomModal>
  );
};
