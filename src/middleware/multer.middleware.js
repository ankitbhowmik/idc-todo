const multer = require("multer");

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    },
    destination: (req, file, cb) => {
        cb(null, "./public/profile")
    }
});
const limits = { fileSize: 1e6 };        //file size in bytes

const upload = multer({ storage, limits });

module.exports = upload;
