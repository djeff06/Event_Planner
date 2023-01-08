const AWS = require("aws-sdk");
const crypto = require("crypto");
let S3Client;

const configurateAWS = () => {
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SEC_ACCESS_KEY,
    region: process.env.AWS_REGION_DEFAULT,
    signatureVersion: "v4",
  });
};
const createS3Bucket = async () => {
  if (!S3Client) {
    configurateAWS();
    S3Client = new AWS.S3();    
  }
};


const getUploadPresignedUrl = async (filename, oldKey) => {
  console.log("this is from services", filename)
  const key =
    oldKey ||
    crypto.randomBytes(24).toString("hex") + (filename ? "-" + filename : "");
  var params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  };
  return {
    put: S3Client.getSignedUrl("putObject", { ...params, Expires: 3600 }),
    get: S3Client.getSignedUrl("getObject", { ...params, Expires: 3600 }),
    key,
  };
};

const deleteS3Object = async (key) => {
  var params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  };
  return new Promise((resolve, reject) => {
    S3Client.deleteObject(params, function (err, data) {
      if (err) {
        console.log(err, err.stack);
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
const getUploadPresignedUrlString = (key) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  };
  return S3Client.getSignedUrl("getObject", { ...params, Expires: 3600 });
};

module.exports = {
  createS3Bucket,
  configurateAWS,
  getUploadPresignedUrl,
  deleteS3Object,
  getUploadPresignedUrlString,
};
