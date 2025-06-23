import { CustomModal } from "@/components/common/CustomModal";
import { TaskDetailFragment } from "@/gql/generated/tasks.generated";
import { Table, Tag } from "antd";
import dayjs from "dayjs";
import { useMemo } from "react";

interface JuristicCentralLogsDialogProps {
  open: boolean;
  onCancel: () => void;
  taskDetail?: TaskDetailFragment | null;
}

export const JuristicCentralLogsDialog = ({
  open,
  onCancel,
  taskDetail,
}: JuristicCentralLogsDialogProps) => {
  const logs = useMemo(() => {
    return taskDetail?.logs;
  }, [taskDetail]);

  return (
    <CustomModal
      title="ประวัติการดำเนินการ"
      open={open}
      onCancel={onCancel}
      footer={null}
      width={800}
      destroyOnHidden
    >
      <Table
        size="small"
        scroll={{ x: "max-content" }}
        rowKey="id"
        pagination={false}
        dataSource={logs}
        columns={[
          {
            title: "ผู้รับผิดชอบ",
            dataIndex: "homecare",
            key: "homecare",
            align: "center",
            render: (_, record) => {
              return record.homecare
                ? `${record.homecare.firstName} ${record.homecare.lastName}`
                : "-";
            },
            onCell: () => ({
              style: {
                textAlign: "left",
              },
            }),
          },
          {
            title: "ประเภทหลัก",
            dataIndex: "category",
            key: "category",
            align: "center",
            render: (_, record) => {
              return record.category?.nameEn;
            },
            onCell: () => ({
              style: {
                textAlign: "left",
              },
            }),
          },
          {
            title: "ประเภทย่อย",
            dataIndex: "subCategory",
            key: "subCategory",
            align: "center",
            render: (_, record) => {
              return record.subCategory?.nameEn;
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
            render: (_, record) => {
              return record.status ? (
                <Tag color={record.status?.color}>{record.status?.nameEn}</Tag>
              ) : (
                <Tag color="default">ยังไม่มีการดำเนินการ</Tag>
              );
            },
            onCell: () => ({
              style: {
                textAlign: "center",
              },
            }),
          },
          {
            title: "ผู้แก้ไขล่าสุด",
            dataIndex: "updatedBy",
            key: "updatedBy",
            align: "center",
            render: (_, record) => {
              return record.updatedBy
                ? `${record.updatedBy.firstName} ${record.updatedBy.lastName}`
                : "-";
            },
            onCell: () => ({
              style: {
                textAlign: "left",
              },
            }),
          },
          {
            title: "วันที่และเวลาแก้ไขล่าสุด",
            dataIndex: "updatedAt",
            key: "updatedAt",
            align: "center",
            render: (_, record) => {
              return record.updatedAt
                ? dayjs(record.updatedAt).format("DD/MM/YYYY HH:mm")
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
    </CustomModal>
  );
};
