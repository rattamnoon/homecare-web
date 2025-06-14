import { CustomModal } from "@/components/common/CustomModal";
import { UploadFileType } from "@/gql/generated/graphql";
import { TaskDetailFragment } from "@/gql/generated/tasks.generated";
import dayjs from "dayjs";
import { useMemo } from "react";
import { RepairImagePreview } from "./RepairImagePreview";

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
    <CustomModal open={open} onCancel={onCancel} title="Logs" footer={null}>
      {items.map((item) => (
        <div
          key={item.id}
          style={{
            borderLeft: `4px solid ${item.type?.color}`,
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
            backgroundColor: "#f0f0f0",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <div>
            <div>สถานะ : {item.type?.nameTh}</div>
            <div>วันที่ : {dayjs(item.checkInDate).format("DD/MM/YYYY")}</div>
            <div>ช่วงเวลา : {item.checkInRangeTime?.nameTh}</div>
            <div>หมายเหตุ : {item.comment}</div>
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
        </div>
      ))}
    </CustomModal>
  );
};
