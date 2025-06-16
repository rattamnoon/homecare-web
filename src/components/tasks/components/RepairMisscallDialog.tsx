import { CustomModal } from "@/components/common/CustomModal";
import {
  CreateTaskDetailReportLogInput,
  TaskStatus,
} from "@/gql/generated/graphql";
import { useTaskOptionsQuery } from "@/gql/generated/option.generated";
import {
  TaskDetailFragment,
  TaskDocument,
  useCreateTaskDetailReportLogMutation,
} from "@/gql/generated/tasks.generated";
import { faSave } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  DatePicker,
  Flex,
  Form,
  Input,
  notification,
  Select,
  Typography,
} from "antd";
import dayjs from "dayjs";
import { useMemo } from "react";

interface RepairMisscallDialogProps {
  open: boolean;
  onCancel: () => void;
  taskDetail: TaskDetailFragment | null;
}

const { Text } = Typography;

// ติดต่อลูกค้าไม่ได้
export const RepairMisscallDialog = ({
  open,
  onCancel,
  taskDetail,
}: RepairMisscallDialogProps) => {
  const [notificationApi, notificationContextHolder] =
    notification.useNotification();
  const [form] = Form.useForm();
  const { data: taskOptions } = useTaskOptionsQuery();

  const [
    createTaskDetailReportLog,
    { loading: createTaskDetailReportLogLoading },
  ] = useCreateTaskDetailReportLogMutation({
    onCompleted: () => {
      notificationApi.success({
        message: "สำเร็จ",
        description: "ทำรายการสำเร็จแล้ว",
        duration: 3,
      });
      onCancel();
      form.resetFields();
    },
    onError: (error) => {
      notificationApi.error({
        message: "เกิดข้อผิดพลาด",
        description: error.message,
        duration: 5,
      });
    },
    refetchQueries: [
      {
        query: TaskDocument,
        variables: { id: taskDetail?.taskId },
      },
    ],
  });

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
    <>
      {notificationContextHolder}
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
        confirmLoading={createTaskDetailReportLogLoading}
        destroyOnHidden
      >
        <Form
          form={form}
          layout="horizontal"
          labelCol={{ span: 8 }}
          preserve={false}
          onFinish={async (values) => {
            const createTaskDetailReportLogInput: CreateTaskDetailReportLogInput =
              {
                taskDetailId: taskDetail?.id,
                callbackDate: values.callbackDate
                  ? dayjs(values.callbackDate).startOf("day").toDate()
                  : undefined,
                checkInDate: values.checkInDate
                  ? dayjs(values.checkInDate).startOf("day").toDate()
                  : undefined,
                checkInRangeTime: values.checkInRangeTime,
                remark: values.remark,
                type: TaskStatus.MissedCalled,
              };

            await createTaskDetailReportLog({
              variables: {
                createTaskDetailReportLogInput,
              },
            });
          }}
        >
          <Form.Item
            label="ติดต่อกลับอีกทีวันที่"
            name="callbackDate"
            required={false}
            rules={[
              { required: true, message: "กรุณาเลือกวันที่ติดต่อกลับอีกที" },
            ]}
          >
            <DatePicker
              placeholder="เลือกวันที่ติดต่อกลับอีกที"
              format="DD/MM/YYYY"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item label="วันที่และเวลาเข้าตรวจ" required={false}>
            <Flex gap={8}>
              <Form.Item
                name="checkInDate"
                noStyle
                rules={[
                  {
                    required: true,
                    message: "กรุณาเลือกวันที่และเวลาเข้าตรวจ",
                  },
                ]}
              >
                <DatePicker
                  placeholder="เลือกวันที่และเวลาเข้าตรวจ"
                  format="DD/MM/YYYY"
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item
                name="checkInRangeTime"
                noStyle
                rules={[
                  { required: true, message: "กรุณาเลือกช่วงเวลาเข้าตรวจ" },
                ]}
              >
                <Select
                  placeholder="เลือกช่วงเวลาเข้าตรวจ"
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
    </>
  );
};
