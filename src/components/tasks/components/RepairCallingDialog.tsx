import { CustomModal } from "@/components/common/CustomModal";

interface RepairCallingDialogProps {
  open: boolean;
  onCancel: () => void;
}

export const RepairCallingDialog = ({
  open,
  onCancel,
}: RepairCallingDialogProps) => {
  return (
    <CustomModal title="ติดต่อลูกค้า" open={open} onCancel={onCancel}>
      RepairCallingDialog
    </CustomModal>
  );
};
