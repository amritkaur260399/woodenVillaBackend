const createError = require("http-errors");
const WishList = require("../../models/Wishlist.model");
const Product = require("../../models/Product.model");
const { result } = require("lodash");
const { ObjectId } = require("mongoose").Types;

const addToWishList = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const { _id: userId } = req.user;

    const alreadyExistInWishList = await WishList.findOne({
      productId: ObjectId(productId),
    });

    let wishlist = {};

    if (alreadyExistInWishList) {
      wishlist = await WishList.findOneAndUpdate(
        {
          productId: ObjectId(productId),
        },

        {
          new: true,
        }
      );
    } else if (!alreadyExistInWishList) {
      wishlist = new WishList({
        productId,
        userId,
      });
      await wishlist.save();
    }
    res.json({
      success: true,
      message: "Product added To wishlist sucessfully",
      wishlist,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = addToWishList;
