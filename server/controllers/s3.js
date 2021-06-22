import S3 from "aws-sdk/clients/s3.js";
import dotenv from "dotenv";
import { Readable } from "stream";
dotenv.config();

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

export const uploadAudioToS3 = (file) => {
  const fileStream = Readable.from(file.buffer);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: `audio_files/${file.originalname}`,
  };

  return s3.upload(uploadParams).promise();
};

export const uploadImageToS3 = (file) => {
  const fileStream = Readable.from(file.buffer);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: `image_files/${file.originalname}`,
  };

  return s3.upload(uploadParams).promise();
};
