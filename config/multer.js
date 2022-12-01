const multer = require("multer");
const path = require("path");

const createMulter = (uploadTo, fileSize, fileFilterFunction) => {
  const multerConfig = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadTo);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const fileObj = path.parse(file.originalname);
      cb(null, `${fileObj.name}_${uniqueSuffix}${fileObj.ext}`);
    },
  });
  return multer({
    storage: multerConfig,
    limits: {
      fileSize,
    },
    fileFilter: fileFilterFunction,
  });
};

module.exports = createMulter;