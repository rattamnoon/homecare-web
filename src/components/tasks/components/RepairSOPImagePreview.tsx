import { UploadFileType } from "@/gql/generated/graphql";
import { TaskStatusFragment } from "@/gql/generated/tasks.generated";
import { UploadFileFragment } from "@/gql/generated/upload-files.generated";
import { StepProps, Steps, Typography } from "antd";
import { RepairImagePreview } from "./RepairImagePreview";

const statuses = [
  UploadFileType.AssignmentBefore,
  UploadFileType.AssignmentProtection,
  UploadFileType.AssignmentInProgress,
  UploadFileType.AssignmentCompleted,
  UploadFileType.Signature,
  UploadFileType.AssignmentUploadCompleted,
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

  const getStatus = (fileType: UploadFileType) => {
    return getImages(fileType).length > 0 ? "finish" : "process";
  };

  return (
    <Steps
      items={[
        {
          title: "Before",
          status: getStatus(UploadFileType.AssignmentBefore),
          subTitle: "รูปภาพก่อนรับงาน",
          description: (
            <RepairImagePreview
              images={getImages(UploadFileType.AssignmentBefore)}
            />
          ),
        },
        {
          title: "Protection",
          status: getStatus(UploadFileType.AssignmentProtection),
          subTitle: "รูปภาพการปกป้องงาน",
          description: (
            <RepairImagePreview
              images={getImages(UploadFileType.AssignmentProtection)}
            />
          ),
        },
        {
          title: "Doing",
          status: getStatus(UploadFileType.AssignmentInProgress),
          subTitle: "รูปภาพการดำเนินงาน",
          description: (
            <RepairImagePreview
              images={getImages(UploadFileType.AssignmentInProgress)}
            />
          ),
        },
        {
          title: "Finished",
          status: getStatus(UploadFileType.AssignmentCompleted),
          subTitle: "รูปภาพงานเสร็จสิ้น",
          description: (
            <RepairImagePreview
              images={getImages(UploadFileType.AssignmentCompleted)}
            />
          ),
        },
        ...(getImages(UploadFileType.Signature).length > 0
          ? ([
              {
                title: "ลายเซ็นต์ลูกบ้าน",
                status: getStatus(UploadFileType.Signature),
                subTitle: "รูปภาพลายเซ็นต์ลูกบ้าน",
                description: (
                  <RepairImagePreview
                    images={getImages(UploadFileType.Signature)}
                  />
                ),
              },
            ] as StepProps[])
          : []),
        ...(getImages(UploadFileType.AssignmentUploadCompleted).length > 0
          ? ([
              {
                title: "ไม่มีผู้รับงาน",
                status: getStatus(UploadFileType.AssignmentUploadCompleted),
                subTitle: "รูปภาพการยืนยันงาน",
                description: (
                  <RepairImagePreview
                    images={getImages(UploadFileType.AssignmentUploadCompleted)}
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
