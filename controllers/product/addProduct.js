const createError = require("http-errors");
const Product = require("../../models/Product.model");
const { productValidation } = require("../../services/validation_schema");
const uploadFiles = require("../../services/upload-files");
const formidable = require("formidable");
const addProduct = async (req, res, next) => {
  const form = new formidable.IncomingForm();
  const { user } = req;
  form.multiples = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      next(err);
    }
    console.log("files", files);
    try {
      const result = await productValidation.validateAsync(fields);
      const {
        productNameId,
        // subProductNameId,

        description,
        categoryId,
        price,
        subCategoryId,
        // inventory,
      } = result;

      const updatedProductImage =
        files?.image?.length > 0 && files?.image?.map((i) => Object.assign(i));

      const filesArray = !updatedProductImage
        ? [Object.assign(files?.image)]
        : updatedProductImage;
      let allFileUploadedArray = [];

      if (updatedProductImage?.length > 1) {
        allFileUploadedArray = await Promise.all(
          updatedProductImage?.map(async (item) => {
            let location = item.path;
            const originalFileName = item.name;
            const fileType = item.type;
            const data = await uploadFiles.upload(
              location,
              originalFileName,
              `hrLogix/`
            );
            return {
              url: data.Location,
              type: fileType,
            };
          })
        );
      } else if (!updatedProductImage) {
        allFileUploadedArray = await Promise.all(
          filesArray?.map(async (item) => {
            let location = item.path;
            const originalFileName = item.name;
            const fileType = item.type;
            const data = await uploadFiles.upload(
              location,
              originalFileName,
              `hrLogix`
            );

            return {
              url: data.Location,
              type: fileType,
            };
          })
        );
      }

      const product = new Product({
        productNameId,
        // subProductNameId,
        description,
        categoryId,
        subCategoryId,
        price,
        // inventory,
      });

      if (allFileUploadedArray.length > 0) {
        product.media = allFileUploadedArray;
      }

      await product.save();
      res.json({
        success: true,
        status: 200,
        message: "Product created successfully",
        product,
      });
    } catch (error) {
      next(error);
    }
  });
};

module.exports = addProduct;
