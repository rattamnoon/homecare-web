import { CustomModal } from "@/components/common/CustomModal";
import { MasterType } from "@/gql/generated/graphql";
import { useMastersQuery } from "@/gql/generated/master.generated";
import { useTaskOptionsQuery } from "@/gql/generated/option.generated";
import { TaskDetailFragment } from "@/gql/generated/tasks.generated";
import { faSave } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, DatePicker, Form, InputNumber, Row, Select } from "antd";
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
  }, [childId, form, mastersData, masterId]);

  return (
    <CustomModal
      title="จ่ายงาน"
      open={open}
      onCancel={onCancel}
      okText="บันทึก"
      cancelText="ยกเลิก"
      onOk={() => {}}
      okButtonProps={{
        icon: <FontAwesomeIcon icon={faSave} />,
      }}
      width={800}
    >
      <Form form={form} labelCol={{ span: 8 }}>
        <Row gutter={[8, 8]}>
          <Col xs={24} sm={12}>
            <Form.Item label="ประเภทหลัก" name="masterId">
              <Select placeholder="เลือกประเภทหลัก" options={slaOptions} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="ประเภทย่อย" name="childId">
              <Select placeholder="เลือกประเภทย่อย" options={slaChildOptions} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="ผู้รับผิดชอบ" name="employeeId">
              <Select placeholder="เลือกผู้รับผิดชอบ" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="SLA" name="SLA">
              <InputNumber variant="borderless" addonAfter="ชั่วโมง" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="วันที่เข้าตรวจสอบ" name="checkInDate">
              <DatePicker
                placeholder="เลือกวันที่เข้าตรวจสอบ"
                format="DD/MM/YYYY"
                style={{ width: "100%" }}
                disabledDate={(current) => {
                  return (
                    current && current < dayjs().subtract(1, "day").endOf("day")
                  );
                }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="เวลาเข้าตรวจสอบ" name="checkInTime">
              <Select
                placeholder="เลือกเวลาเข้าตรวจสอบ"
                options={timeOptions}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </CustomModal>
  );
};
