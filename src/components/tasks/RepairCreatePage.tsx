"use client";

import { LayoutWithBreadcrumb } from "@/components/layout/LayoutWithBreadcrumb";
import {
  useProjectsQuery,
  useUnitsQuery,
} from "@/gql/generated/project.generated";
import { faSave } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Flex,
  Form,
  Input,
  Row,
  Select,
  Typography,
} from "antd";
import { useMemo } from "react";

const { Title } = Typography;

export const RepairCreatePage = () => {
  const [form] = Form.useForm();
  const projectId = Form.useWatch("projectId", form);

  const { data: projects, loading: projectsLoading } = useProjectsQuery();
  const { data: units, loading: unitsLoading } = useUnitsQuery({
    variables: {
      projectId,
    },
    skip: !projectId,
  });

  const projectsOptions = useMemo(() => {
    return projects?.projects.map((project) => ({
      label: `${project.id} - ${project.nameTh}`,
      value: project.id,
    }));
  }, [projects]);

  const unitsOptions = useMemo(() => {
    return units?.units.map((unit) => ({
      label: `ยูนิต ${unit.unitNumber} บ้านเลขที่ ${unit.houseNumber}`,
      value: unit.id,
    }));
  }, [units]);

  return (
    <LayoutWithBreadcrumb>
      <Flex vertical gap={16}>
        <Flex justify="center">
          <Title level={3}>เพิ่มงานแจ้งซ่อม</Title>
        </Flex>
        <Form form={form} layout="inline" labelCol={{ span: 8 }}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Divider orientation="left">ข้อมูลผู้แจ้งซ่อม</Divider>
            </Col>
            <Col span={12}>
              <Form.Item
                label="โครงการ"
                name="projectId"
                rules={[{ required: true, message: "กรุณาเลือกโครงการ" }]}
              >
                <Select
                  loading={projectsLoading}
                  options={projectsOptions}
                  placeholder="เลือกโครงการ"
                  allowClear
                  showSearch
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="เลขยูนิต"
                name="unitId"
                rules={[{ required: true, message: "กรุณาเลือกเลขยูนิต" }]}
              >
                <Select
                  loading={unitsLoading}
                  options={unitsOptions}
                  placeholder="เลือกหน่วย"
                  allowClear
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="ชื่อ-นามสกุล"
                name="customerName"
                rules={[{ required: true, message: "กรุณากรอกชื่อ-นามสกุล" }]}
              >
                <Input placeholder="ชื่อ-นามสกุล" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="เบอร์โทรผู้แจ้งซ่อม"
                name="customerPhone"
                rules={[
                  { required: true, message: "กรุณากรอกเบอร์โทรผู้แจ้งซ่อม" },
                ]}
              >
                <Input placeholder="เบอร์โทรผู้แจ้งซ่อม" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="วันที่เข้าตรวจสอบ"
                name="checkInDate"
                rules={[
                  { required: true, message: "กรุณากรอกวันที่เข้าตรวจสอบ" },
                ]}
              >
                <DatePicker
                  placeholder="วันที่เข้าตรวจสอบ"
                  format="YYYY-MM-DD"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="แจ้งผ่านช่องทาง"
                name="source"
                rules={[{ required: true, message: "กรุณาเลือกช่องทาง" }]}
              >
                <Select options={[]} placeholder="เลือกช่องทาง" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="ช่วงเวลา"
                name="checkInRangeTime"
                rules={[{ required: true, message: "กรุณาเลือกช่วงเวลา" }]}
              >
                <Select options={[]} placeholder="เลือกช่วงเวลา" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Divider orientation="left">รายการแจ้งซ่อม</Divider>
            </Col>
            <Col span={24}>
              <Flex justify="center">
                <Form.Item>
                  <Button
                    htmlType="submit"
                    variant="solid"
                    color="primary"
                    icon={<FontAwesomeIcon icon={faSave} />}
                  >
                    บันทึกข้อมูล
                  </Button>
                </Form.Item>
              </Flex>
            </Col>
          </Row>
        </Form>
      </Flex>
    </LayoutWithBreadcrumb>
  );
};
