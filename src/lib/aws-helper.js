import AWS from "aws-sdk";

import { AWS_SECRET_ACCESS_KEY, AWS_ACCESS_KEY } from "./constants";

export const uploadImage = async (blob) => {
  const S3_BUCKET = "tinyclicks";
  const REGION = "us-east-2";

  console.log(blob)
  console.log("Converting...")
  const convertedFile = new File([blob], "test", { type: blob.type });

  
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
    Key: convertedFile.name,
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

//Private Methods
// function FormatFileName(file) {
//     //Hopefully ensures duplicate file names don't occur
//     const crypto = require("crypto");
//     const path = require("path");
//     const BASE62 =
//       "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
//     const baseX = require("base-x")(BASE62);
//     const hash = crypto.createHash("sha256");

//     // Extract the extension from the file name
//     const extension = path.extname(file.name);

//     const str = file.name + " " + file.lastModified.toString();
//     hash.update(str);

//     return hash.digest("hex") + extension;
//   }
