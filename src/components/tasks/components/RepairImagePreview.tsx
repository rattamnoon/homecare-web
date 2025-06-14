"use client";

import { UploadFileFragment } from "@/gql/generated/tasks.generated";
import { faImageSlash } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Image, Space, Tooltip } from "antd";

export const RepairImagePreview = ({
  images = [],
}: {
  images: UploadFileFragment[];
}) => {
  if (images.length === 0) {
    return (
      <Tooltip title="ไม่มีรูปภาพ">
        <FontAwesomeIcon icon={faImageSlash} size="lg" color="gray" />
      </Tooltip>
    );
  }

  return (
    <Image.PreviewGroup>
      <Space>
        {images.map((image) => (
          <Image
            key={image.id}
            src={image.fileUrl}
            alt={image.fileName ?? ""}
            width={64}
            height={64}
            style={{
              objectFit: "cover",
              borderRadius: 4,
            }}
          />
        ))}
      </Space>
    </Image.PreviewGroup>
  );
};
