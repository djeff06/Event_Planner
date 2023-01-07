// const { getUploadPresignedUrl } = require("../services/upload");
const express = require("express");
const { getUpload } = require("../controllers/UploadController");
const router = express.Router();


router.get("/:filename",getUpload);

module.exports = router;