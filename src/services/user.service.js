const httpStatus = require('http-status');
const ApiError = require('@utils/ApiError');
const { toDotNotation } = require('../utils/utils');

const updateUser = async ({ params, body }) => {
  const { id } = params;
  const reqData = toDotNotation({ ...body });
  try {
    return await global.models[global.env.DOMAIN].USER.findOneAndUpdate(
      { _id: id },
      {
        $set: { ...reqData },
      },
    );
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, '');
  }
};

const retrieveUser = async ({ params }) => {
  const { id } = params;
  try {
    return await global.models[global.env.DOMAIN].USER.findOne({ _id: id });
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, '');
  }
};

module.exports = {
  updateUser,
  retrieveUser,
};

/** Example of image upload
 *const validateDocument = ({ files }) => {
 *  Object.keys(files).forEach((key) => {
 *    const validateFiles = FileManager.validateFile({
 *      fileToBeValidated: files[key],
 *      validationFieldName: key,
 *    });
 *
 *    if (!validateFiles.status) {
 *      throw new ApiError(httpStatus.BAD_REQUEST, validateFiles.type);
 *    }
 *  });
 *};
 *
 *const fileExistCheck = Object.keys(files);
 *const uploadedFiles = {};
 *
 *if (fileExistCheck?.length > 0) {
 *  validateDocument({ files });
 *  const currentYear = new Date().getFullYear();
 *
 *  for (const key in files) {
 *    const uploadFile = await FileManager.uploadPreValidatedFile({
 *      fileToUpload: files[key],
 *      uploadPath: actionWidgetDocumentPath,
 *      fieldName: key,
 *    });
 *
 *    if (!uploadFile.status) {
 *      throw new ApiError(httpStatus.BAD_REQUEST, uploadFile.type);
 *    }
 *
 *    // deleteOldImage({ actionWidgetDocumentPath, actionWidgetDoc });
 *
 *    const result = await Promise.resolve(
 *      addFolderOrFile({
 *        userId: user?.userId,
 *        belongs_to: {
 *          venue: _id,
 *        },
 *        type: 'File',
 *        client_file_name: files[key].name,
 *        file_name: uploadFile?.fileName,
 *        file_size_in_bytes: files[key].size,
 *        file_type: files[key].mimetype,
 *        file_path: actionWidgetDocumentPath,
 *        uploaded_in_year: currentYear,
 *      }),
 *    );
 *
 *    Object.defineProperties(uploadedFiles, {
 *      [key]: { value: `${actionWidgetDocumentPath}/${uploadFile?.fileName}`, writable: false, enumerable: true },
 *      [`${key}_id`]: { value: result.id, writable: false, enumerable: true },
 *    });
 *  }
 *}
 */
