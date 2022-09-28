const express = require("express");
const {
  registrateUser,
  loginUser,
  logoutUser,
  currentUser,
  updateSubscribtion,
  updateAvatar,
} = require("../../controllers/userController");
const router = express.Router();
const {
  validateUser,
  subscribtionValidate,
} = require("../../validation/userValidation");
const { asyncWrapper } = require("../../helpers/asyncWrapper");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const { upload } = require("../../middlewares/uploadMiddleware");
const { uploadController } = require("../../controllers/uploadController");

router.get("/logout", authMiddleware, asyncWrapper(logoutUser));
router.get("/current", authMiddleware, asyncWrapper(currentUser));
router.post("/signup", validateUser, asyncWrapper(registrateUser));
router.post("/login", validateUser, asyncWrapper(loginUser));
router.patch(
  "/",
  authMiddleware,
  subscribtionValidate,
  asyncWrapper(updateSubscribtion)
);
router.patch(
  "/avatars",
  [authMiddleware, upload.single("avatar"), uploadController],
  asyncWrapper(updateAvatar)
);

module.exports = router;
