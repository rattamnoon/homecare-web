"use client";

import { LayoutWithBreadcrumb } from "@/components/layout/LayoutWithBreadcrumb";
import { useInsuranceExtensionsQuery } from "@/gql/generated/insurance-extensions.generated";
import { getTablePaginationProps } from "@/utils/utils";
import {
  faEdit,
  faEllipsis,
  faFilePdf,
  faTrash,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Col,
  Dropdown,
  Flex,
  Row,
  Table,
  Tooltip,
  Typography,
} from "antd";
import dayjs from "dayjs";
import { useMemo } from "react";
import { SearchFilter, useSearchFilter } from "../common/SearchFilter";

const { Text } = Typography;

export const SystemInsuranceExpandPage = () => {
  const { searchText, projectId, currentPage, pageSize, handleSearch } =
    useSearchFilter("SystemInsuranceExpand");
  const { data, loading } = useInsuranceExtensionsQuery({
    variables: {
      limit: pageSize,
      page: currentPage,
      searchText,
      projectId,
    },
  });

  const insuranceExtensions = useMemo(() => data?.insuranceExtensions, [data]);
  const dataSource = useMemo(
    () => insuranceExtensions?.items,
    [insuranceExtensions]
  );
  const meta = useMemo(() => insuranceExtensions?.meta, [insuranceExtensions]);

  return (
    <LayoutWithBreadcrumb breadcrumb={[{ title: "ขยายวันประกัน" }]}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <SearchFilter route="SystemInsuranceExpand" isProject isUnit />
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
                title: "โครงการ",
                dataIndex: "project",
                key: "project",
                align: "center",
                width: 300,
                render: (_, record) => {
                  return record.project
                    ? `${record.project.id} - ${record.project.nameTh}`
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
                dataIndex: "unit",
                key: "unit",
                align: "center",
                width: 200,
                render: (_, record) => {
                  return record.unit
                    ? `${record.unit.unitNumber} (${record.unit.houseNumber})`
                    : "-";
                },
                onCell: () => ({
                  style: {
                    textAlign: "left",
                  },
                }),
              },
              {
                title: "วันหมดประกันโครงการ",
                dataIndex: "insuranceDate",
                key: "insuranceDate",
                align: "center",
                width: 150,
                render: (_, record) =>
                  record.project?.insuranceDate
                    ? dayjs(record.project?.insuranceDate).format("DD/MM/YYYY")
                    : "-",
              },
              {
                title: "วันโอนกรรมสิทธิ์",
                dataIndex: "transferDate",
                key: "transferDate",
                align: "center",
                width: 150,
                render: (_, record) =>
                  record.transferDate
                    ? dayjs(record.transferDate).format("DD/MM/YYYY")
                    : "-",
              },
              {
                title: "วันประกันเดิม",
                dataIndex: "insuranceDateDefault",
                key: "insuranceDateDefault",
                align: "center",
                width: 150,
                render: (_, record) =>
                  record.insuranceDateDefault
                    ? dayjs(record.insuranceDateDefault).format("DD/MM/YYYY")
                    : "-",
              },
              {
                title: "วันประกันที่ขยาย",
                dataIndex: "insuranceDateExpand",
                key: "insuranceDateExpand",
                align: "center",
                width: 150,
                render: (_, record) =>
                  record.insuranceDateExpand
                    ? dayjs(record.insuranceDateExpand).format("DD/MM/YYYY")
                    : "-",
              },
              {
                title: "สร้างโดย",
                dataIndex: "createdBy",
                key: "createdBy",
                align: "center",
                width: 150,
                render: (_, record) => (
                  <Flex vertical align="start">
                    <Text>
                      {record.createdBy?.firstName} {record.createdBy?.lastName}
                    </Text>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {record.updatedAt &&
                        dayjs(record.createdAt).format("DD/MM/YYYY HH:mm")}
                    </Text>
                  </Flex>
                ),
              },
              {
                title: "อัพเดตโดย",
                dataIndex: "updatedBy",
                key: "updatedBy",
                align: "center",
                width: 150,
                render: (_, record) => (
                  <Flex vertical align="start">
                    <Text>
                      {record.updatedBy?.firstName} {record.updatedBy?.lastName}
                    </Text>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {record.updatedAt &&
                        dayjs(record.updatedAt).format("DD/MM/YYYY HH:mm")}
                    </Text>
                  </Flex>
                ),
              },
              {
                title: "Action",
                dataIndex: "action",
                key: "action",
                align: "center",
                fixed: "right",
                width: 100,
                render: (_, record) => (
                  <Tooltip title="จัดการงาน">
                    <Dropdown
                      trigger={["click"]}
                      menu={{
                        items: [
                          {
                            label: "แก้ไข",
                            key: "edit",
                            icon: <FontAwesomeIcon icon={faEdit} />,
                          },
                          {
                            label: "ลบ",
                            key: "delete",
                            icon: <FontAwesomeIcon icon={faTrash} />,
                          },
                          { type: "divider" },
                          {
                            label: "ดาวน์โหลดเอกสารการขยายประกัน",
                            key: "download",
                            children: record.files.map((file) => ({
                              label: file.fileName,
                              key: file.id,
                              icon: <FontAwesomeIcon icon={faFilePdf} />,
                              onClick: () => {
                                window.open(file.fileUrl, "_blank");
                              },
                            })),
                          },
                        ],
                      }}
                    >
                      <Button
                        type="link"
                        icon={<FontAwesomeIcon icon={faEllipsis} />}
                      />
                    </Dropdown>
                  </Tooltip>
                ),
              },
            ]}
          />
        </Col>
      </Row>
    </LayoutWithBreadcrumb>
  );
};
