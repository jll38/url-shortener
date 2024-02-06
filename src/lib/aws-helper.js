import AWS from "aws-sdk";

import { AWS_SECRET_ACCESS_KEY, AWS_ACCESS_KEY } from "./constants";

/*
Server Route will call uploadImage, 
if it succeeds, the uploaded image 
name with be stored in the MongoDB database
for the link-portal record of the user.
*/

export const uploadImage = async (fileOrBuffer, fileName, directory, contentType) => {
  const S3_BUCKET = "tinyclicks";
  const REGION = "us-east-2";
  console.log("Directory: " + directory)
  AWS.config.update({
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  });

  const s3 = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
  });

  let uploadParams;

  if (Buffer.isBuffer(fileOrBuffer)) {
    // Handle the buffer case
    uploadParams = {
      Bucket: S3_BUCKET,
      Key: directory ? `${directory}${fileName}` : fileName,
      Body: fileOrBuffer,
      ContentType: contentType || 'image/jpeg' // Default content type if not provided
    };
  } else {
    // Handle the blob case
    uploadParams = {
      Bucket: S3_BUCKET,
      Key: directory ? `${directory}${fileOrBuffer.name}` : fileOrBuffer.name,
      Body: fileOrBuffer,
      ContentType: fileOrBuffer.type
    };
  }

  try {
    const upload = await s3.putObject(uploadParams).promise();
    console.log("Upload completed", upload);
    return upload; // or return some specific data as needed
  } catch (err) {
    console.error("Error during upload:", err);
    throw err;
  }
};
