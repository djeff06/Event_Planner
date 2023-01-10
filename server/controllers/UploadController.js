const { default: mongoose, Types } = require("mongoose");
const { getUploadPresignedUrl } = require("../services/upload");

const getUpload = async (req, res) => {
    const { filename } = req.params;
    console.log("file name", filename)
    const response = await getUploadPresignedUrl(filename);
    res.status(200).json(response);
    console.log(response)
  };

  module.exports = {
    getUpload,

  };