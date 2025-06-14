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
  UploadFileType.AssignUploadFinish,
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
          status: getStatus(UploadFileType.AssignBefore),
          subTitle: "รูปภาพก่อนรับงาน",
          description: (
            <RepairImagePreview
              images={getImages(UploadFileType.AssignBefore)}
            />
          ),
        },
        {
          title: "Protection",
          status: getStatus(UploadFileType.AssignProtection),
          subTitle: "รูปภาพการปกป้องงาน",
          description: (
            <RepairImagePreview
              images={getImages(UploadFileType.AssignProtection)}
            />
          ),
        },
        {
          title: "Doing",
          status: getStatus(UploadFileType.AssignDoing),
          subTitle: "รูปภาพการดำเนินงาน",
          description: (
            <RepairImagePreview
              images={getImages(UploadFileType.AssignDoing)}
            />
          ),
        },
        {
          title: "Finished",
          status: getStatus(UploadFileType.AssignFinish),
          subTitle: "รูปภาพงานเสร็จสิ้น",
          description: (
            <RepairImagePreview
              images={getImages(UploadFileType.AssignFinish)}
            />
          ),
        },
        ...(getImages(UploadFileType.CustomerSign).length > 0
          ? ([
              {
                title: "ลายเซ็นต์ลูกบ้าน",
                status: getStatus(UploadFileType.CustomerSign),
                subTitle: "รูปภาพลายเซ็นต์ลูกบ้าน",
                description: (
                  <RepairImagePreview
                    images={getImages(UploadFileType.CustomerSign)}
                  />
                ),
              },
            ] as StepProps[])
          : []),
        ...(getImages(UploadFileType.AssignUploadFinish).length > 0
          ? ([
              {
                title: "ไม่มีผู้รับงาน",
                status: getStatus(UploadFileType.AssignUploadFinish),
                subTitle: "รูปภาพการยืนยันงาน",
                description: (
                  <RepairImagePreview
                    images={getImages(UploadFileType.AssignUploadFinish)}
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
