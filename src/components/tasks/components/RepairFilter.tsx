import { Routes } from "@/config/routes";
import { useUnitsQuery } from "@/gql/generated/project.generated";
import { useTaskStatusesQuery } from "@/gql/generated/tasks.generated";
import { useProjectsQuery } from "@/gql/src/gql/generated/project.generated";
import { useCreateSearchParams } from "@/hooks/useCreateSearchParams";
import { faPlus } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Col,
  Flex,
  Form,
  Input,
  Row,
  Select,
  SelectProps,
  Tag,
  Tooltip,
} from "antd";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useMemo } from "react";

type TagRender = SelectProps["tagRender"];

export const useRepairFilter = () => {
  const searchParams = useSearchParams();
  const searchText = searchParams.get("searchText") as string;
  const statuses = ((searchParams.get("statuses") as string) || "")
    .split(",")
    .filter(Boolean);
  const projectId = searchParams.get("projectId") as string;
  const unitIds = ((searchParams.get("unitIds") as string) || "")
    .split(",")
    .filter(Boolean);

  return { searchText, statuses, projectId, unitIds };
};

export const RepairFilter = () => {
  const router = useRouter();
  const { createQueryString } = useCreateSearchParams();
  const { searchText, statuses, projectId, unitIds } = useRepairFilter();
  const { data: statusesData, loading: statusesLoading } =
    useTaskStatusesQuery();
  const { data: projectsData, loading: projectsLoading } = useProjectsQuery();
  const { data: unitsData, loading: unitsLoading } = useUnitsQuery({
    variables: {
      projectId,
    },
    skip: !projectId,
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

  const tagRender: TagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };

    const status = statusesOptions?.find((status) => status.id === value);

    return (
      <Tag
        color={status?.color}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginInlineEnd: 4 }}
      >
        {label}
      </Tag>
    );
  };

  const handleSearch = (key: string, value: string | string[]) => {
    const queryString = createQueryString({
      [key]: Array.isArray(value) ? value.join(",") : value,
    });
    router.push(`${Routes.TasksRepair}?${queryString}`, {
      scroll: false,
    });
  };

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
                  value={statuses}
                  tagRender={tagRender}
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
                  value={projectId}
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
                  value={unitIds}
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
          </Row>
        </Col>
      </Row>
    </Form>
  );
};
