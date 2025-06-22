"use client";

import { UploadFile } from "antd";
import { v7 as uuidv7 } from "uuid";

export const useFileUpload = (name: string, fileFolder: string) => {
  const method = "POST" as "POST" | "PUT" | "PATCH" | "post" | "put" | "patch";
  // const action = `${process.env.NEXT_PUBLIC_API_URL}/upload`;
  const action = "/api/upload";

  const data = (file: UploadFile) => {
    const mimetype = file.type?.split("/")[1];
    const fileId = uuidv7();
    const fileName = `${fileId}.${mimetype}`;

    return {
      fileFolder,
      fileId,
      fileName,
    };
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as File);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return { name, action, method, data, onPreview };
};
