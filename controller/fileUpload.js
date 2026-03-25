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
    

function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}


async function uploadFileToCloudinary(file, folder, quality) {
    const options = { folder };
    options.resource_type = "auto"; // to auto detect type of file and upload accordingly

    if (quality) {
        options.transformation = [{ quality }];
    }

    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.fileUpload = async (req, res) => {
    try {
        const { name, email, tags } = req.body;
        console.log(name + " " + email + " " + tags);

        // fetch image
        const file = req.files.image;
        console.log(file);

        // validation
        const validTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.').pop().toLowerCase();

        if (!isFileTypeSupported(fileType, validTypes)) {
            return res.status(400).json({
                success: false,
                message: "file type not supported"
            });
        }

        const response = await uploadFileToCloudinary(file, "fileUpload");
        console.log(response);

        const fileData = await File.create({
            name,
            imageURL: response.secure_url,
            tags,
            email
        });

        res.json({
            success: true,
            message: "image upload success",
            url : response.secure_url
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "error in catch",
            error: err.message,
            stack: err.stack
        });
    }
}

exports.videoUpload = async (req, res) => {
    console.log("route hit");
    try {
        const {name, email, tags} = req.body;
        console.log(name, email, tags);

        const video = req.files.video;
        console.log("VIDEO OBJECT:", video);

        const supportedType = ['mp4', 'mov'];
        const fileType = video.name.split('.')[1].toLowerCase();

        // file type check
        if(!isFileTypeSupported(fileType, supportedType)) {
            console.log("not supported");
            return res.status(400).json({
                success: false,
                message: "File type not supported"
            });
        }

        // ✅ file size check (5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if(video.size > maxSize) {
            return res.status(400).json({
                success: false,
                message: "File size exceeds 5MB limit"
            });
        }

        const response = await uploadFileToCloudinary(video, "fileUpload");
        console.log(response);

        const fileData = await File.create({
            name,
            imageURL: response.secure_url,
            tags,
            email
        });

        res.json({
            success: true,
            message: "video upload success",
            url: response.secure_url
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            messge: "errr in catch"
        });
    }
}

exports.fileReducer = async(req, res) => {
    try {
        const { name, email, tags } = req.body;
        console.log(name + " " + email + " " + tags);

        // fetch image
        const file = req.files.image;
        console.log(file);

        // validation
        const validTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if (!isFileTypeSupported(fileType, validTypes)) {
            return res.status(400).json({
                success: false,
                message: "file type not supported"
            });
        }

        const response = await uploadFileToCloudinary(file, "fileUpload", 30);
        console.log(response);

        const fileData = await File.create({
            name,
            imageURL: response.secure_url,
            tags,
            email
        });

        res.json({
            success: true,
            message: "image upload success",
            url : response.secure_url
        });
    }
    catch(err) {
        console.log(err);
        res.status(500).json({
            succces : false,
            message : 'erro in catcbjcd'
        })
    }
}