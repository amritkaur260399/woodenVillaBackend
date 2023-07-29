const createError = require("http-errors");
const WishList = require("../../models/Wishlist.model");
const { cartValidation } = require("../../services/validation_schema");
const Product = require("../../models/Product.model");
const { ObjectId } = require("mongoose").Types;

const deleteWishlist = async (req, res, next) => {
  try {
    const { id } = req.params;
    await WishList.findOneAndDelete({ _id: ObjectId(id) });

    res.json({
      success: true,
      message: "Wishlist deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteWishlist;
