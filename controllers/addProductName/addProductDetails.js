const AddProductName = require("../../models/AddProductName.model");
const createError = require("http-errors");
const formidable = require("formidable");

const addProductDetails = async (req, res, next) => {
  try {
    const { name } = req.body;
    const findProductName = await AddProductName.findOne({ name });
    if (findProductName) {
      throw createError.NotFound("Product name already exists.");
    }
    const product = new AddProductName({ name });
    await product.save();

    res.json({
      success: true,
      status: 200,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addProductDetails;
