"use client";

import { LayoutWithBreadcrumb } from "@/components/layout/LayoutWithBreadcrumb";
import { useTaskQuery } from "@/gql/generated/tasks.generated";
import {
  faChevronDown,
  faEdit,
  faFaceSmile,
  faHouseCircleCheck,
  faImageLandscape,
  faPlus,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Collapse,
  Descriptions,
  Divider,
  Flex,
  Result,
  Skeleton,
  Space,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import { useMemo } from "react";

const { Title, Text } = Typography;

export const RepairDetailPage = () => {
  const params = useParams();
  const taskId = params.id as string;

  const { data, loading, error } = useTaskQuery({
    variables: { id: taskId },
    skip: !taskId,
  });

  const task = useMemo(() => data?.task, [data]);
  const taskDetails = useMemo(() => task?.details || [], [task]);

  return (
    <LayoutWithBreadcrumb
      showBackButton
      breadcrumb={[
        {
          title: loading ? (
            <Skeleton.Input size="small" active />
          ) : (
            task?.code ?? ""
          ),
        },
      ]}
    >
      {error ? (
        <Result
          status="error"
          title="เกิดข้อผิดพลาด"
          subTitle={error.message}
        />
      ) : (
        <>
          <Skeleton loading={loading} active paragraph={{ rows: 6 }}>
            <Title level={5}>รายละเอียดงานแจ้งซ่อม</Title>
            <Descriptions size="small">
              <Descriptions.Item label="รหัสงาน" span={3}>
                {task?.code}
              </Descriptions.Item>
              <Descriptions.Item label="โครงการ">
                {task?.project?.nameTh}
              </Descriptions.Item>
              <Descriptions.Item label="ห้อง (เลขที่ห้อง)" span={3}>
                {task?.unit?.unitNumber}
              </Descriptions.Item>
              <Descriptions.Item label="สถานะ" span={3}>
                <Tag color={task?.status?.color}>{task?.status?.nameEn}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="ชื่อลูกค้า">
                {task?.customerName}
              </Descriptions.Item>
              <Descriptions.Item label="เบอร์โทรลูกค้า">
                {task?.customerPhone}
              </Descriptions.Item>
              <Descriptions.Item label="ช่องทาง" span={3}>
                <Tag
                  {...(task?.source?.color
                    ? { color: task?.source?.color }
                    : {})}
                >
                  {task?.source?.nameTh}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="วันที่นัดตรวจสอบ">
                {dayjs(task?.checkInDate).format("DD/MM/YYYY")}
              </Descriptions.Item>
              <Descriptions.Item label="ช่วงเวลานัดตรวจสอบ" span={3}>
                {task?.checkInRangeTime?.nameTh}
              </Descriptions.Item>
              <Descriptions.Item
                label="วันหมดประกัน"
                styles={{
                  content: {
                    color: dayjs(task?.insuranceDate).isBefore(dayjs())
                      ? "red"
                      : "green",
                    fontWeight: "bold",
                    textDecoration: dayjs(task?.insuranceDate).isBefore(dayjs())
                      ? "line-through"
                      : "none",
                  },
                }}
              >
                {dayjs(task?.insuranceDate).format("DD/MM/YYYY")}
              </Descriptions.Item>
              <Descriptions.Item label="วันที่โอนกรรมสิทธิ์" span={3}>
                {dayjs(task?.transferDate).format("DD/MM/YYYY")}
              </Descriptions.Item>
              <Descriptions.Item label="วันที่สร้าง">
                {dayjs(task?.createdAt).format("DD/MM/YYYY HH:mm")}
              </Descriptions.Item>
              <Descriptions.Item label="วันที่อัพเดต">
                {dayjs(task?.updatedAt).format("DD/MM/YYYY HH:mm")}
              </Descriptions.Item>
            </Descriptions>
          </Skeleton>
          <Divider />
          <Title level={5}>รายการงานแจ้งซ่อม</Title>
          <Skeleton loading={loading} active paragraph={{ rows: 6 }}>
            <Collapse
              //   accordion
              ghost
              expandIconPosition="start"
              expandIcon={(panelProps) => (
                <FontAwesomeIcon
                  icon={faChevronDown}
                  style={{
                    transform: panelProps.isActive
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                  }}
                />
              )}
              bordered={false}
              items={taskDetails.map((detail) => ({
                key: detail.id,
                label: <Text strong>{detail.code}</Text>,
                children: (
                  <Flex vertical gap={8}>
                    <Descriptions size="small" bordered>
                      <Descriptions.Item label="ประเภทหลัก">
                        {detail.category?.nameTh}
                      </Descriptions.Item>
                      <Descriptions.Item label="ประเภทย่อย">
                        {detail.subCategory?.nameTh}
                      </Descriptions.Item>
                      <Descriptions.Item label="สถานะประเมิน">
                        <Tag color="default" bordered={false}>
                          ยังไม่ได้ประเมิน
                        </Tag>
                      </Descriptions.Item>
                      <Descriptions.Item label="รูปภาพ" span={3}>
                        <Tooltip
                          title={
                            detail.images?.length > 0
                              ? "มีรูปภาพ"
                              : "ไม่มีรูปภาพ"
                          }
                        >
                          <FontAwesomeIcon
                            icon={faImageLandscape}
                            size="lg"
                            color={detail.images?.length > 0 ? "green" : "gray"}
                          />
                        </Tooltip>
                      </Descriptions.Item>
                      <Descriptions.Item label="รายละเอียด">
                        {detail.description}
                      </Descriptions.Item>
                    </Descriptions>
                    <Divider plain orientation="left">
                      ตรวจสอบหน้างาน
                    </Divider>
                    <Descriptions size="small" bordered>
                      <Descriptions.Item label="ผู้รับผิดชอบ" span={3}>
                        {detail.homecare?.firstName} {detail.homecare?.lastName}
                      </Descriptions.Item>
                      <Descriptions.Item label="วันและเวลาที่เข้าตรวจสอบ">
                        {dayjs(detail.homecareInDate).format("DD/MM/YYYY")}{" "}
                        {detail.homecareInRangeTime?.nameTh}
                      </Descriptions.Item>
                      <Descriptions.Item label="วันที่และเวลาเข้าแก้ไขงาน">
                        {detail.inProgressDate ? (
                          `${dayjs(detail.inProgressDate).format(
                            "DD/MM/YYYY"
                          )} ${dayjs(detail.inProgressDate).format("HH:mm")} น.`
                        ) : (
                          <Tag color="default" bordered={false}>
                            ยังไม่ได้เข้าแก้ไขงาน
                          </Tag>
                        )}
                      </Descriptions.Item>
                      <Descriptions.Item label="วันที่และเวลาจบงาน">
                        {detail.finishDate ? (
                          `${dayjs(detail.finishDate).format(
                            "DD/MM/YYYY"
                          )} ${dayjs(detail.finishDate).format("HH:mm")} น.`
                        ) : (
                          <Tag color="default" bordered={false}>
                            ยังไม่ได้จบงาน
                          </Tag>
                        )}
                      </Descriptions.Item>
                      <Descriptions.Item label="รูปภาพ" span={3}>
                        <Tooltip
                          title={
                            detail.images?.length > 0
                              ? "มีรูปภาพ"
                              : "ไม่มีรูปภาพ"
                          }
                        >
                          <FontAwesomeIcon
                            icon={faImageLandscape}
                            size="lg"
                            color={detail.images?.length > 0 ? "green" : "gray"}
                          />
                        </Tooltip>
                      </Descriptions.Item>
                      <Descriptions.Item label="หมายเหตุ" span={3}>
                        {detail.homecareComment}
                      </Descriptions.Item>
                      <Descriptions.Item label="เหตุผล" span={3}>
                        <Space.Compact>
                          <Button
                            size="small"
                            variant="outlined"
                            color="primary"
                            onClick={() => {
                              console.log("misscall");
                            }}
                          >
                            ติดต่อลูกค้าไม่ได้
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            color="primary"
                            onClick={() => {
                              console.log("waiting-construction");
                            }}
                          >
                            ของไม่ครบ
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            color="yellow"
                            onClick={() => {
                              console.log("logs");
                            }}
                          >
                            Logs
                          </Button>
                        </Space.Compact>
                      </Descriptions.Item>
                    </Descriptions>
                    <Divider plain orientation="left">
                      รายการ
                    </Divider>
                    <Flex vertical gap={8}>
                      <Flex justify="space-between" gap={8}>
                        <Space>
                          <Button
                            variant="solid"
                            color="blue"
                            icon={<FontAwesomeIcon icon={faPlus} />}
                          >
                            จ่ายงาน
                          </Button>
                          <Button
                            variant="solid"
                            color="green"
                            icon={<FontAwesomeIcon icon={faHouseCircleCheck} />}
                          >
                            Finish
                          </Button>
                          <Button
                            variant="solid"
                            color="cyan"
                            icon={<FontAwesomeIcon icon={faFaceSmile} />}
                          >
                            Piority
                          </Button>
                          <Button
                            variant="solid"
                            color="orange"
                            icon={<FontAwesomeIcon icon={faEdit} />}
                          >
                            แก้ไขข้อมูล
                          </Button>
                        </Space>
                      </Flex>
                      <Descriptions size="small" bordered>
                        <Descriptions.Item label="ประเภทหลัก">
                          {detail.sla?.parent?.nameTh}
                        </Descriptions.Item>
                        <Descriptions.Item label="ประเภทย่อย">
                          {detail.sla?.nameTh}
                        </Descriptions.Item>
                        <Descriptions.Item label="SLA">
                          {detail.sla?.SLA1H} ชั่วโมง หรือ {detail.sla?.SLA1D}{" "}
                          วัน
                        </Descriptions.Item>
                        <Descriptions.Item label="ผู้รับผิดชอบ" span={3}>
                          {detail.homecare?.firstName}{" "}
                          {detail.homecare?.lastName}
                        </Descriptions.Item>
                        <Descriptions.Item label="ผู้รับเหมา" span={3}>
                          {detail.contractor?.nameTh}
                        </Descriptions.Item>
                        <Descriptions.Item label="วันที่และเวลาเข้าตรวจสอบ">
                          {dayjs(detail.homecareInDate).format("DD/MM/YYYY")}
                          {detail.homecareInRangeTime?.nameTh}
                        </Descriptions.Item>
                        <Descriptions.Item
                          label="วันที่และเวลาเข้าซ่อม"
                          span={3}
                        >
                          {dayjs(detail.homecareInDate).format("DD/MM/YYYY")}
                          {detail.homecareInRangeTime?.nameTh}
                        </Descriptions.Item>
                        <Descriptions.Item label="สถานะเคส">
                          <Tag color={detail.status?.color}>
                            {detail.status?.nameEn}
                          </Tag>
                        </Descriptions.Item>
                        <Descriptions.Item label="สถานะผู้รับผิดชอบ" span={3}>
                          <Tag color={detail.homecareStatus?.color}>
                            {detail.homecareStatus?.nameEn}
                          </Tag>
                        </Descriptions.Item>
                        <Descriptions.Item label="รูปขั้นตอน SOP">
                          {""}
                        </Descriptions.Item>
                      </Descriptions>
                    </Flex>
                  </Flex>
                ),
              }))}
            />
          </Skeleton>
        </>
      )}
    </LayoutWithBreadcrumb>
  );
};
