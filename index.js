//app create
const express  = require("express");
require('dotenv').config();

// create app and get port
const app = express();
const PORT = process.env.PORT || 3000;


// middlewares
app.use(express.json());// for json type data
const fileUpload = require('express-fileupload'); // simple middleware to upload files
// app.use(fileUpload());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}));
// database coonnect
const connectDB = require("./config/database");
connectDB();

//cloudinary connect
const cloudConnect = require('./config/cloudinary');
cloudConnect.cloudinaryConnect();

//routes add
const uploads = require("./routes/fileUpload")
app.use("/api/v1", uploads);


// server started
app.listen(PORT, () => {
    console.log(`app is runnnig at ${PORT}`)
})