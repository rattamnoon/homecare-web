import { CustomModal } from "@/components/common/CustomModal";
import { MasterType, TaskStatus } from "@/gql/generated/graphql";
import { useMastersQuery } from "@/gql/generated/master.generated";
import { useTaskOptionsQuery } from "@/gql/generated/option.generated";
import { TaskDetailFragment } from "@/gql/generated/tasks.generated";
import { useAllActiveUsersQuery } from "@/gql/generated/user.generated";
import { faSave } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Col,
  DatePicker,
  Form,
  InputNumber,
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
  const [form] = Form.useForm();
  const masterId = Form.useWatch("masterId", form);
  const childId = Form.useWatch("childId", form);
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
      .filter((master) => master.id === masterId)
      .map((master) => master.children)
      .flat()
      .map((child) => ({
        label: child.nameTh,
        value: child.id,
      }));
  }, [mastersData, masterId]);

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
    if (childId) {
      const child = mastersData?.masters
        .filter((master) => master.id === masterId)
        .flatMap((master) => master.children)
        .find((child) => child.id === childId);

      if (child) {
        form.setFieldsValue({
          SLA: child.SLA1H,
        });
      }
    }

    if (taskDetail?.task?.checkInDate && taskDetail?.task?.checkInRangeTime) {
      form.setFieldsValue({
        homecareInDate: dayjs(taskDetail?.task?.checkInDate),
        homecareRangeTime: taskDetail?.task?.checkInRangeTime.id,
      });
    }

    if (taskDetail?.homecareId) {
      form.setFieldsValue({
        homecareId: taskDetail?.homecareId,
      });
    }

    if (taskDetail?.slaId && taskDetail?.sla?.parent) {
      form.setFieldsValue({
        masterId: taskDetail?.sla?.parent?.id,
        childId: taskDetail?.slaId,
      });
    }
  }, [childId, form, mastersData, masterId, taskDetail]);

  return (
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
    >
      <Skeleton
        active
        loading={mastersLoading || optionsLoading || usersLoading}
      >
        <Form
          form={form}
          labelCol={{ span: 8 }}
          onFinish={(values) => {
            const input = {
              id: taskDetail?.id,
              slaId: values.masterId,
              status: TaskStatus.Open,
              homecareId: values.homecareId,
              homecareStatus: TaskStatus.Open,
              homecareInDate: values.homecareInDate,
              homecareRangeTime: values.homecareRangeTime,
            };
          }}
        >
          <Row gutter={[8, 8]}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="ประเภทหลัก"
                name="masterId"
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
                name="childId"
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
                rules={[{ required: true, message: "กรุณาเลือกผู้รับผิดชอบ" }]}
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
  );
};
