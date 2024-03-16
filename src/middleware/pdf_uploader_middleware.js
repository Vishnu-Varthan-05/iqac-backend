const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/course_excemption/oc_certificates');
  },
  filename: (req, file, cb) => {
    const originalName = file.originalname;
    cb(null, originalName);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  }
});

const pdf_uploader_middleware = (req, res, next) => {
  return new Promise((resolve, reject) => {
    upload.single('pdf')(req, res, (err) => {
      if (err) {
        if (err.code === 'LIMIT_UNEXPECTED_FILE') {
          req.body.pdf_path = '';
          resolve(next());
        } else {
          reject(err);
        }
      } else {
        if (!req.file) {
          req.body.pdf_path = '';
          resolve(next());
        } else {
          const pdf_path = path.join('uploads/course_excemption/oc_certificates', req.file.originalname);
          req.body.pdf_path = pdf_path;
          resolve(next());
        }
      }
    });
  });
};

module.exports = pdf_uploader_middleware;