import { UploadFileType } from "@/gql/generated/graphql";
import {
  TaskStatusFragment,
  UploadFileFragment,
} from "@/gql/generated/tasks.generated";
import { StepProps, Steps, Typography } from "antd";
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

type RepairSOPImagePreviewProps = {
  images: UploadFileFragment[];
  status?: TaskStatusFragment | null;
};

export const RepairSOPImagePreview = ({
  images = [],
}: RepairSOPImagePreviewProps) => {
  const imageFilters = images.filter((image) => {
    return statuses.some((status) => status === image.fileType);
  });

  if (imageFilters.length === 0) {
    return <Text type="secondary">ยังไม่มีรูปภาพขั้นตอน SOP</Text>;
  }

  const getImages = (fileType: UploadFileType) => {
    return images.filter((image) => image.fileType === fileType);
  };

  return (
    <Steps
      items={[
        {
          title: "Before",
          status:
            getImages(UploadFileType.AssignBefore).length > 0
              ? "finish"
              : "process",
          description: (
            <RepairImagePreview
              images={getImages(UploadFileType.AssignBefore)}
            />
          ),
        },
        {
          title: "Protection",
          status:
            getImages(UploadFileType.AssignProtection).length > 0
              ? "finish"
              : "process",
          description: (
            <RepairImagePreview
              images={getImages(UploadFileType.AssignProtection)}
            />
          ),
        },
        {
          title: "Doing",
          status:
            getImages(UploadFileType.AssignDoing).length > 0
              ? "finish"
              : "process",
          description: (
            <RepairImagePreview
              images={getImages(UploadFileType.AssignDoing)}
            />
          ),
        },
        {
          title: "Finished",
          status:
            getImages(UploadFileType.AssignFinish).length > 0
              ? "finish"
              : "process",
          description: (
            <RepairImagePreview
              images={getImages(UploadFileType.AssignFinish)}
            />
          ),
        },
        {
          title: "Signature",
          status:
            getImages(UploadFileType.CustomerSign).length > 0
              ? "finish"
              : "process",
          description: (
            <RepairImagePreview
              images={getImages(UploadFileType.CustomerSign)}
            />
          ),
        },
        ...(getImages(UploadFileType.Other).length > 0
          ? ([
              {
                title: "ไม่มีผู้รับงาน",
                status: "finish",
                description: (
                  <RepairImagePreview
                    images={getImages(UploadFileType.Other)}
                  />
                ),
              },
            ] as StepProps[])
          : []),
      ]}
      direction="vertical"
      progressDot
      size="small"
    />
  );
};
