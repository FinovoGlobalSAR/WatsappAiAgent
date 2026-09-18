const multer = require("multer");

const allowed = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

const fileFilter = (req, file, cb) => {
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", "images"));
  }
};

module.exports = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: {
    files: 6,
    fileSize: 5 * 1024 * 1024,
  },
});
