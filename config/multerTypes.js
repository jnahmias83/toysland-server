const multer = require("./multer");

const allowedTypes = {
  img: "img",
  vid: "vid",
  sound: "sound",
  doc: "doc",
  custom: "custom",
  any: "any",
};

const filterFileType = (file, cb, typeOptions, customTypes) => {
  try {
    let allowedFormats = undefined;
    switch (typeOptions) {
      case allowedTypes.any:
        cb(null, true);
        return;
      case allowedTypes.img:
        allowedFormats = [
          "image/apng",
          "image/avif",
          "image/gif",
          "image/jpeg",
          "image/png",
          "image/svg+xml",
          "image/webp",
        ];
        break;
      case allowedTypes.vid:
        allowedFormats = [
          "video/x-flv",
          "video/mp4",
          "application/x-mpegURL",
          "video/MP2T",
          "video/3gpp",
          "video/quicktime",
          "video/x-msvideo",
          "video/x-ms-wmv",
          "video/x-matroska",
          "video/mpeg",
        ];
        break;
      case allowedTypes.sound:
        allowedFormats = [
          "audio/x-wav",
          "audio/x-aiff",
          "audio/mpeg",
          "audio/mp3",
          "application/ogg",
          "audio/midi",
          "audio/x-midi",
        ];
        break;
      case allowedTypes.doc:
        allowedFormats = [
          "application/pdf",
          "application/vnd.ms-powerpoint",
          "application/vnd.openxmlformats-officedocument.presentationml.presentation",
          "text/plain",
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];
        break;
      case allowedTypes.custom:
        allowedFormats = customTypes;
        break;
    }
    cb(null, allowedFormats.includes(file.mimetype));
  } catch (err) {
    cb(new Error(err));
  }
};

const createMulter = (uploadTo, fileSize, typeOptions, customTypes) => {
  return multer(uploadTo, fileSize, (req, file, cb) => {
    filterFileType(file, cb, typeOptions, customTypes);
  });
};

module.exports = {
  allowedTypes,
  createMulter
};
