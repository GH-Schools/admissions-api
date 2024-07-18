const fs = require('fs');
const path = require('path');
const multer = require('multer');
const GeneralError = require('../errorHelpers/interfaces/GeneralError');

let a = 1;

if (!fs.existsSync('uploads')) {
  console.log('uploads folder not found');
  fs.mkdir('uploads', (err) => {
    if (err) {
      console.error(err.message);
    }
  });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    // eslint-disable-next-line no-plusplus
    console.log(a++);
    const extension = path.extname(file.originalname);
    const currentTimeMS = Date.now();
    const randomNumber = Math.round(Math.random() * 1e9);
    const uniqueSuffix = `${randomNumber}-${currentTimeMS}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}${extension}`);
  },
});

const fileFilter = (req, file, cb) => {
  try {
    const imageFileSizeLimit = 2 * 1024 * 1024;
    const audioFileSizeLimit = 2 * 1024 * 1024;
    const fileSize = parseInt(req.headers['content-length'], 10);
    // console.log(req);

    const supportedTypes = /jpeg|jpg|png|gif|svg|bmp|mp3|mpeg|wav|csv/i;
    const imageFileTypes = /jpeg|jpg|png|gif|svg|bmp/i;
    const audioFileTypes = /mp3|mpeg|wav/i;

    const isImageMimeType = imageFileTypes.test(file.mimetype);
    const isImageExt = imageFileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    // console.log(file.mimetype);
    const isAudioMimeType = audioFileTypes.test(file.mimetype);
    const isAudioExt = audioFileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (isImageExt && isImageMimeType) {
      if (fileSize < imageFileSizeLimit) {
        cb(null, true);
      } else {
        cb(
          new GeneralError(
            'SIZE_LIMIT_EXCEEDED',
            400,
            true,
            'Files are too large. Maximum file size is 2MB'
          )
        );
      }
    }

    if (isAudioExt && isAudioMimeType) {
      if (fileSize < audioFileSizeLimit) {
        cb(null, true);
      } else {
        cb(
          new GeneralError(
            'SIZE_LIMIT_EXCEEDED',
            400,
            true,
            'Files are too large. Maximum file size is 2MB'
          )
        );
      }
    }

    if (!supportedTypes.test(path.extname(file.originalname).toLowerCase())) {
      cb(
        new GeneralError(
          'UNSUPPORTED_FILE_TYPE',
          400,
          true,
          'File type not supported'
        )
      );
    } else {
      cb(null, true);
    }
  } catch (error) {
    cb(error);
  }
};

const upload = multer({
  storage,
  fileFilter,
  // limits: {
  //   // files: 5, // allow up to 5 files per request,
  //   fieldSize: 2 * 1024 * 1024 // 2 MB (max file size)
  // },
});

module.exports = upload;
