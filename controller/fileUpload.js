const File = require("../model/File")

// local file handler
exports.localFileUpload = async(req, res) => {
    try{
        const file = req.files.file; // req.file keyword to get files + file to be wrie inkey for testing while papssinf thruogh body type form-data
        console.log("file is here babe  -> ", file);

        let path = __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}` // dir for pwd then date.now for unique name and file.name.split for getting extension like .jpg 
        console.log("Path -> ", path)

        file.mv(path, (err) => { // to move file to path
            console.log(err);
        })

        res.json({
            success : true,
            message : "file Uploaded success"
        })
    }
    catch(err) {
        console.log(err); 
    }
}