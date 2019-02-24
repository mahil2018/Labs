const cloudinary = require ('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');
cloudinary.config({
  cloud_name: '*********',
  api_key: '****************',
  api_secret: 'W********************o0SRg'
});

var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'gallery', // The name of the folder in cloudinary
  allowedFormats: ['jpg', 'png'],
  // params: { resource_type: 'raw'}, => this is in case you want to upload other type of files, or just images,
  filename: function (req, file, cb) {
    cb(null, file.originalname); // The file on cloudinary would have the same name as the original file name
  }
});
const fileUploader = multer({ storage: storage });

// cloudName   = 'dvnfnri9o'
// cloudKey    = '241634629516142'
// cloudSecret = 'wn5wy62Nn4CMPopnVeeV8hHwZjU'

module.exports = fileUploader;
