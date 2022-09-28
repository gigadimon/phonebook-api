const Jimp = require("jimp");
const fs = require("fs");
const path = require("path");

const uploadController = async (req, res, next) => {
  const { filename } = req.file;
  const [, extention] = filename.split(".");
  Jimp.read(path.resolve(`./tmp/${filename}`), (err, avatar) => {
    if (err) next(err);
    avatar
      .resize(250, 250)
      .write(
        path.resolve(`./public/avatars/${req.user._id}.${extention}`),
        () => {
          try {
            fs.unlinkSync(path.resolve(`./tmp/${filename}`));
          } catch (error) {
            next(error);
          }
        }
      );
  });
  next();
};

module.exports = { uploadController };
