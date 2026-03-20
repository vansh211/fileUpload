const express = require('express')
const router = express.Router();

const {localFileUpload, fileUpload} = require("../controller/fileUpload")


// api routes
// router.post("/videoupload", videoUplaod);
// router.post("/imagereduceupload", imageReducerUpload);
router.post("/localFileUpload", localFileUpload);
router.post("/fileUpload", fileUpload);

module.exports = router;