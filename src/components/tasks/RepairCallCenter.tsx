"use client";

import { Routes } from "@/config/routes";
import { TaskStatus, TaskType } from "@/gql/generated/graphql";
import {
  useProjectsQuery,
  useUnitsQuery,
} from "@/gql/generated/project.generated";
import { useTaskDetailsQuery } from "@/gql/generated/tasks.generated";
import { useCreateSearchParams } from "@/hooks/useCreateSearchParams";
import { getTablePaginationProps } from "@/utils/utils";
import {
  faClose,
  faEllipsis,
  faPhoneArrowUp,
  faPlus,
  faRotateLeft,
  faStar,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Col,
  DatePicker,
  Dropdown,
  Flex,
  Form,
  Input,
  Row,
  Select,
  SelectProps,
  Table,
  Tag,
  theme,
  Typography,
} from "antd";
import dayjs from "dayjs";
import { uniqBy } from "lodash-es";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useCallback, useMemo } from "react";
import { LayoutWithBreadcrumb } from "../layout/LayoutWithBreadcrumb";

const { Title } = Typography;

const useRepairCallCenterFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { createQueryString } = useCreateSearchParams();
  const searchText = searchParams.get("searchText") || "";
  const projectId = searchParams.get("projectId") || "";
  const unitIds = ((searchParams.get("unitIds") as string) || "")
    .split(",")
    .filter(Boolean);
  const finishedDate = ((searchParams.get("finishedDate") as string) || "")
    .split(",")
    .filter(Boolean);
  const isCall = searchParams.get("isCall") || "all";
  const currentPage = Number(searchParams.get("currentPage")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;

  const handleSearch = useCallback(
    (key: string, value: string | string[] | number) => {
      const stringValue = Array.isArray(value)
        ? value.join(",")
        : typeof value === "number"
        ? value.toString()
        : value;

      const queryParams = {
        [key]: stringValue,
        ...(key !== "currentPage" && { currentPage: "1" }),
        ...(key !== "pageSize" && { pageSize: "10" }),
      };

      const queryString = createQueryString(queryParams);
      router.push(`${Routes.TasksRepairCallCenter}?${queryString}`, {
        scroll: false,
      });
    },
    [createQueryString, router]
  );

  return {
    searchText,
    projectId,
    unitIds,
    finishedDate,
    currentPage,
    pageSize,
    handleSearch,
    isCall,
  };
};

