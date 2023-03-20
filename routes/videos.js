const express = require("express");
const multer = require("multer");
const router = express.Router();
const videoController = require("../controllers/videoControllers");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const filter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 30 },
  fileFilter: filter,
});

router
  .route("/")
  .get(videoController.videoList)
  .post(upload.single("image"), videoController.postVideo);

router
  .route("/:id")
  .get(videoController.videoDetail)
  .put(videoController.likeVideo);

router
  .route("/:id/comments")
  .get(videoController.videoComments)
  .post(videoController.postComment);

router
  .route("/:id/comments/:commentId")
  .delete(videoController.deleteComment)
  .put(videoController.likeComment);

module.exports = router;
