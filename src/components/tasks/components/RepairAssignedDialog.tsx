import { CustomModal } from "@/components/common/CustomModal";
import {
  MasterType,
  TaskStatus,
  UpdateTaskDetailInput,
} from "@/gql/generated/graphql";
import { useMastersQuery } from "@/gql/generated/master.generated";
import { useTaskOptionsQuery } from "@/gql/generated/option.generated";
import {
  TaskDetailFragment,
  TaskDocument,
  useUpdateTaskDetailMutation,
} from "@/gql/generated/tasks.generated";
import { useAllActiveUsersQuery } from "@/gql/generated/user.generated";
import { faSave } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Col,
  DatePicker,
  Form,
  InputNumber,
  notification,
  Row,
  Select,
  Skeleton,
} from "antd";
import dayjs from "dayjs";
import { useEffect, useMemo } from "react";

interface RepairAssignedDialogProps {
  open: boolean;
  onCancel: () => void;
  taskDetail: TaskDetailFragment | null;
}

export const RepairAssignedDialog = ({
  open,
  onCancel,
  taskDetail,
}: RepairAssignedDialogProps) => {
  const [notificationApi, notificationContextHolder] =
    notification.useNotification();
  const [form] = Form.useForm();
  const parentId = Form.useWatch("parentId", form);
  const slaId = Form.useWatch("slaId", form);
  const { data: mastersData, loading: mastersLoading } = useMastersQuery({
    variables: {
      types: [MasterType.Sla],
    },
    skip: !open,
  });
  const { data: optionsData, loading: optionsLoading } = useTaskOptionsQuery({
    skip: !open,
  });
  const { data: usersData, loading: usersLoading } = useAllActiveUsersQuery({
    skip: !open,
  });

  const [updateTaskDetail, { loading: updateTaskDetailLoading }] =
    useUpdateTaskDetailMutation({
      onCompleted: () => {
        notificationApi.success({
          message: "สำเร็จ !!",
          description: "บันทึกข้อมูลเรียบร้อย",
          duration: 3,
        });
        onCancel();
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
          variables: {
            id: taskDetail?.taskId ?? "",
          },
        },
      ],
    });

  const slaOptions = useMemo(() => {
    return mastersData?.masters
      .filter((master) => master.children.length > 0)
      .map((master) => ({
        label: master.nameTh,
        value: master.id,
      }));
  }, [mastersData]);

  const slaChildOptions = useMemo(() => {
    return mastersData?.masters
      .filter((master) => master.id === parentId)
      .map((master) => master.children)
      .flat()
      .map((child) => ({
        label: child.nameTh,
        value: child.id,
      }));
  }, [mastersData, parentId]);

  const timeOptions = useMemo(() => {
    return optionsData?.rangeTimes.map((time) => ({
      label: time.nameTh,
      value: time.id,
    }));
  }, [optionsData]);

  const userOptions = useMemo(() => {
    return usersData?.allActiveUsers.map((user) => ({
      label: user.employeeId + " - " + user.firstName + " " + user.lastName,
      value: user.id,
    }));
  }, [usersData]);

  useEffect(() => {
    if (slaId) {
      const child = mastersData?.masters
        .filter((master) => master.id === parentId)
        .flatMap((master) => master.children)
        .find((child) => child.id === slaId);

      if (child) {
        form.setFieldsValue({
          SLA: child.SLA1H,
        });
      }
    }
  }, [slaId, form, mastersData, parentId]);

  const homecareInDate = useMemo(() => {
    if (taskDetail?.homecareInDate) {
      return dayjs(taskDetail?.homecareInDate);
    }

    if (taskDetail?.task?.checkInDate) {
      return dayjs(taskDetail?.task?.checkInDate);
    }
  }, [taskDetail]);

  const homecareRangeTime = useMemo(() => {
    if (taskDetail?.homecareInRangeTime) {
      return taskDetail?.homecareInRangeTime.id;
    }

    if (taskDetail?.task?.checkInRangeTime) {
      return taskDetail?.task?.checkInRangeTime.id;
    }
  }, [taskDetail]);

  return (
    <>
      {notificationContextHolder}
      <CustomModal
        title="จ่ายงาน"
        open={open}
        onCancel={onCancel}
        okText="บันทึก"
        cancelText="ยกเลิก"
        onOk={() => {
          form.submit();
        }}
        okButtonProps={{
          icon: <FontAwesomeIcon icon={faSave} />,
        }}
        width={800}
        confirmLoading={updateTaskDetailLoading}
        destroyOnHidden
      >
        <Skeleton
          active
          loading={mastersLoading || optionsLoading || usersLoading}
        >
          <Form
            form={form}
            preserve={false}
            layout="vertical"
            initialValues={{
              parentId: taskDetail?.sla?.parent?.id,
              slaId: taskDetail?.slaId,
              homecareId: taskDetail?.homecareId,
              homecareInDate: homecareInDate,
              homecareRangeTime: homecareRangeTime,
            }}
            onFinish={async (values) => {
              const updateTaskDetailInput: UpdateTaskDetailInput = {
                id: taskDetail?.id ?? "",
                slaId: values.slaId,
                priority: taskDetail?.priority?.id,
                status: TaskStatus.Open,
                homecareId: values.homecareId,
                homecareStatus: TaskStatus.Open,
                homecareInDate: values.homecareInDate
                  ? dayjs(values.homecareInDate).startOf("day").toDate()
                  : undefined,
                homecareRangeTime: values.homecareRangeTime
                  ? values.homecareRangeTime
                  : undefined,
              };

              await updateTaskDetail({
                variables: { updateTaskDetailInput },
              });
            }}
          >
            <Row gutter={[8, 8]}>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="ประเภทหลัก"
                  name="parentId"
                  required={false}
                  rules={[{ required: true, message: "กรุณาเลือกประเภทหลัก" }]}
                >
                  <Select
                    placeholder="เลือกประเภทหลัก"
                    options={slaOptions}
                    loading={mastersLoading}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="ประเภทย่อย"
                  name="slaId"
                  required={false}
                  rules={[{ required: true, message: "กรุณาเลือกประเภทย่อย" }]}
                >
                  <Select
                    placeholder="เลือกประเภทย่อย"
                    options={slaChildOptions}
                    loading={mastersLoading}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="ผู้รับผิดชอบ"
                  name="homecareId"
                  required={false}
                  rules={[
                    { required: true, message: "กรุณาเลือกผู้รับผิดชอบ" },
                  ]}
                >
                  <Select
                    showSearch
                    optionFilterProp="label"
                    placeholder="เลือกผู้รับผิดชอบ"
                    options={userOptions}
                    loading={usersLoading}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label="SLA" name="SLA" required={false}>
                  <InputNumber
                    variant="borderless"
                    addonAfter="ชั่วโมง"
                    disabled
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="วันที่เข้าตรวจสอบ"
                  name="homecareInDate"
                  required={false}
                  rules={[
                    {
                      required: true,
                      message: "กรุณากรอกวันที่เข้าตรวจสอบ",
                    },
                  ]}
                >
                  <DatePicker
                    placeholder="เลือกวันที่เข้าตรวจสอบ"
                    format="DD/MM/YYYY"
                    style={{ width: "100%" }}
                    disabledDate={(current) => {
                      return (
                        current &&
                        current < dayjs().subtract(1, "day").endOf("day")
                      );
                    }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="เวลาเข้าตรวจสอบ"
                  name="homecareRangeTime"
                  required={false}
                  rules={[
                    { required: true, message: "กรุณาเลือกเวลาเข้าตรวจสอบ" },
                  ]}
                >
                  <Select
                    placeholder="เลือกเวลาเข้าตรวจสอบ"
                    options={timeOptions}
                    loading={optionsLoading}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Skeleton>
      </CustomModal>
    </>
  );
};
