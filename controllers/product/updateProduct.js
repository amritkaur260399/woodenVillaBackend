const createError = require("http-errors");
const Product = require("../../models/Product.model");
const formidable = require("formidable");
const uploadFiles = require("../../services/upload-files");
const { ObjectId } = require("mongoose").Types;
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const form = new formidable.IncomingForm();
    form.multiples = true;
    form.parse(req, async (err, fields, files) => {
      if (err) {
        next(err);
      }
      const {
        name,
        description,
        price,
        categoryId,
        subCategoryId,
        productNameId,
        // subProductNameId,
        // inventory,
      } = fields;
      let allFileUploadedArray = [];

      if (files?.image) {
        const updatedProductImage =
          !!files?.image?.path === false &&
          files?.image?.map((i) => Object.assign(i));

        const filesArray = !updatedProductImage
          ? [Object.assign(files?.image)]
          : updatedProductImage;

        if (updatedProductImage?.length > 1) {
          allFileUploadedArray = await Promise.all(
            updatedProductImage?.map(async (item) => {
              let location = item.filepath || item?.path;
              const originalFileName = item.originalFilename || item?.name;
              const fileType = item.mimetype || item?.type;
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
              let location = item.filepath || item?.path;
              const originalFileName = item.originalFilename || item?.name;
              const fileType = item.mimetype || item?.type;
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
      }
      const productsExist = await Product.findOne({ _id: ObjectId(id) });
      console.log(productsExist, "productsExist");
      const payload = {
        name: name,
        productNameId,
        // subProductNameId,
        description: description,
        categoryId: categoryId,
        subCategoryId: subCategoryId,
        price: price,
        // inventory,
      };

      const product = await Product.findOneAndUpdate(
        { _id: ObjectId(id) },
        payload,
        {
          new: true,
        }
      );
      if (allFileUploadedArray.length > 0) {
        product.media = [...productsExist?.media, ...allFileUploadedArray];
      }
      await product.save();
      res.json({
        success: true,
        message: "Product updated successfully",
        data: product,
      });
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateProduct;
