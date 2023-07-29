const createError = require("http-errors");
const Product = require("../../models/Product.model");
const { ObjectId } = require("mongoose").Types;
const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Product.findOneAndDelete({ _id: ObjectId(id) });

    res.json({
      success: true,
      status: 200,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteProduct;
