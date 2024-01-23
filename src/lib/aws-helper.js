import AWS from "aws-sdk";

import { AWS_SECRET_ACCESS_KEY, AWS_ACCESS_KEY } from "./constants";

/*
Server Route will call uploadImage, 
if it succeeds, the uploaded image 
name with be stored in the MongoDB database
for the link-portal record of the user.
*/

export const uploadImage = async (blob, directory) => {
  const S3_BUCKET = "tinyclicks";
  const REGION = "us-east-2";

  console.log(blob)
  console.log("Converting...")
  const convertedFile = new File([blob], blob.name, { type: blob.type }); //"Test" Placeholder name

  
  console.log(convertedFile);
  AWS.config.update({
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  });
  const s3 = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
  });

  const params = {
    Bucket: S3_BUCKET,
    Key: directory ? directory + convertedFile.name : convertedFile.name,
    Body: convertedFile,
    ContentType: convertedFile.type
  };
  

  var upload = s3
    .putObject(params)
    .on("httpUploadProgress", (evt) => {
      console.log(
        "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
      );
    })
    .promise();

  await upload.then((err, data) => {
    console.log(err);
    alert("File uploaded successfully.");
  });
};
