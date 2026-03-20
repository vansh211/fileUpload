const File = require("../model/File")
const cloudinary = require('cloudinary').v2;

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
    
    function isFileTypeSupported(type, supportedType) {
        return supportedType.include(type)
    }

    async function uploadFileToCloudinary(file, folder) {
            const options = {folder};
          return await cloudinary.uploader.upload(file.tempFilePath, options);
    }

exports.fileUpload = async(req, res) => {
    try {
        const {name, email, tags} = req.body;
        console.log(name + " " + email + " " + tag);

        // fetch image
        const image = req.files.image;
        console.log(image);

        // validation
        const validtype =  ["jpg", "jpeg", "png"];
        const fileType = image.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType, validtype)) {
            return res.status(400).json({
                success : false,
                message : "file type not supported"
            })
        }

        const respose = await uploadFileToCloudinary(file, "fileUpload"); 
        console.log(respose)

        // const fileData = File.create({
        //     name,
        //     imageURL,
        //     tags,
        //     email
        // })

        res.json({
            success : true,
            message : "image upload success"
        })

    }
    catch(err) {
        return res.status(500).json({
            success : false,
            message:"error in catch"
        })
    }
}