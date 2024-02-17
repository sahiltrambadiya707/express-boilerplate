const {
  S3Client,
  CreateBucketCommand,
  PutObjectCommand,
  ListObjectsCommand,
  DeleteObjectCommand,
  CopyObjectCommand,
  GetObjectCommand,
} = require('@aws-sdk/client-s3');
const configuration = require('@config/configuration');

// Set up AWS configuration

const s3Client = new S3Client({
  credentials: {
    accessKeyId: configuration.AWS.S3_ACCESS_KEY_ID,
    secretAccessKey: configuration.AWS.S3_SECRET_ACCESS_KEY,
  },
  region: configuration.AWS.S3_REGION,
});

// Specify the bucket name
const s3BucketName = configuration.AWS.S3_BUCKET_NAME;

// Function to create a new S3 bucket
const s3CreateBucket = async () => {
  const params = {
    Bucket: bucketName,
    ACL: 'private', // You can set the ACL as per your requirements
  };

  try {
    const response = await s3Client.send(new CreateBucketCommand(params));
    return {
      status: true,
      type: 'OK',
      data: response,
      message: 'Bucket Created Successfully',
    };
  } catch (err) {
    return {
      status: false,
      type: 'ERROR',
      data: {},
      message: 'Something went wrong while creating bucket',
    };
  }
};

// Function to create a folder (zero-sized object) in the S3 bucket
const s3CreateFolder = async ({ dirPath, bucketName = s3BucketName }) => {
  const params = {
    Bucket: bucketName,
    Key: dirPath, // Note the trailing slash to indicate a folder
    Body: '', // Set the Body to an empty string to create a zero-sized object
  };

  try {
    const response = await s3Client.send(new PutObjectCommand(params));
    return {
      status: true,
      type: 'OK',
      data: response,
      message: 'Folder Created Successfully',
    };
  } catch (err) {
    return {
      status: false,
      type: 'ERROR',
      data: {},
      message: 'Something went wrong while creating folder',
    };
  }
};

// Function to upload a file to S3
const s3UploadFile = async ({
  fileToUpload,
  uploadPath,
  fileName = '',
  validationFieldName = 'File',
  bucketName = s3BucketName,
}) => {
  const params = {
    ACL: 'public-read', // You can set the ACL as per your requirements
    Bucket: bucketName,
    Key: `${uploadPath}/${fileName}`,
    Body: fileToUpload?.data,
  };

  try {
    const response = await s3Client.send(new PutObjectCommand(params));
    const fileUrl = `https://${configuration.AWS.S3_BUCKET_NAME}.s3.${configuration.AWS.S3_REGION}.amazonaws.com/${uploadPath}/${fileName}`;

    return {
      status: true,
      type: 'OK',
      fileName,
      data: { ...response, location: fileUrl },
      message: 'File uploaded Successfully',
    };
  } catch (err) {
    return {
      status: false,
      type: 'ERROR',
      data: {},
      message: 'Something went wrong while uploading file',
    };
  }
};

// Function to list objects in the S3 bucket
const s3ListObjects = async ({ prefix = '', bucketName = s3BucketName }) => {
  const params = {
    Bucket: bucketName,
    Prefix: prefix,
  };

  try {
    const response = await s3Client.send(new ListObjectsCommand(params));
    return {
      status: true,
      type: 'OK',
      data: response,
      message: 'Retrieval of list objects is Successful',
    };
  } catch (err) {
    return {
      status: false,
      type: 'ERROR',
      data: {},
      message: 'Something went wrong while retrieving list objects',
    };
  }
};

// Function to delete an object from the S3 bucket
const s3DeleteObject = async ({ filePath, bucketName = s3BucketName }) => {
  let fileKeys = filePath;

  if (!Array.isArray(filePath)) {
    fileKeys = [filePath];
  }

  const params = {
    Bucket: bucketName,
    Delete: {
      Objects: fileKeys.map((file) => ({ Key: file })),
    },
  };

  try {
    const response = await s3Client.send(new DeleteObjectCommand(params));
    return {
      status: true,
      type: 'OK',
      data: response,
      message: 'File deleted Successfully',
    };
  } catch (err) {
    return {
      status: false,
      type: 'ERROR',
      data: {},
      message: 'Something went wrong while deleting file',
    };
  }
};

// Function to copy a file within the same S3 bucket
const s3CopyFile = async ({ sourcePath, destinationPath, bucketName = s3BucketName }) => {
  const params = {
    Bucket: bucketName,
    CopySource: `${bucketName}/${sourcePath}`,
    Key: destinationPath,
  };

  try {
    const response = await s3Client.send(new CopyObjectCommand(params));
    return {
      status: true,
      type: 'OK',
      data: response,
      message: 'File copied Successfully',
    };
  } catch (err) {
    return {
      status: false,
      type: 'ERROR',
      data: {},
      message: 'Something went wrong while copying file',
    };
  }
};

const s3GetObject = async ({ pathname = '', buffer = false, bucketName = s3BucketName }) => {
  const params = {
    Bucket: bucketName,
    Key: pathname,
  };

  try {
    const response = await s3Client.send(new GetObjectCommand(params));
    let returnData = response.Body;

    if (buffer) {
      const chunks = [];

      for await (const chunk of response.Body) {
        chunks.push(chunk);
      }

      returnData = Buffer.concat(chunks);
    }

    return {
      status: true,
      type: 'OK',
      data: returnData,
      message: 'File retrieved successfully',
    };
  } catch (error) {
    return {
      status: false,
      type: 'ERROR',
      data: {},
      message: 'Something went wrong while getting file',
    };
  }
};

module.exports = {
  s3CreateBucket,
  s3CreateFolder,
  s3UploadFile,
  s3ListObjects,
  s3DeleteObject,
  s3CopyFile,
  s3GetObject,
};
