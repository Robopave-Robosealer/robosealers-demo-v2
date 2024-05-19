// let AWS = require('aws-sdk');
// const uuid = require("uuid").v4
// const s3 = new AWS.S3();
// process.env.AWS_ACCESS_KEY_ID = process.env.BUCKETEER_AWS_ACCESS_KEY_ID;
// process.env.AWS_SECRET_ACCESS_KEY = process.env.BUCKETEER_AWS_SECRET_ACCESS_KEY;
// process.env.AWS_REGION = process.env.BUCKETEER_AWS_REGION;


// exports.uploadFilesToS3 = async (folderName, files) => {
//   try {
//     const params = files.map((file) => {
//       return {
//         Bucket: process.env.BUCKETEER_BUCKET_NAME,
//         Key: `public/${folderName}/${uuid()}-${file.originalname}`,
//         Body: file.buffer,
//       };
//     });
//     const uploadResults = await Promise.all(params.map((param) => s3.upload(param).promise()));
//     return { success: true, result: uploadResults };
//   } catch (err) {
//     console.log(`err.message`, err.message);
//     return err.message
//   }
// };

