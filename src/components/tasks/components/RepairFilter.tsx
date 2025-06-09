import { Routes } from "@/config/routes";
import { useTaskStatusesQuery } from "@/gql/generated/tasks.generated";
import { useProjectsQuery } from "@/gql/src/gql/generated/project.generated";
import { useCreateSearchParams } from "@/hooks/useCreateSearchParams";
import { Col, Form, Input, Row, Select, SelectProps, Tag, Tooltip } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

type TagRender = SelectProps["tagRender"];

export const useRepairFilter = () => {
  const searchParams = useSearchParams();
  const searchText = searchParams.get("searchText") as string;
  const statuses = ((searchParams.get("statuses") as string) || "")
    .split(",")
    .filter(Boolean);
  const projectIds = ((searchParams.get("projectIds") as string) || "")
    .split(",")
    .filter(Boolean);

  return { searchText, statuses, projectIds };
};

export const RepairFilter = () => {
  const router = useRouter();
  const { data: statusesData, loading: statusesLoading } =
    useTaskStatusesQuery();
  const { createQueryString } = useCreateSearchParams();
  const { data: projectsData, loading: projectsLoading } = useProjectsQuery();
  const { searchText, statuses, projectIds } = useRepairFilter();

  const statusesOptions = useMemo(
    () => statusesData?.taskStatuses || [],
    [statusesData]
  );
  const projectsOptions = useMemo(
    () => projectsData?.projects || [],
    [projectsData]
  );

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
    mode: "multiple",
    maxTagCount: "responsive",
    maxTagPlaceholder: (omittedValues) => (
      <Tooltip
        styles={{ root: { pointerEvents: "none" } }}
        title={omittedValues.map(({ label }) => label).join(", ")}
      >
        <span>+ {omittedValues.length}</span>
      </Tooltip>
    ),
  };

  return (
    <Form layout="horizontal">
      <Row gutter={[16, 16]}>
        <Col>
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
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item
                label="โครงการ"
                name="projects"
                colon={false}
                style={{ marginBottom: 0 }}
              >
                <Select
                  {...sharedSelectProps}
                  placeholder="โครงการ"
                  loading={projectsLoading}
                  value={projectIds}
                  onChange={(value) => {
                    handleSearch("projectIds", value.join(","));
                  }}
                  options={projectsOptions?.map((project) => ({
                    label: project.nameEn,
                    value: project.id,
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
