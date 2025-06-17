import { CustomModal } from "@/components/common/CustomModal";
import {
  CreateTaskDetailReportLogInput,
  CreateUploadFileInput,
  TaskStatus,
  UploadFileType,
} from "@/gql/generated/graphql";
import { useTaskOptionsQuery } from "@/gql/generated/option.generated";
import {
  TaskDetailFragment,
  TaskDocument,
  useCreateTaskDetailReportLogMutation,
} from "@/gql/generated/tasks.generated";
import { useFileUpload } from "@/hooks/useFileUpload";
import { faSave, faUpload } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  DatePicker,
  Flex,
  Form,
  Input,
  notification,
  Select,
  Typography,
  Upload,
  UploadFile,
} from "antd";
import dayjs from "dayjs";
import { useMemo } from "react";

interface RepairWaitingConstructionDialogProps {
  open: boolean;
  onCancel: () => void;
  taskDetail: TaskDetailFragment | null;
}

const { Text } = Typography;

// ของไม่ครบ
export const RepairWaitingConstructionDialog = ({
  open,
  onCancel,
  taskDetail,
}: RepairWaitingConstructionDialogProps) => {
  const [notificationApi, notificationContextHolder] =
    notification.useNotification();
  const [form] = Form.useForm();
  const { data: taskOptions } = useTaskOptionsQuery();
  const uploadFile = useFileUpload("file", "other/waiting-construction");

  const [
    createTaskDetailReportLog,
    { loading: createTaskDetailReportLogLoading },
  ] = useCreateTaskDetailReportLogMutation({
    onCompleted: () => {
      notificationApi.success({
        message: "สำเร็จ !!",
        description: "บันทึกข้อมูลเรียบร้อย",
        duration: 3,
      });
      onCancel();
      form.resetFields();
    },
    onError: (error) => {
      notificationApi.error({
        message: "เกิดข้อผิดพลาด !!",
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
          layout="vertical"
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
                type: TaskStatus.WaitingConstruction,
              };

            let createUploadFileInput: CreateUploadFileInput[] = [];

            if (values?.images?.length > 0) {
              createUploadFileInput = values.images.map(
                (image: UploadFile) => ({
                  fileType: UploadFileType.Other,
                  fileId: image.response?.fileId,
                  fileName: image.response?.fileName,
                  fileFolder: image.response?.fileFolder,
                  filePath: image.response?.filePath,
                  fileBucket: image.response?.fileBucket,
                  fileExtension: image.response?.fileExtension,
                })
              );
            }

            await createTaskDetailReportLog({
              variables: {
                createTaskDetailReportLogInput,
                createUploadFileInput,
              },
            });
          }}
        >
          <Form.Item
            label="วันที่ของมาถึง"
            name="callbackDate"
            required={false}
            rules={[{ required: true, message: "กรุณาเลือกวันที่ของมาถึง" }]}
          >
            <DatePicker
              placeholder="เลือกวันที่ของมาถึง"
              format="DD/MM/YYYY"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item label="วันที่และเวลาเข้าซ่อม" required={false}>
            <Flex gap={8}>
              <Form.Item
                name="checkInDate"
                noStyle
                rules={[
                  {
                    required: true,
                    message: "กรุณาเลือกวันที่และเวลาเข้าซ่อม",
                  },
                ]}
              >
                <DatePicker
                  placeholder="เลือกวันที่และเวลาเข้าซ่อม"
                  format="DD/MM/YYYY"
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item
                name="checkInRangeTime"
                noStyle
                rules={[
                  { required: true, message: "กรุณาเลือกช่วงเวลาเข้าซ่อม" },
                ]}
              >
                <Select
                  placeholder="เลือกช่วงเวลาเข้าซ่อม"
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
          <Form.Item
            label="รูปภาพ"
            name="images"
            getValueFromEvent={(event) => {
              if (Array.isArray(event)) {
                return event;
              }

              return event.fileList;
            }}
          >
            <Upload
              {...uploadFile}
              multiple
              listType="picture"
              accept="image/*"
            >
              <Button icon={<FontAwesomeIcon icon={faUpload} />}>
                อัพโหลดรูปภาพ
              </Button>
            </Upload>
          </Form.Item>
        </Form>
      </CustomModal>
    </>
  );
};
