import { S3Client } from "@aws-sdk/client-s3";

import multer from "multer";
import crypto from "crypto";

export const randomImageName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

export const bucketName = process.env.BUCKET_NAME!;
export const bucketRegion = process.env.BUCKET_REGION!;
export const accessKey = process.env.ACCESS_KEY!;
export const secretAccessKey = process.env.SECRET_ACCESS_KEY!;

export const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

const storage = multer.memoryStorage();
export const upload = multer({ storage: storage });
