const fs = require("fs");
const path = require("path");
const logger = require("@config/logger");

async function ensureFileExists(filePath, defaultContent = '[]') {
  try {
      await fs.promises.access(filePath, fs.constants.F_OK);
      console.log(`File exists: ${filePath}`);
  } catch (err) {
      console.log(`File does not exist, creating: ${filePath}`);
      await fs.promises.writeFile(filePath, defaultContent);
  }
}

function makeFoldersToLocalDisk({ dirPath }) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

async function uploadFileToLocalDisk({ fileToUpload, uploadPath, fileName = "", validationFieldName = "File" }) {
  return new Promise((resolve) => {
    fileToUpload.mv(`${uploadPath}/${fileName}`, (err) => {
      if (err) {
        resolve({
          status: false,
          type: "Something went wrong",
          message: "Something went wrong while uploading file",
        });
        return;
      }

      resolve({
        status: true,
        fileName,
        message: `${validationFieldName} Uploaded Successfully`,
      });
    });
  });
}

const deleteFileOrFolderToLocalDisk = async ({ filePath }) => {
  const resolvedPath = path.resolve(filePath);

  if (fs.existsSync(resolvedPath)) {
    const stats = fs.statSync(resolvedPath);
    if (stats.isFile()) {
      fs.unlinkSync(resolvedPath);
      logger.info(`File ${resolvedPath} deleted successfully`);
    } else if (stats.isDirectory()) {
      fs.rmSync(resolvedPath, { recursive: true });
      logger.info(`Directory ${resolvedPath} deleted successfully`);
    } else {
      logger.info(`Path ${resolvedPath} is not a file or a directory`);
    }
  } else {
    logger.info(`Path ${resolvedPath} does not exist`);
  }
};

function copyFileToLocalDisk({ sourcePath, destinationPath }) {
  return new Promise((resolve, reject) => {
    try {
      fs.copyFile(sourcePath, destinationPath, (err) => {
        if (err) {
          reject("Something went wrong while copying file");
        } else {
          resolve("File deleted successfully");
        }
      });
    } catch (error) {
      reject("Something went wrong while copying file");
    }
  });
}

module.exports = {
  makeFoldersToLocalDisk,
  uploadFileToLocalDisk,
  deleteFileOrFolderToLocalDisk,
  copyFileToLocalDisk,
  ensureFileExists
};
