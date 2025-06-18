import { CustomModal } from "@/components/common/CustomModal";
import { UploadFileType } from "@/gql/generated/graphql";
import { TaskDetailFragment } from "@/gql/generated/tasks.generated";
import styled from "@emotion/styled";
import { List } from "antd";
import dayjs from "dayjs";
import { useMemo } from "react";
import { RepairImagePreview } from "../RepairImagePreview";

const Card = styled.div`
  border-left: 4px solid ${({ color }) => color};
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 4px;
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

interface RepairLogsDialogProps {
  open: boolean;
  onCancel: () => void;
  taskDetail: TaskDetailFragment | null;
}

export const RepairLogsDialog = ({
  open,
  onCancel,
  taskDetail,
}: RepairLogsDialogProps) => {
  const items = useMemo(() => {
    if (!taskDetail) return [];
    return taskDetail?.reportLogs || [];
  }, [taskDetail]);

  return (
    <CustomModal
      open={open}
      onCancel={onCancel}
      title="Logs"
      footer={null}
      destroyOnHidden
      width={800}
    >
      <List
        rowKey="id"
        dataSource={items}
        size="small"
        split={false}
        grid={{
          gutter: 8,
          column: 1,
        }}
        pagination={{
          pageSize: 5,
          showSizeChanger: false,
          showQuickJumper: false,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} จาก ${total} รายการ`,
          align: "center",
        }}
        renderItem={(item) => (
          <List.Item>
            <Card key={item.id} color={item.type?.color}>
              <div>
                <div>สถานะ : {item.type?.nameTh}</div>
                {item.checkInDate && (
                  <div>
                    วันที่ : {dayjs(item.checkInDate).format("DD/MM/YYYY")}
                  </div>
                )}
                {item.checkInRangeTime && (
                  <div>ช่วงเวลา : {item.checkInRangeTime?.nameTh}</div>
                )}
                <div>หมายเหตุ : {item.remark}</div>
                {item.images?.length > 0 && (
                  <div
                    style={{
                      alignSelf: "flex-start",
                      alignItems: "flex-start",
                      display: "flex",
                      flexDirection: "column",
                      gap: 4,
                    }}
                  >
                    <span>รูปภาพ : </span>
                    <RepairImagePreview
                      images={item.images.filter(
                        (image) => image.fileType === UploadFileType.Other
                      )}
                    />
                  </div>
                )}
              </div>
            </Card>
          </List.Item>
        )}
      />
    </CustomModal>
  );
};
