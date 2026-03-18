const express = require('express')
const router = express.Router();

const {localFileUpload} = require("../controller/fileUpload")


// api routes
// router.post("/imageupload", imageUpload);
// router.post("/videoupload", videoUplaod);
// router.post("/imagereduceupload", imageReducerUpload);
router.post("/localFileUpload", localFileUpload);

module.exports = router;