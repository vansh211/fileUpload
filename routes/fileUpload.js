const express = require('express')
const router = express.Router();

const {localFileUpload, fileUpload, videoUpload, fileReducer} = require("../controller/fileUpload")


// api routes
router.post("/videoupload", videoUpload);
router.post("/fileReducer", fileReducer);
router.post("/localFileUpload", localFileUpload);
router.post("/fileUpload", fileUpload);

module.exports = router;