import { CustomModal } from "@/components/common/CustomModal";
import { TaskDetailFragment } from "@/gql/generated/tasks.generated";

interface RepairCallingDialogProps {
  open: boolean;
  onCancel: () => void;
  taskDetail: TaskDetailFragment | null;
}

export const RepairCallingDialog = ({
  open,
  onCancel,
  taskDetail,
}: RepairCallingDialogProps) => {
  return (
    <CustomModal title="ติดต่อลูกค้า" open={open} onCancel={onCancel}>
      <pre>{JSON.stringify(taskDetail, null, 2)}</pre>
    </CustomModal>
  );
};
