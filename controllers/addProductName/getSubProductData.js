const AddProductName = require("../../models/AddProductName.model");
const createError = require("http-errors");

const { ObjectId } = require("mongoose").Types;
const getSubProductData = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await AddProductName.find({ parent: ObjectId(id) });
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getSubProductData;
