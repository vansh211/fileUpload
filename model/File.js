const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const fileSchema = mongoose.Schema({
    name: {
        type : String,
        required : true
    },
    imageURL : {
        type : String
    },
    tags : {
        type : String
    },
    email : {
        type : String
    }
})

fileSchema.post("save", async function(doc) {
    try{
        console.log("DOC -> ",doc); // data comem from saving

        // create trabsporter -> Always create in config folder as nodemailer.js
        let transporter = nodemailer.createTransport({
            host : process.env.MAIL_HOST,
            auth : {
                user : process.env.MAIL_USER,
                pass : process.env.MAIL_PASS
            }
        })

        // mail send kro
        let info = await transporter.sendMail({
            from:"WaRRiOR - Yours only",
            to: doc.email,
            subject: "Your photo uploaded Babydoll",
            html:`<h2>Yayyy my princess</h2> <p>your photo is uploaded. <br> <a href="${doc.imageURL}">View Photo</a> </p>`
        })
        console.log(info);
    }
    catch(err) {
        console.log(err);
    }
})

const File = mongoose.model("File", fileSchema)
module.exports = File;