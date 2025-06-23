import { Routes } from "@/config/routes";
import { IPaginateMetaFragment } from "@/gql/generated/paginate.generated";
import { TaskFragment } from "@/gql/generated/tasks.generated";
import { getTablePaginationProps } from "@/utils/utils";
import {
  faClockRotateLeft,
  faEllipsisVertical,
  faGear,
  faHouseCircleCheck,
  faHouseCircleXmark,
  faXmark,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Dropdown, Space, Table, Tag, theme } from "antd";
import dayjs from "dayjs";
import { useRouter } from "nextjs-toploader/app";

interface RepairTableProps {
  dataSource?: TaskFragment[];
  meta?: IPaginateMetaFragment | null;
  loading: boolean;
  handleSearch: (
    params: { key: string; value: string | string[] | number }[]
  ) => void;
  handleManage: (task: TaskFragment) => void;
  handleExpand: (task: TaskFragment) => void;
  handleClose: (task: TaskFragment) => void;
}

export const RepairTable = ({
  dataSource,
  meta,
  loading,
  handleSearch,
  handleManage,
  handleExpand,
  handleClose,
}: RepairTableProps) => {
  const router = useRouter();
  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
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
      // onRow={(record) => ({
      //   style: {
      //     cursor: "pointer",
      //   },
      //   onClick: () => {
      //     router.push(Routes.TasksRepairDetail(record.id));
      //   },
      // })}
      columns={[
        {
          dataIndex: "action",
          key: "action",
          align: "center",
          width: 60,
          fixed: "left",
          render: (_, record) => {
            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      label: "จัดการงาน",
                      key: "manage",
                      icon: <FontAwesomeIcon icon={faGear} />,
                      onClick: () => {
                        handleManage(record);
                      },
                    },
                    {
                      label: "ขยายประกัน",
                      key: "extend",
                      icon: <FontAwesomeIcon icon={faClockRotateLeft} />,
                      onClick: () => {
                        handleExpand(record);
                      },
                    },
                    {
                      label: "ปิดงาน",
                      key: "close",
                      icon: <FontAwesomeIcon icon={faXmark} />,
                      onClick: () => {
                        handleClose(record);
                      },
                    },
                  ],
                }}
              >
                <Button
                  type="link"
                  size="small"
                  icon={<FontAwesomeIcon icon={faEllipsisVertical} />}
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
          width: 150,
          onCell: (record) => ({
            style: {
              cursor: "pointer",
              textAlign: "center",
              fontWeight: "bold",
              color: colorPrimary,
            },
            onClick: () => {
              router.push(Routes.TasksRepairDetail(record.id));
            },
          }),
        },
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
          title: "สถานะ",
          dataIndex: "status",
          key: "status",
          align: "center",
          width: 100,
          render: (_, record) => {
            return record.status ? (
              <Tag color={record.status.color}>{record.status.nameEn}</Tag>
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
          width: 120,
        },
        {
          title: "ช่องทาง",
          dataIndex: "source",
          key: "source",
          align: "center",
          width: 100,
          render: (_, record) => {
            return record.source ? (
              <Tag
                {...(record.source.color ? { color: record.source.color } : {})}
              >
                {record.source.nameTh}
              </Tag>
            ) : (
              "-"
            );
          },
        },
        {
          title: "วันที่นัดตรวจสอบ",
          dataIndex: "checkInDate",
          key: "checkInDate",
          align: "center",
          width: 150,
          render: (_, record) => {
            return record.checkInDate
              ? dayjs(record.checkInDate).format("DD/MM/YYYY")
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
            return record.checkInRangeTime
              ? record.checkInRangeTime.nameTh
              : "-";
          },
        },
        {
          title: "วันหมดประกัน",
          dataIndex: "insuranceDate",
          key: "insuranceDate",
          align: "center",
          width: 150,
          render: (_, record) => {
            const isBefore = dayjs(record.insuranceDate).isBefore(
              dayjs(record.createdAt)
            );
            return (
              <Space>
                <FontAwesomeIcon
                  icon={isBefore ? faHouseCircleXmark : faHouseCircleCheck}
                />
                {record.insuranceDate
                  ? dayjs(record.insuranceDate).format("DD/MM/YYYY")
                  : "-"}
              </Space>
            );
          },
          onCell: (record) => ({
            style: {
              color: dayjs(record.insuranceDate).isBefore(
                dayjs(record.createdAt)
              )
                ? "red"
                : "green",
              fontWeight: "bold",
              textDecoration: dayjs(record.insuranceDate).isBefore(
                dayjs(record.createdAt)
              )
                ? "line-through"
                : "none",
            },
          }),
        },
        {
          title: "วันที่โอนกรรมสิทธิ์",
          dataIndex: "transferDate",
          key: "transferDate",
          align: "center",
          width: 150,
          render: (_, record) => {
            return record.transferDate
              ? dayjs(record.transferDate).format("DD/MM/YYYY")
              : "-";
          },
        },
        {
          title: "จำนวนงานแจ้งซ่อม",
          dataIndex: "details",
          key: "details",
          align: "center",
          width: 150,
          render: (_, record) => {
            return record.details?.length ?? 0;
          },
        },
        {
          title: "วันที่แจ้งซ่อม",
          dataIndex: "customerRequestedRepairDate",
          key: "customerRequestedRepairDate",
          align: "center",
          width: 100,
          render: (_, record) => {
            return record.customerRequestedRepairDate
              ? dayjs(record.customerRequestedRepairDate).format("DD/MM/YYYY")
              : dayjs(record.createdAt).format("DD/MM/YYYY");
          },
          onCell: (record) => ({
            style: {
              textAlign: "center",
            },
          }),
        },
      ]}
    />
  );
};
