const createError = require("http-errors");
const Cart = require("../../models/Cart.model");
const { cartValidation } = require("../../services/validation_schema");
const Product = require("../../models/Product.model");
const { ObjectId } = require("mongoose").Types;

const deleteCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Cart.findOneAndDelete({ _id: ObjectId(id) });

    res.json({
      success: true,
      message: "Product quantity delete successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteCart;
