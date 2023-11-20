import { v2 as cloudinary } from "cloudinary";
require("dotenv").config();
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (locapFilePath) => {
  try {
    if (!locapFilePath) return null;
    //   upload file on teh cloudinary

    const responce = await cloudinary.v2.uploader.upload(locapFilePath, {
      resource_type: "auto",
    });

    // file has been uploded suceesss
    console.log("fle is uploded on cloudinary ", responce.url);
    return responce;
  } catch (error) {
    fs.unlinkSync(locapFilePath);
    return null;
  }
};

module.exports = { uploadOnCloudinary };
