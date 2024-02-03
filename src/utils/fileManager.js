const crypto = require("crypto");
const path = require("path");

const { s3CreateFolder, s3UploadFile, s3DeleteObject, s3CopyFile } = require("./s3FileManager");
const { makeFoldersToLocalDisk, copyFileToLocalDisk, uploadFileToLocalDisk } = require("./localFileManager");

const storageType = global.env.STORAGE_TYPE;

const fileTypesRegex = {
  image: "\\.(png|jpg|jpeg)$",
};

function getFileTypeRegex(filetype) {
  let filetypeRegex = fileTypesRegex[filetype];

  if (!filetypeRegex) {
    filetypeRegex = `\\.(${filetype})$`;
  }

  return filetypeRegex;
}

function getUniqueName() {
  const randomBytes = crypto.randomBytes(1);
  const random_char = (randomBytes[0] / 256 + 1).toString().charAt(7);
  const unique_name = `${new Date().getTime()}${new Date().getMilliseconds()}${random_char}`;
  return unique_name;
}

function makeFolders(dirPath) {
  if (storageType === "s3") {
    s3CreateFolder({ dirPath });
  } else {
    makeFoldersToLocalDisk({ dirPath });
  }
}

function validateFile({
  fileToBeValidated,
  maxAllowedFileSizeInMB = 5,
  allowedFileType = "png|jpeg|jpg",
  validationFieldName = "File",
}) {
  if (fileToBeValidated) {
    const fileSizeLimit = maxAllowedFileSizeInMB * 1000000;

    // validating file type
    const fileTypeRegex = getFileTypeRegex(allowedFileType);

    let fileExtension = path.extname(fileToBeValidated.name);
    fileExtension = fileExtension ? fileExtension.toLowerCase() : "";

    if (!RegExp(fileTypeRegex).test(fileExtension)) {
      const regex = String(fileTypeRegex);
      const extensions = regex
        .substring(regex.indexOf("(") + 1, regex.lastIndexOf(")"))
        .split("|")
        .join(", ");

      return {
        status: false,
        type: "invalid_extension",
        message: `Invalid Extension. Only ${extensions} are allowed`,
      };
    }

    // validating file size
    if (fileToBeValidated.size > fileSizeLimit) {
      return {
        status: false,
        type: "size_limit_exceeded",
        message: `${validationFieldName} size must be less than ${maxAllowedFileSizeInMB} MB`,
      };
    }

    return {
      status: true,
      message: `${validationFieldName} Validated Successfully`,
    };
  } 
    return {
      status: false,
      type: "not_found",
      message: `${validationFieldName} is required`,
    };
  
}

async function validateAndUploadFile({
  fileToUpload,
  uploadPath,
  fileName = "",
  maxAllowedFileSizeInMB = 5,
  allowedFileType = "png|jpeg",
  validationFieldName = "File",
}) {
  if (fileToUpload) {
    const fileSizeLimit = maxAllowedFileSizeInMB * 1000000;

    // creating file name if not specified
    if (!fileName) {
      fileName = `${getUniqueName()}${path.extname(fileToUpload.name)}`;
    }

    fileName = fileName.toLowerCase();

    // validating file type
    const fileTypeRegex = getFileTypeRegex(allowedFileType);

    if (!RegExp(fileTypeRegex).test(fileName)) {
      const regex = String(fileTypeRegex);
      const extensions = regex
        .substring(regex.indexOf("(") + 1, regex.lastIndexOf(")"))
        .split("|")
        .join(", ");

      return {
        status: false,
        type: "Invalid extension",
        message: `Invalid Extension. Only ${extensions} are allowed`,
      };
    }

    // validating file size
    if (fileToUpload.size > fileSizeLimit) {
      return {
        status: false,
        type: "Size limit exceeded",
        message: `${validationFieldName} size must be less than ${maxAllowedFileSizeInMB} MB`,
      };
    }

    if (storageType === "s3") {
      return s3UploadFile({ fileToUpload, uploadPath, fileName, validationFieldName });
    } 
      return uploadFileToLocalDisk({ fileToUpload, uploadPath, fileName, validationFieldName });
    
  } 
    return {
      status: false,
      type: "File not found",
      message: `${validationFieldName} is required`,
    };
  
}

async function uploadPreValidatedFile({ fileToUpload, uploadPath, fileName = "", fieldName = "File" }) {
  if (fileToUpload) {
    // creating file name if not specified
    if (!fileName) {
      fileName = `${getUniqueName()}${path.extname(fileToUpload.name)}`;
    }

    fileName = fileName.toLowerCase();

    if (storageType === "s3") {
      return s3UploadFile({ fileToUpload, uploadPath, fileName });
    } 
      return uploadFileToLocalDisk({ fileToUpload, uploadPath, fileName });
    
  } 
    return {
      status: false,
      type: "not_found",
      message: `${fieldName} is required`,
    };
  
}

async function deleteFileOrFolder({ filePath }) {
  if (storageType === "s3") {
    s3DeleteObject({ filePath });
  } else {
    deleteFileOrFolderToLocalDisk({ filePath });
  }
}

function copyFileLocally({ sourcePath, destinationPath }) {
  if (storageType === "s3") {
    return s3CopyFile({ sourcePath, destinationPath });
  } 
    return copyFileToLocalDisk({ sourcePath, destinationPath });
  
}

module.exports = {
  makeFolders,
  validateFile,
  validateAndUploadFile,
  uploadPreValidatedFile,
  deleteFileOrFolder,
  copyFileLocally,
};
