import S3 from "aws-sdk/clients/s3.js";
import { Readable } from "stream";
import dotenv from "dotenv";
dotenv.config();

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

// initialize S3
const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

export const uploadAudioToS3 = (file) => {
  // upload to s3 and return the promise
  const fileStream = Readable.from(file.buffer);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: `audio_files/${file.originalname}`,
  };

  return s3.upload(uploadParams).promise();
};

export const uploadImageToS3 = (file) => {
  // same thing, only difference is the key root path
  const fileStream = Readable.from(file.buffer);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: `image_files/${file.originalname}`,
  };

  return s3.upload(uploadParams).promise();
};