const RepairCallCenterFilter = () => {
  const router = useRouter();
  const { searchText, projectId, unitIds, finishedDate, handleSearch, isCall } =
    useRepairCallCenterFilter();
  const { data: projectsData, loading: projectsLoading } = useProjectsQuery();
  const { data: unitsData, loading: unitsLoading } = useUnitsQuery({
    variables: {
      projectId,
    },
    skip: !projectId,
  });

  const projectsOptions = useMemo(
    () => uniqBy(projectsData?.projects || [], "id"),
    [projectsData]
  );
  const unitsOptions = useMemo(
    () => uniqBy(unitsData?.units || [], "id"),
    [unitsData]
  );

  const sharedSelectProps: SelectProps = {
    allowClear: true,
    style: { width: "100%" },
    showSearch: true,
    optionFilterProp: "label",
  };

  return (
    <Form layout="horizontal">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Flex justify="space-between">
            <Form.Item
              label="ค้นหา"
              name="searchText"
              colon={false}
              style={{ marginBottom: 0 }}
            >
              <Input
                placeholder="ค้นหาโดยรหัสงาน, ชื่อลูกค้า, เบอร์โทรลูกค้า"
                allowClear
                defaultValue={searchText}
                onChange={(e) => {
                  handleSearch("searchText", e.target.value);
                }}
                style={{ width: 325 }}
              />
            </Form.Item>
            <Button
              variant="solid"
              color="primary"
              icon={<FontAwesomeIcon icon={faPlus} />}
              onClick={() => {
                router.push(Routes.TasksRepairCreate);
              }}
            >
              เพิ่มงานแจ้งซ่อม
            </Button>
          </Flex>
        </Col>
        <Col span={24}>
          <Row gutter={[8, 8]}>
            <Col xs={24} md={6}>
              <Form.Item
                label="โครงการ"
                name="projectId"
                colon={false}
                style={{ marginBottom: 0 }}
              >
                <Select
                  {...sharedSelectProps}
                  placeholder="โครงการ"
                  loading={projectsLoading}
                  defaultValue={projectId ? projectId : undefined}
                  onChange={(value) => {
                    handleSearch("projectId", value);
                  }}
                  options={projectsOptions?.map((project) => ({
                    label: `${project.id} - ${project.nameTh}`,
                    value: project.id,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item
                label="ห้อง"
                name="unitIds"
                colon={false}
                style={{ marginBottom: 0 }}
              >
                <Select
                  {...sharedSelectProps}
                  mode="multiple"
                  placeholder="ห้อง"
                  loading={unitsLoading}
                  defaultValue={unitIds}
                  onChange={(value) => {
                    handleSearch("unitIds", value.join(","));
                  }}
                  options={unitsOptions?.map((unit) => ({
                    label: unit.unitNumber,
                    value: unit.id,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item
                label="วันที่เสร็จงาน"
                name="finishedDate"
                colon={false}
                style={{ marginBottom: 0 }}
              >
                <DatePicker.RangePicker
                  placeholder={["เริ่มต้น", "สิ้นสุด"]}
                  allowClear
                  format="YYYY-MM-DD"
                  defaultValue={[
                    finishedDate[0]
                      ? dayjs(finishedDate[0], "YYYY-MM-DD")
                      : null,
                    finishedDate[1]
                      ? dayjs(finishedDate[1], "YYYY-MM-DD")
                      : null,
                  ]}
                  onChange={(value) => {
                    if (value) {
                      handleSearch(
                        "finishedDate",
                        value
                          .map((date) => date?.format("YYYY-MM-DD"))
                          .filter(Boolean)
                          .join(",")
                      );
                    } else {
                      handleSearch("checkInDate", "");
                    }
                  }}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item
                label="การโทรที่ถูกบันทึกไว้"
                name="isCall"
                colon={false}
                style={{ marginBottom: 0 }}
              >
                <Select
                  {...sharedSelectProps}
                  placeholder="การโทรที่ถูกบันทึกไว้"
                  allowClear={false}
                  defaultValue={isCall}
                  onChange={(value) => {
                    handleSearch("isCall", value);
                  }}
                  options={[
                    { label: "ทั้งหมด", value: "all" },
                    { label: "มี", value: "has" },
                    { label: "ไม่มี", value: "no" },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

export const RepairCallCenter = () => {
  const router = useRouter();
  const {
    searchText,
    projectId,
    unitIds,
    finishedDate,
    currentPage,
    pageSize,
    handleSearch,
    isCall,
  } = useRepairCallCenterFilter();
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const { data, loading } = useTaskDetailsQuery({
    variables: {
      type: TaskType.Repair,
      statuses: [TaskStatus.Finished],
      isCsat: false,
      page: currentPage,
      limit: pageSize,
      searchText,
      projectId,
      unitIds,
      finishedDate: finishedDate.map((date) =>
        dayjs(date, "YYYY-MM-DD").toDate()
      ),
      isCall: isCall === "all" ? undefined : isCall === "has" ? true : false,
    },
  });

  const tasksDetails = useMemo(() => data?.taskDetails, [data]);
  const dataSource = useMemo(() => tasksDetails?.items, [tasksDetails]);
  const meta = useMemo(() => tasksDetails?.meta, [tasksDetails]);

  return (
    <LayoutWithBreadcrumb>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <RepairCallCenterFilter />
        </Col>
        <Col span={24}>
          <Table
            rowKey="id"
            loading={loading}
            dataSource={dataSource}
            scroll={{ x: "max-content" }}
            pagination={{
              position: ["bottomCenter"],
              ...getTablePaginationProps(meta),
              onChange: (page) => {
                handleSearch("currentPage", page);
              },
              showQuickJumper: true,
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "30", "40", "50"],
              onShowSizeChange: (page, size) => {
                handleSearch("pageSize", size);
              },
            }}
            columns={[
              {
                title: "Action",
                dataIndex: "action",
                key: "action",
                align: "center",
                width: 100,
                fixed: "left",
                render: (_, record) => {
                  return (
                    <Dropdown
                      trigger={["click"]}
                      menu={{
                        items: [
                          {
                            label: "ประเมิน",
                            key: "evaluate",
                            icon: <FontAwesomeIcon icon={faStar} />,
                          },
                          {
                            label: "ปิดเศส",
                            key: "close",
                            icon: <FontAwesomeIcon icon={faClose} />,
                          },
                          {
                            label: "รายละเอียดการโทร",
                            key: "call",
                            icon: <FontAwesomeIcon icon={faPhoneArrowUp} />,
                          },
                          {
                            label: "Re-inprogress",
                            key: "re-inprogress",
                            icon: <FontAwesomeIcon icon={faRotateLeft} />,
                          },
                        ],
                      }}
                    >
                      <Button
                        type="link"
                        size="small"
                        icon={<FontAwesomeIcon icon={faEllipsis} />}
                      />
                    </Dropdown>
                  );
                },
              },
              {
                title: "รหัสงาน",
                dataIndex: "code",
                key: "code",
                align: "center",
                width: 200,
                onCell: () => ({
                  style: {
                    cursor: "pointer",
                    textAlign: "center",
                    fontWeight: "bold",
                    color: colorPrimary,
                  },
                }),
              },
              {
                title: "โครงการ",
                dataIndex: "projectName",
                key: "projectName",
                align: "center",
                width: 300,
                render: (_, record) => {
                  return record.task.project
                    ? `${record.task.project.id} - ${record.task.project.nameTh}`
                    : "-";
                },
                onCell: () => ({
                  style: {
                    textAlign: "left",
                  },
                }),
              },
              {
                title: "ห้อง (เลขที่ห้อง)",
                dataIndex: "unitNumber",
                key: "unitNumber",
                align: "center",
                width: 200,
                render: (_, record) => {
                  return record.task.unit
                    ? `${record.task.unit.unitNumber} (${record.task.unit.houseNumber})`
                    : "-";
                },
                onCell: () => ({
                  style: {
                    textAlign: "left",
                  },
                }),
              },
              {
                title: "สถานะ",
                dataIndex: "status",
                key: "status",
                align: "center",
                width: 100,
                render: (_, record) => {
                  return record.status ? (
                    <Tag color={record.status.color}>
                      {record.status.nameEn}
                    </Tag>
                  ) : (
                    "-"
                  );
                },
              },
              {
                title: "ชื่อลูกค้า",
                dataIndex: "customerName",
                key: "customerName",
                align: "center",
                width: 200,
                render: (_, record) => {
                  return record.task.customerName;
                },
                onCell: () => ({
                  style: {
                    textAlign: "left",
                  },
                }),
              },
              {
                title: "เบอร์โทรลูกค้า",
                dataIndex: "customerPhone",
                key: "customerPhone",
                align: "center",
                width: 150,
                render: (_, record) => {
                  return record.task.customerPhone;
                },
                onCell: () => ({
                  style: {
                    textAlign: "center",
                  },
                }),
              },
              {
                title: "วันที่เสร็จงาน",
                dataIndex: "finishedDate",
                key: "finishedDate",
                align: "center",
                width: 150,
                render: (_, record) => {
                  return record.finishedDate
                    ? dayjs(record.finishedDate).format("DD/MM/YYYY")
                    : "-";
                },
                onCell: () => ({
                  style: {
                    textAlign: "center",
                  },
                }),
              },
              {
                title: "วันที่นัดตรวจสอบ",
                dataIndex: "checkInDate",
                key: "checkInDate",
                align: "center",
                width: 150,
                render: (_, record) => {
                  return record.task.checkInDate
                    ? dayjs(record.task.checkInDate).format("DD/MM/YYYY")
                    : "-";
                },
              },
              {
                title: "ช่วงเวลานัดตรวจสอบ",
                dataIndex: "checkInRangeTime",
                key: "checkInRangeTime",
                align: "center",
                width: 150,
                render: (_, record) => {
                  return record.task.checkInRangeTime
                    ? record.task.checkInRangeTime.nameTh
                    : "-";
                },
              },
              {
                title: "วันที่สร้าง",
                dataIndex: "createdAt",
                key: "createdAt",
                align: "center",
                width: 150,
                render: (_, record) => {
                  return record.createdAt
                    ? dayjs(record.createdAt).format("DD/MM/YYYY")
                    : "-";
                },
                onCell: () => ({
                  style: {
                    textAlign: "center",
                  },
                }),
              },
              {
                title: "วันที่อัพเดตล่าสุด",
                dataIndex: "updatedAt",
                key: "updatedAt",
                align: "center",
                width: 150,
                render: (_, record) => {
                  return record.updatedAt
                    ? dayjs(record.updatedAt).format("DD/MM/YYYY")
                    : "-";
                },
                onCell: () => ({
                  style: {
                    textAlign: "center",
                  },
                }),
              },
            ]}
          />
        </Col>
      </Row>
    </LayoutWithBreadcrumb>
  );
};
