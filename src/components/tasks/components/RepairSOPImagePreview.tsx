import { UploadFileType } from "@/gql/generated/graphql";
import { UploadFileFragment } from "@/gql/generated/tasks.generated";
import { Steps, Typography } from "antd";
import { RepairImagePreview } from "./RepairImagePreview";

const statuses = [
  UploadFileType.AssignBefore,
  UploadFileType.AssignProtection,
  UploadFileType.AssignDoing,
  UploadFileType.AssignFinish,
  UploadFileType.CustomerSign,
  UploadFileType.Other,
];

const { Text } = Typography;

export const RepairSOPImagePreview = ({
  images = [],
}: {
  images: UploadFileFragment[];
}) => {
  const imageFilters = images.filter((image) => {
    return statuses.some((status) => status === image.fileType);
  });

  if (imageFilters.length === 0) {
    return <Text type="secondary">ยังไม่มีรูปภาพขั้นตอน SOP</Text>;
  }

  return (
    <Steps
      items={[
        {
          title: "Before",
          description: (
            <RepairImagePreview
              images={images.filter(
                (image) => image.fileType === UploadFileType.AssignBefore
              )}
            />
          ),
        },
        {
          title: "Protection",
          description: (
            <RepairImagePreview
              images={images.filter(
                (image) => image.fileType === UploadFileType.AssignProtection
              )}
            />
          ),
        },
        {
          title: "Doing",
          description: (
            <RepairImagePreview
              images={images.filter(
                (image) => image.fileType === UploadFileType.AssignDoing
              )}
            />
          ),
        },
        {
          title: "Finished",
          description: (
            <RepairImagePreview
              images={images.filter(
                (image) => image.fileType === UploadFileType.AssignFinish
              )}
            />
          ),
        },
        {
          title: "Signature",
          description: (
            <RepairImagePreview
              images={images.filter(
                (image) => image.fileType === UploadFileType.CustomerSign
              )}
            />
          ),
        },
        {
          title: "ไม่มีผู้รับงาน",
          description: (
            <RepairImagePreview
              images={images.filter(
                (image) => image.fileType === UploadFileType.Other
              )}
            />
          ),
        },
      ]}
      direction="vertical"
      progressDot
      size="small"
    />
  );
};
