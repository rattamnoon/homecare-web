import { CustomModal } from "@/components/common/CustomModal";
import { MasterType } from "@/gql/generated/graphql";
import { useMastersQuery } from "@/gql/generated/master.generated";
import { TaskDetailFragment } from "@/gql/generated/tasks.generated";
import { faSave } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Input, Rate, Skeleton, Typography } from "antd";
import { useMemo } from "react";

interface RepairEvaluationDialogProps {
  open: boolean;
  onCancel: () => void;
  taskDetail: TaskDetailFragment | null;
}

const { Text } = Typography;

export const RepairEvaluationDialog = ({
  open,
  onCancel,
  taskDetail,
}: RepairEvaluationDialogProps) => {
  const [form] = Form.useForm();
  const { data: mastersData, loading: mastersLoading } = useMastersQuery({
    variables: {
      types: [MasterType.Csat],
    },
    skip: !open,
  });

  const masters = useMemo(() => mastersData?.masters || [], [mastersData]);

  return (
    <CustomModal
      title="ประเมินงาน"
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
      width={600}
    >
      <Skeleton loading={mastersLoading}>
        <Form
          form={form}
          layout="horizontal"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
          onFinish={() => {
            console.log(form.getFieldsValue());
          }}
        >
          {masters.map((master) => (
            <Form.Item
              key={master.id}
              label={master.nameTh}
              name={`evaluation.${master.id}`}
              required={false}
              rules={[
                { required: true, message: `กรุณาใส่คะแนน ${master.nameTh}` },
              ]}
            >
              <Rate count={5} />
            </Form.Item>
          ))}
          <Form.Item label="ชมเชย/ข้อเสนอแนะ" name="CSATComment">
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Skeleton>
    </CustomModal>
  );
};
