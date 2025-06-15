import { CustomModal } from "@/components/common/CustomModal";
import { useCreateCsatMutation } from "@/gql/generated/csat.generated";
import { MasterType } from "@/gql/generated/graphql";
import { useMastersQuery } from "@/gql/generated/master.generated";
import {
  TaskDetailFragment,
  TaskDocument,
} from "@/gql/generated/tasks.generated";
import { faSave } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Input, notification, Rate, Skeleton } from "antd";
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
  taskDetail: TaskDetailFragment | null;
}

export const RepairEvaluationDialog = ({
  open,
  onCancel,
  taskDetail,
}: RepairEvaluationDialogProps) => {
  const [notificationApi, notificationContextHolder] =
    notification.useNotification();
  const { control, handleSubmit, getValues, formState } = useForm<Schema>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });
  const { data: mastersData, loading: mastersLoading } = useMastersQuery({
    variables: {
      types: [MasterType.Csat],
    },
    skip: !open,
  });

  const [createCsat, { loading: createCsatLoading }] = useCreateCsatMutation({
    onCompleted: () => {
      notificationApi.success({
        message: "สำเร็จ",
        description: "ทำรายการสำเร็จแล้ว",
        duration: 3,
      });
      onCancel();
    },
    onError: (error) => {
      notificationApi.error({
        message: "เกิดข้อผิดพลาด",
        description: error.message,
        duration: 3,
      });
    },
    refetchQueries: [
      {
        query: TaskDocument,
        variables: { id: taskDetail?.taskId },
      },
    ],
  });

  const masters = useMemo(() => mastersData?.masters || [], [mastersData]);

  const onSubmit = async (values: Schema) => {
    await createCsat({
      variables: {
        taskDetailId: taskDetail?.id ?? "",
        csatComment: values.CSATComment,
        createCsatInput: values.evaluation.map((item) => ({
          taskId: taskDetail?.taskId ?? "",
          taskDetailId: taskDetail?.id ?? "",
          questionId: item.questionId,
          score: item.score,
          comment: values.CSATComment,
        })),
      },
    });
  };

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
    <>
      {notificationContextHolder}
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
        confirmLoading={createCsatLoading}
        destroyOnHidden
      >
        <Skeleton loading={mastersLoading}>
          <Form
            layout="horizontal"
            preserve={false}
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
          >
            {fields.map((field, index) => (
              <Controller
                key={field.id}
                control={control}
                name={`evaluation.${index}.score`}
                render={({ field }) => (
                  <Form.Item
                    label={getValues(`evaluation.${index}.label`)}
                    required={false}
                    validateStatus={
                      formState.errors.evaluation?.[index]?.score
                        ? "error"
                        : undefined
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
              render={({ field }) => (
                <Form.Item
                  label="ชมเชย/ข้อเสนอแนะ"
                  name="CSATComment"
                  required={false}
                  validateStatus={
                    formState.errors.CSATComment ? "error" : undefined
                  }
                  help={formState.errors.CSATComment?.message}
                >
                  <Input.TextArea
                    rows={4}
                    {...field}
                    value={field.value ?? ""}
                  />
                </Form.Item>
              )}
            />
          </Form>
        </Skeleton>
      </CustomModal>
    </>
  );
};
