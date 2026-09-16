const multer = require('multer');
const path = require('path');
const fs = require('fs');
const uploadPath = path.join(__dirname, '..', 'uploads', 'images', 'cars');
fs.mkdirSync(uploadPath, { recursive: true });
const storage = multer.diskStorage({
  destination: uploadPath,
  filename: (req, file, cb) => cb(null, `car-${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname).toLowerCase()}`)
});
const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', 'image'));
};
module.exports = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });
