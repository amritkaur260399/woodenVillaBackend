const createError = require("http-errors");
const Product = require("../../models/Product.model");
const { ObjectId } = require("mongoose").Types;
const deleteProduct = async (req, res, next) => {
  try {
    const { productId, imageId } = req.params;
    const product = await Product.findOne({ _id: ObjectId(productId) });

    let updatedImages = product?.media.filter(
      (i) => i?._id.toString() !== imageId
    );

    product.media = updatedImages;
    await product.save();
    res.json({
      success: true,
      status: 200,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteProduct;
