import { CustomModal } from "@/components/common/CustomModal";
import { UploadFileType } from "@/gql/generated/graphql";
import { TaskDetailFragment } from "@/gql/generated/tasks.generated";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import { useMemo } from "react";
import { RepairImagePreview } from "./RepairImagePreview";

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
    >
      {items.map((item) => (
        <Card key={item.id} color={item.type?.color}>
          <div>
            <div>สถานะ : {item.type?.nameTh}</div>
            <div>วันที่ : {dayjs(item.checkInDate).format("DD/MM/YYYY")}</div>
            <div>ช่วงเวลา : {item.checkInRangeTime?.nameTh}</div>
            <div>หมายเหตุ : {item.remark}</div>
            {item.images?.length > 0 && (
              <div>
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
      ))}
    </CustomModal>
  );
};
