const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve("./tmp"));
  },
  filename: (req, file, cb) => {
    const [fileName, extention] = file.originalname.split(".");
    cb(null, `${fileName}.${extention}`);
  },
});
const upload = multer({ storage });

module.exports = { upload };
