// const AWS = require('aws-sdk');
const fs = require("fs/promises");
const { v2: cloudinary } = require("cloudinary");

const helpers = require("./helpers");

module.exports = {
  /**
   * Upload image to cloudinary
   * @param {string} filePath path to file
   * @param {string} fileName public name of file
   */
  cloudinaryUpload: async (filePath, fileName) => {
    try {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET,
      });

      const result = await cloudinary.uploader.upload(
        filePath,
        { public_id: helpers.formatAsSlug(`${fileName}`.replace(/\.(.+)$/gi, '')) }
      );

      console.log(result);
      await fs.unlink(filePath);

      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
