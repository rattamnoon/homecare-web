"use client";

import { LayoutWithBreadcrumb } from "@/components/layout/LayoutWithBreadcrumb";
import {
  CreateUploadFileInput,
  UpdateInsuranceExtensionInput,
  UploadFileType,
} from "@/gql/generated/graphql";
import {
  InsuranceExtensionFragment,
  InsuranceExtensionsDocument,
  useCreateOrUpdateInsuranceExtensionMutation,
  useInsuranceExtensionsQuery,
} from "@/gql/generated/insurance-extensions.generated";
import { getTablePaginationProps } from "@/utils/utils";
import {
  faEdit,
  faEllipsis,
  faExpand,
  faFilePdf,
  faTrash,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Col,
  Dropdown,
  Flex,
  notification,
  Row,
  Table,
  Tooltip,
  Typography,
  UploadFile,
} from "antd";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { SearchFilter, useSearchFilter } from "../common/SearchFilter";
import { SystemInsuranceExpandRoomDialog } from "./components/SystemInsuranceExpandRoomDialog";

const { Text } = Typography;

export const SystemInsuranceExpandPage = () => {
  const [notificationApi, notificationContextHolder] =
    notification.useNotification();
  const { projectId, unitIds, currentPage, pageSize, handleSearch } =
    useSearchFilter("SystemInsuranceExpand");
  const [openExpandDialog, setOpenExpandDialog] = useState(false);
  const [insuranceExpand, setInsuranceExpand] =
    useState<InsuranceExtensionFragment | null>(null);

  const variables = useMemo(() => {
    return {
      limit: pageSize,
      page: currentPage,
      projectId,
      unitIds,
    };
  }, [currentPage, pageSize, projectId, unitIds]);

  const { data, loading } = useInsuranceExtensionsQuery({
    variables,
  });

  const [createOrUpdateInsuranceExtension, { loading: createOrUpdateLoading }] =
    useCreateOrUpdateInsuranceExtensionMutation({
      onCompleted: () => {
        notificationApi.success({
          message: "สำเร็จ !!",
          description: "บันทึกข้อมูลเรียบร้อย",
          duration: 3,
        });
        setOpenExpandDialog(false);
        setInsuranceExpand(null);
      },
      onError: (error) => {
        notificationApi.error({
          message: "เกิดข้อผิดพลาด !!",
          description: error.message,
          duration: 5,
        });
      },
      refetchQueries: [
        {
          query: InsuranceExtensionsDocument,
          variables,
        },
      ],
    });

  const insuranceExtensions = useMemo(() => data?.insuranceExtensions, [data]);
  const dataSource = useMemo(
    () => insuranceExtensions?.items,
    [insuranceExtensions]
  );
  const meta = useMemo(() => insuranceExtensions?.meta, [insuranceExtensions]);

  return (
    <>
      {notificationContextHolder}
      <LayoutWithBreadcrumb breadcrumb={[{ title: "ขยายวันประกัน" }]}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Flex justify="space-between">
              <div style={{ width: "100%" }}>
                <SearchFilter route="SystemInsuranceExpand" isProject isUnit />
              </div>
              <Button
                variant="solid"
                color="primary"
                icon={<FontAwesomeIcon icon={faExpand} />}
              >
                ขยายวันประกันทั้งโครงการ
              </Button>
            </Flex>
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
                onChange: (page, pageSize) => {
                  handleSearch([
                    { key: "currentPage", value: page },
                    { key: "pageSize", value: pageSize },
                  ]);
                },
                showQuickJumper: true,
                showSizeChanger: true,
                pageSizeOptions: ["10", "20", "30", "40", "50"],
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
                      ? dayjs(record.project?.insuranceDate).format(
                          "DD/MM/YYYY"
                        )
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
                  render: (_, record) =>
                    record.createdBy ? (
                      <Flex vertical align="start">
                        <Text>
                          {record.createdBy?.firstName}{" "}
                          {record.createdBy?.lastName}
                        </Text>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          {record.updatedAt &&
                            dayjs(record.createdAt).format("DD/MM/YYYY HH:mm")}
                        </Text>
                      </Flex>
                    ) : (
                      "-"
                    ),
                },
                {
                  title: "อัพเดตโดย",
                  dataIndex: "updatedBy",
                  key: "updatedBy",
                  align: "center",
                  width: 150,
                  render: (_, record) =>
                    record.updatedBy ? (
                      <Flex vertical align="start">
                        <Text>
                          {record.updatedBy?.firstName}{" "}
                          {record.updatedBy?.lastName}
                        </Text>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          {record.updatedAt &&
                            dayjs(record.updatedAt).format("DD/MM/YYYY HH:mm")}
                        </Text>
                      </Flex>
                    ) : (
                      "-"
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
                              onClick: () => {
                                setInsuranceExpand(record);
                                setOpenExpandDialog(true);
                              },
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
                              disabled: record.files.length === 0,
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
        <SystemInsuranceExpandRoomDialog
          open={openExpandDialog}
          onCancel={() => setOpenExpandDialog(false)}
          onSubmit={({ insuranceDate, files }) => {
            const id = insuranceExpand?.id || insuranceExpand?.unitId || "";
            const updateInsuranceExtensionInput: UpdateInsuranceExtensionInput =
              {
                id,
                projectId: insuranceExpand?.projectId ?? "",
                unitId: insuranceExpand?.unitId ?? "",
                insuranceDateDefault: insuranceExpand?.insuranceDateExpand,
                insuranceDateExpand: insuranceDate,
              };

            const createUploadFileInput: CreateUploadFileInput[] = files.map(
              (image: UploadFile) => ({
                fileType: UploadFileType.InsuranceExpansion,
                fileId: image.response?.fileId,
                fileName: image.response?.fileName,
                fileFolder: image.response?.fileFolder,
                filePath: image.response?.filePath,
                fileBucket: image.response?.fileBucket,
                fileExtension: image.response?.fileExtension,
              })
            );

            createOrUpdateInsuranceExtension({
              variables: {
                updateInsuranceExtensionInput,
                createUploadFileInput,
              },
            });
          }}
          insuranceExpand={insuranceExpand}
          confirmLoading={createOrUpdateLoading}
        />
      </LayoutWithBreadcrumb>
    </>
  );
};
