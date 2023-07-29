const Category = require("../../models/Category.model");
const createError = require("http-errors");
const formidable = require("formidable");
const uploadFiles = require("../../services/upload-files");
const { ObjectId } = require("mongoose").Types;
const updateCategory = async (req, res, next) => {
  try {
    const form = new formidable.IncomingForm();
    const { user } = req;
    form.multiples = true;
    form.parse(req, async (err, fields, files) => {
      if (err) {
        next(err);
      }
      try {
        const { name, description } = fields;
        const { id } = req.params;

        const value = name?.replace(" ", "_");
        let allFileUploadedArray = [];

        if (files.image) {
          const updatedCategoryImage =
            files?.image?.length > 0 &&
            files?.image?.map((i) => Object.assign(i));

          const filesArray = !updatedCategoryImage
            ? [Object.assign(files?.image)]
            : updatedCategoryImage;

          if (updatedCategoryImage?.length > 1) {
            allFileUploadedArray = await Promise.all(
              updatedCategoryImage?.map(async (item) => {
                let location = item.path || item?.filepath;
                const originalFileName = item.name || item?.originalFilename;
                const fileType = item.type || item?.mimeType;
                const data = await uploadFiles.upload(
                  location,
                  originalFileName,
                  `woodandvilla/`
                );
                return {
                  url: data.Location,
                  type: fileType,
                };
              })
            );
          } else if (!updatedCategoryImage) {
            allFileUploadedArray = await Promise.all(
              filesArray?.map(async (item) => {
                let location = item.path || item?.filepath;
                const originalFileName = item.name || item?.originalFilename;
                const fileType = item.type || item?.mimeType;
                const data = await uploadFiles.upload(
                  location,
                  originalFileName,
                  `woodandvilla`
                );

                return {
                  url: data.Location,
                  type: fileType,
                };
              })
            );
          }
        }

        const category = await Category.findOneAndUpdate(
          { _id: ObjectId(id) },
          { name, description, value },
          { new: true }
        );

        if (allFileUploadedArray.length > 0) {
          category.media = allFileUploadedArray;
        }
        await category.save();

        res.json({
          success: true,
          status: 200,
          message: "Category created successfully",
        });
      } catch (error) {
        next(error);
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateCategory;
