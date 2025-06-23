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
import { uniqBy } from "lodash-es";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useCallback, useMemo } from "react";

export const useSearchFilter = (route: keyof typeof Routes) => {
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
  const createdAt = ((searchParams.get("createdAt") as string) || "")
    .split(",")
    .filter(Boolean);
  const finishedDate = ((searchParams.get("finishedDate") as string) || "")
    .split(",")
    .filter(Boolean);
  const isCall = searchParams.get("isCall") || "all";
  const currentPage = Number(searchParams.get("currentPage")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;

  const handleSearch = useCallback(
    (params: { key: string; value: string | string[] | number }[]) => {
      const queryParams = params.reduce((acc, param) => {
        const stringValue = Array.isArray(param.value)
          ? param.value.join(",")
          : typeof param.value === "number"
          ? param.value.toString()
          : param.value;
        acc[param.key] = stringValue;
        return acc;
      }, {} as Record<string, string>);

      // ถ้าการค้นหาไม่ใช่ currentPage หรือ pageSize ให้ reset pagination
      const isSearchingPagination = params.some(
        (param) => param.key === "currentPage" || param.key === "pageSize"
      );

      if (!isSearchingPagination) {
        queryParams.currentPage = "1";
        queryParams.pageSize = "10";
      }

      const queryString = createQueryString({
        ...queryParams,
      });
      router.push(`${Routes[route]}?${queryString}`, {
        scroll: false,
      });
    },
    [createQueryString, router, route]
  );

  return {
    searchText,
    statuses,
    projectId,
    unitIds,
    sources,
    checkInDate,
    createdAt,
    finishedDate,
    isCall,
    currentPage,
    pageSize,
    handleSearch,
  };
};

interface SearchFilterProps {
  route: keyof typeof Routes;
  isSearchText?: boolean;
  isCreateButton?: boolean;
  onCreateButtonClick?: () => void;
  isStatus?: boolean;
  isProject?: boolean;
  isUnit?: boolean;
  isFinishedDate?: boolean;
  isIsCall?: boolean;
  isSource?: boolean;
  isCheckInDate?: boolean;
  isCreatedAt?: boolean;
}

export const SearchFilter = ({
  route,
  isSearchText,
  isCreateButton,
  onCreateButtonClick,
  isStatus,
  isProject,
  isUnit,
  isFinishedDate,
  isIsCall,
  isSource,
  isCheckInDate,
  isCreatedAt,
}: SearchFilterProps) => {
  const router = useRouter();
  const {
    searchText,
    projectId,
    unitIds,
    sources,
    checkInDate,
    createdAt,
    statuses,
    finishedDate,
    isCall,
    handleSearch,
  } = useSearchFilter(route);

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

  const statusesOptions = useMemo(
    () => uniqBy(statusesData?.taskStatuses || [], "id"),
    [statusesData]
  );
  const projectsOptions = useMemo(
    () => uniqBy(projectsData?.projects || [], "id"),
    [projectsData]
  );
  const unitsOptions = useMemo(
    () => uniqBy(unitsData?.units || [], "id"),
    [unitsData]
  );
  const sourcesOptions = useMemo(
    () => uniqBy(optionsData?.sources || [], "id"),
    [optionsData]
  );

  const sharedSelectProps: SelectProps = {
    allowClear: true,
    style: { width: "100%" },
    showSearch: true,
    optionFilterProp: "label",
  };

  return (
    <Form
      layout="horizontal"
      initialValues={{
        searchText: searchText,
        statuses: statuses,
        projectId: projectId,
        unitIds: unitIds,
        sources: sources,
        isCall: isCall,
        ...(checkInDate.length > 0 && {
          checkInDate: [
            checkInDate[0] ? dayjs(checkInDate[0], "YYYY-MM-DD") : null,
            checkInDate[1] ? dayjs(checkInDate[1], "YYYY-MM-DD") : null,
          ],
        }),
        ...(createdAt.length > 0 && {
          createdAt: [
            createdAt[0] ? dayjs(createdAt[0], "YYYY-MM-DD") : null,
            createdAt[1] ? dayjs(createdAt[1], "YYYY-MM-DD") : null,
          ],
        }),
        ...(finishedDate.length > 0 && {
          finishedDate: [
            finishedDate[0] ? dayjs(finishedDate[0], "YYYY-MM-DD") : null,
            finishedDate[1] ? dayjs(finishedDate[1], "YYYY-MM-DD") : null,
          ],
        }),
      }}
    >
      <Row gutter={[16, 16]}>
        <Col span={24} style={{ display: isSearchText ? "block" : "none" }}>
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
                onChange={(e) => {
                  handleSearch([{ key: "searchText", value: e.target.value }]);
                }}
                style={{ width: 325 }}
              />
            </Form.Item>
            {isCreateButton && (
              <Button
                variant="solid"
                color="primary"
                icon={<FontAwesomeIcon icon={faPlus} />}
                {...(onCreateButtonClick && {
                  onClick: onCreateButtonClick,
                })}
              >
                เพิ่มงานแจ้งซ่อม
              </Button>
            )}
          </Flex>
        </Col>
        <Col span={24}>
          <Row gutter={[8, 8]}>
            <Col
              xs={24}
              md={6}
              style={{ display: isStatus ? "block" : "none" }}
            >
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
                  onChange={(value) => {
                    handleSearch([{ key: "statuses", value: value.join(",") }]);
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
            <Col
              xs={24}
              md={6}
              style={{ display: isProject ? "block" : "none" }}
            >
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
                  onChange={(value) => {
                    handleSearch([{ key: "projectId", value }]);
                  }}
                  options={projectsOptions?.map((project) => ({
                    label: `${project.id} - ${project.nameTh}`,
                    value: project.id,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={6} style={{ display: isUnit ? "block" : "none" }}>
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
                  onChange={(value) => {
                    handleSearch([{ key: "unitIds", value: value.join(",") }]);
                  }}
                  options={unitsOptions?.map((unit) => ({
                    label: `${unit.unitNumber} (${unit.houseNumber})`,
                    value: unit.id,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col
              xs={24}
              md={6}
              style={{ display: isFinishedDate ? "block" : "none" }}
            >
              <Form.Item
                label="วันที่เสร็จงาน"
                name="finishedDate"
                colon={false}
                style={{ marginBottom: 0 }}
              >
                <DatePicker.RangePicker
                  placeholder={["เริ่มต้น", "สิ้นสุด"]}
                  allowClear
                  format="DD/MM/YYYY"
                  onChange={(value) => {
                    if (value) {
                      handleSearch([
                        {
                          key: "finishedDate",
                          value: value
                            .map((date) => date?.format("YYYY-MM-DD"))
                            .filter(Boolean)
                            .join(","),
                        },
                      ]);
                    } else {
                      handleSearch([{ key: "finishedDate", value: "" }]);
                    }
                  }}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col
              xs={24}
              md={6}
              style={{ display: isIsCall ? "block" : "none" }}
            >
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
                  onChange={(value) => {
                    handleSearch([{ key: "isCall", value }]);
                  }}
                  options={[
                    { label: "ทั้งหมด", value: "all" },
                    { label: "มี", value: "has" },
                    { label: "ไม่มี", value: "no" },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col
              xs={24}
              md={6}
              style={{ display: isSource ? "block" : "none" }}
            >
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
                  onChange={(value) => {
                    handleSearch([{ key: "sources", value: value.join(",") }]);
                  }}
                  options={sourcesOptions?.map((source) => ({
                    label: source.nameTh,
                    value: source.id,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col
              xs={24}
              md={6}
              style={{ display: isCheckInDate ? "block" : "none" }}
            >
              <Form.Item
                label="วันที่นัดตรวจสอบ"
                name="checkInDate"
                colon={false}
                style={{ marginBottom: 0 }}
              >
                <DatePicker.RangePicker
                  placeholder={["เริ่มต้น", "สิ้นสุด"]}
                  allowClear
                  format="DD/MM/YYYY"
                  onChange={(value) => {
                    if (value) {
                      handleSearch([
                        {
                          key: "checkInDate",
                          value: value
                            .map((date) => date?.format("YYYY-MM-DD"))
                            .filter(Boolean)
                            .join(","),
                        },
                      ]);
                    } else {
                      handleSearch([{ key: "checkInDate", value: "" }]);
                    }
                  }}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col
              xs={24}
              md={6}
              style={{ display: isCreatedAt ? "block" : "none" }}
            >
              <Form.Item
                label="วันที่สร้าง"
                name="createdAt"
                colon={false}
                style={{ marginBottom: 0 }}
              >
                <DatePicker.RangePicker
                  placeholder={["เริ่มต้น", "สิ้นสุด"]}
                  allowClear
                  format="DD/MM/YYYY"
                  onChange={(value) => {
                    if (value) {
                      handleSearch([
                        {
                          key: "createdAt",
                          value: value
                            .map((date) => date?.format("YYYY-MM-DD"))
                            .filter(Boolean)
                            .join(","),
                        },
                      ]);
                    } else {
                      handleSearch([{ key: "createdAt", value: "" }]);
                    }
                  }}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};
