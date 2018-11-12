const router = require('express').Router();
const controller = require('./upload.controller');
//file upload 사용
const MAX_FILE_SIZE = 5 * 1024 * 1024
const path = require('path')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './img/');
    },
    filename: function (req, file, cb) {
      cb(null, new Date().valueOf() + path.extname(file.originalname));
    }
  })
const upload = multer({ storage: storage, limits: {fileSize: MAX_FILE_SIZE }})

router.post('/', upload.single('image'), controller.imageUpload);

module.exports = router;
