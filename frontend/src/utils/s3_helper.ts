import AWS from "aws-sdk";
import { PutObjectRequest } from "aws-sdk/clients/s3";
export interface FileStateProperties {
  name: string;
}
console.log(process.env)

export const uploadFile = async (file : FileStateProperties) => {
  if (!file || !file.name) return;
  const S3_BUCKET : string = (process.env.REACT_APP_S3_IMAGE_BUCKET_NAME as string);
  const REGION: string = (process.env.REACT_APP_BUCKET_REGION as string);
  
  AWS.config.update({
    accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
  });
  const s3 = new AWS.S3({
    params: { "Bucket": S3_BUCKET },
    region: REGION,
  });
  const params: PutObjectRequest = {
    "Bucket": S3_BUCKET,
    "Key": file?.name || "",
    "Body": file,
    "ACL": "public-read",
  };
  const upload = s3
    .putObject(params)
    .promise();
  await upload;
  return "";
};