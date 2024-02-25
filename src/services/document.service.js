const httpStatus = require('http-status');
const resizeImageParams = require('@utils/resizeImageParams');
const sharp = require('sharp');
const { ObjectId } = require('mongoose').Types;
const ApiError = require('../utils/ApiError');
const { s3ListObjects, s3DeleteObject, s3UploadFile } = require('../utils/s3FileManager');
const configuration = require('../config/configuration');
const logger = require('../config/logger');

const addFolderOrFile = async (data) => {
  const {
    userId,
    type,
    file_name,
    client_file_name,
    file_size_in_bytes,
    file_type,
    file_path,
    uploaded_in_year,
    belongs_to,
  } = data;

  // create folder
  if (type === 'folder') {
    const documentDoc = await global.models.GLOBAL.DOCUMENT.create({
      userId: userId ? new ObjectId(userId) : null,
      is_folder: true,
    });

    return documentDoc;
  }
  const documentDoc = await global.models.GLOBAL.DOCUMENT.create({
    userId: userId ? new ObjectId(userId) : null,
    is_folder: false,
    file_info: {
      client_file_name,
      file_name,
      file_size_in_bytes,
      file_type,
      file_path,
    },
    uploaded_in_year,
    belongs_to,
  });

  return documentDoc;
};

const updateDocument = async (data) => {
  const { documentId, file_name, client_file_name, file_size_in_bytes, file_type, file_path, uploaded_in_year } = data;

  const reqData = {
    file_info: {
      client_file_name,
      file_name,
      file_size_in_bytes,
      file_type,
      file_path,
    },
    uploaded_in_year,
  };

  try {
    const response = await global.models.GLOBAL.DOCUMENT.findOneAndUpdate({ _id: documentId }, { $set: reqData });
    return response;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, '');
  }
};

const deleteOptimizedImage = async ({ path = '', fileName = '' }) => {
  const listS3Objects = await s3ListObjects({ bucketName: configuration.AWS.S3_OPTIMIZED_IMAGE_BUCKET, prefix: path });
  if (!listS3Objects.status) {
    return;
  }

  // eslint-disable-next-line array-callback-return, consistent-return
  const objectsToDelete = listS3Objects.data.Contents.map((object) => {
    const match = object.Key.split('-');
    if (match && match[1] === fileName) {
      return object.Key;
    }
  });

  if (objectsToDelete.length === 0) {
    logger.info('No matching objects found.');
    return;
  }

  await s3DeleteObject({ filePath: objectsToDelete, bucketName: configuration.AWS.S3_OPTIMIZED_IMAGE_BUCKET });
};

const createAndUploadResizedImage = async ({ fileName = '', file = '', path = '', resizeParam = '' }) => {
  const resizedResolution = resizeImageParams[resizeParam];
  for (const rip of resizedResolution) {
    const resized = sharp(file).resize(parseInt(rip.width, 10), parseInt(rip.height, 10), { fit: rip.fit }).toBuffer();
    const makeOptimizedFileName = `${rip.width}x${rip.height}_${rip.fit}-${fileName}`;

    s3UploadFile({
      fileToUpload: { data: resized },
      uploadPath: path,
      fileName: makeOptimizedFileName,
      bucketName: configuration.AWS.S3_OPTIMIZED_IMAGE_BUCKET,
    });
  }
};

module.exports = {
  addFolderOrFile,
  updateDocument,
  createAndUploadResizedImage,
  deleteOptimizedImage,
};
