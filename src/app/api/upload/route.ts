import { NextRequest, NextResponse } from "next/server";

import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const Bucket = process.env.AWS_S3_BUCKET;
export const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { message: "No files provided" },
        { status: 400 }
      );
    }

    const fileFolder = (formData.get("fileFolder") as string) || "unknown";
    const fileId = (formData.get("fileId") as string) || crypto.randomUUID();
    const fileName = (formData.get("fileName") as string) || file.name;

    const key = `${fileFolder}/${fileName}`;

    const buffer = Buffer.from(await file.arrayBuffer());

    await s3Client.send(
      new PutObjectCommand({
        Bucket,
        Key: key,
        Body: buffer,
        ContentType: file.type,
      })
    );

    const signedUrl = await getSignedUrl(
      s3Client,
      new GetObjectCommand({
        Bucket,
        Key: key,
      }),
      {
        expiresIn: 60 * 60 * 24, // หมดอายุ 1 วัน
      }
    );

    return NextResponse.json({
      fileId,
      fileName,
      fileFolder,
      filePath: key,
      fileBucket: Bucket,
      fileExtension: file.type.split("/")[1],
      fileUrl: signedUrl,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      {
        message: "Upload failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
