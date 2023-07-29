const AddProductName = require("../../models/AddProductName.model");
const createError = require("http-errors");
const formidable = require("formidable");

const addSubProductDetails = async (req, res, next) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const findProductName = await AddProductName.findOne({ name });
    if (findProductName) {
      throw createError.NotFound("Product name already exists.");
    }
    const product = new AddProductName({ name, parent: id });
    await product.save();

    res.json({
      success: true,
      status: 200,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addSubProductDetails;
