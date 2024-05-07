import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user";
import { verifyToken } from "../middleware/verifyToken";
import multer from "multer";
import crypto from "crypto";
import sharp from "sharp";

import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import prisma from "../lib/prisma";

const randomImageName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");
const bucketName = process.env.BUCKET_NAME!;
const bucketRegion = process.env.BUCKET_REGION!;
const accessKey = process.env.ACCESS_KEY!;
const secretAccessKey = process.env.SECRET_ACCESS_KEY!;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const userRouter = express.Router();

userRouter.get("/img/:id", async (req, res) => {
  const id = req.params.id;

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      avatar: true,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" }); // Handle user not found
  }

  if (!user.avatar) {
    return res.status(404).json({ message: "User has no avatar" }); // Handle missing avatar
  }

  const getObjectParams = {
    Bucket: bucketName,
    Key: user.avatar, // Use the retrieved avatar string as the key
  };

  try {
    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        avatar: url,
      },
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(user);
  }
});

userRouter.post("/img/:id", upload.single("image"), async (req, res) => {
  console.log("??");
  const id = req.params.id;

  const buffer = await sharp(req.file?.buffer)
    .resize({ height: 1920, width: 1080, fit: "contain" })
    .toBuffer();

  const imageName = randomImageName();
  const params = {
    Bucket: bucketName,
    Key: imageName,
    Body: buffer,
    ContentType: req.file?.mimetype,
  };

  const command = new PutObjectCommand(params);

  const result = await s3.send(command);

  const post = await prisma.user.update({
    where: { id },
    data: {
      avatar: imageName,
    },
  });
  res.status(200).json(post);
});

userRouter.get("/", getUsers);
userRouter.get("/:id", verifyToken, getUser);
userRouter.put("/:id", verifyToken, updateUser);
userRouter.delete(":/id", verifyToken, deleteUser);

export default userRouter;
