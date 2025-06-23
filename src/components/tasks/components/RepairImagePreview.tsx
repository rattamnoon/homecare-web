"use client";

import { UploadFileFragment } from "@/gql/generated/upload-files.generated";
import { faImageSlash } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Flex, Image, Tooltip } from "antd";
import { useState } from "react";

export const RepairImagePreview = ({
  images = [],
}: {
  images: UploadFileFragment[];
}) => {
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const handleImageError = (imageId: string) => {
    setFailedImages((prev) => new Set(prev).add(imageId));
  };

  const validImages = images.filter((image) => !failedImages.has(image.id));

  if (validImages.length === 0) {
    return (
      <Tooltip title="ไม่มีรูปภาพ">
        <FontAwesomeIcon icon={faImageSlash} size="lg" color="gray" />
      </Tooltip>
    );
  }

  return (
    <Image.PreviewGroup>
      <Flex gap={8} wrap="wrap">
        {validImages.map((image) => (
          <Image
            key={image.id}
            src={image.fileUrl}
            alt={image.fileName ?? ""}
            width={64}
            height={64}
            onError={() => handleImageError(image.id)}
            style={{
              objectFit: "cover",
              borderRadius: 4,
              boxShadow:
                "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
            }}
          />
        ))}
      </Flex>
    </Image.PreviewGroup>
  );
};
