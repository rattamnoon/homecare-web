import { Routes } from "@/config/routes";
import { useTaskOptionsQuery } from "@/gql/generated/option.generated";
import {
  useProjectsQuery,
  useUnitsQuery,
} from "@/gql/generated/project.generated";
import { useTaskStatusesQuery } from "@/gql/generated/tasks.generated";
import { useCreateSearchParams } from "@/hooks/useCreateSearchParams";
import { faPlus } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Col,
  DatePicker,
  Flex,
  Form,
  Input,
  Row,
  Select,
  SelectProps,
  Tooltip,
} from "antd";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useMemo } from "react";

export const useRepairFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { createQueryString } = useCreateSearchParams();
  const searchText = searchParams.get("searchText") as string;
  const statuses = ((searchParams.get("statuses") as string) || "")
    .split(",")
    .filter(Boolean);
  const projectId = searchParams.get("projectId") as string;
  const unitIds = ((searchParams.get("unitIds") as string) || "")
    .split(",")
    .filter(Boolean);
  const sources = ((searchParams.get("sources") as string) || "")
    .split(",")
    .filter(Boolean);
  const checkInDate = ((searchParams.get("checkInDate") as string) || "")
    .split(",")
    .filter(Boolean);
  const currentPage = Number(searchParams.get("currentPage")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;

  const handleSearch = (key: string, value: string | string[] | number) => {
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
    router.push(`${Routes.TasksRepair}?${queryString}`, {
      scroll: false,
    });
  };

  return {
    searchText,
    statuses,
    projectId,
    unitIds,
    sources,
    checkInDate,
    currentPage,
    pageSize,
    handleSearch,
  };
};

export const RepairFilter = () => {
  const router = useRouter();
  const {
    searchText,
    statuses,
    projectId,
    unitIds,
    sources,
    checkInDate,
    handleSearch,
  } = useRepairFilter();
  const { data: statusesData, loading: statusesLoading } =
    useTaskStatusesQuery();
  const { data: projectsData, loading: projectsLoading } = useProjectsQuery();
  const { data: unitsData, loading: unitsLoading } = useUnitsQuery({
    variables: {
      projectId,
    },
    skip: !projectId,
  });
  const { data: optionsData, loading: optionsLoading } = useTaskOptionsQuery();

  console.log({
    sources,
    checkInDate,
  });

  const statusesOptions = useMemo(
    () => statusesData?.taskStatuses || [],
    [statusesData]
  );
  const projectsOptions = useMemo(
    () => projectsData?.projects || [],
    [projectsData]
  );
  const unitsOptions = useMemo(() => unitsData?.units || [], [unitsData]);
  const sourcesOptions = useMemo(
    () => optionsData?.sources || [],
    [optionsData]
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
                placeholder="ค้นหา"
                allowClear
                value={searchText}
                onChange={(e) => {
                  handleSearch("searchText", e.target.value);
                }}
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
                label="สถานะ"
                name="statuses"
                colon={false}
                style={{ marginBottom: 0 }}
              >
                <Select
                  {...sharedSelectProps}
                  mode="multiple"
                  placeholder="สถานะ"
                  loading={statusesLoading}
                  defaultValue={statuses}
                  onChange={(value) => {
                    handleSearch("statuses", value.join(","));
                  }}
                  options={statusesOptions?.map((status) => ({
                    label: status.nameEn,
                    value: status.id,
                  }))}
                  maxTagCount="responsive"
                  maxTagPlaceholder={(omittedValues) => (
                    <Tooltip
                      styles={{ root: { pointerEvents: "none" } }}
                      title={omittedValues.map(({ label }) => label).join(", ")}
                    >
                      <span>+ {omittedValues.length}</span>
                    </Tooltip>
                  )}
                />
              </Form.Item>
            </Col>
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
                  defaultValue={projectId}
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
                label="ช่องทาง"
                name="sources"
                colon={false}
                style={{ marginBottom: 0 }}
              >
                <Select
                  {...sharedSelectProps}
                  mode="multiple"
                  placeholder="ช่องทาง"
                  loading={optionsLoading}
                  defaultValue={sources}
                  onChange={(value) => {
                    handleSearch("sources", value.join(","));
                  }}
                  options={sourcesOptions?.map((source) => ({
                    label: source.nameTh,
                    value: source.id,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item
                label="วันที่นัดตรวจสอบ"
                name="checkInDate"
                colon={false}
                style={{ marginBottom: 0 }}
              >
                <DatePicker.RangePicker
                  placeholder={["เริ่มต้น", "สิ้นสุด"]}
                  allowClear
                  defaultValue={[
                    checkInDate[0] ? dayjs(checkInDate[0], "YYYY-MM-DD") : null,
                    checkInDate[1] ? dayjs(checkInDate[1], "YYYY-MM-DD") : null,
                  ]}
                  onChange={(value) => {
                    if (value) {
                      handleSearch(
                        "checkInDate",
                        value
                          .map((date) => date?.format("YYYY-MM-DD"))
                          .filter(Boolean)
                          .join(",")
                      );
                    } else {
                      handleSearch("checkInDate", "");
                    }
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};
