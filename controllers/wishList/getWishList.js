// const createError = require("http.createError");
const WishList = require("../../models/Wishlist.model");
const { ObjectId } = require("mongoose").Types;
const { wishlistValidation } = require("../../services/validation_schema");
const Product = require("../../models/Product.model");

const getWishList = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const getWishList = await WishList.aggregate([
      {
        $match: {
          userId: ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "products",
          let: { id: "$productId" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ["$_id", "$$id"] }],
                },
              },
            },
            {
              $lookup: {
                from: "addProductName",
                localField: "productNameId",
                foreignField: "_id",
                as: "productName",
              },
            },
            {
              $unwind: {
                path: "$productName",
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $lookup: {
                from: "cart",
                localField: "_id",
                foreignField: "productId",
                as: "cart",
              },
            },
            {
              $addFields: {
                isAddedToCart: {
                  $in: ["$_id", "$cart.productId"],
                },
              },
            },
            {
              $lookup: {
                from: "wishLists",
                localField: "_id",
                foreignField: "productId",
                as: "wishlist",
              },
            },

            {
              $addFields: {
                isAddedToWishList: {
                  $in: ["$_id", "$wishlist.productId"],
                },
              },
            },
            // {
            //   $lookup: {
            //     from: "addProductName",
            //     localField: "subProductNameId",
            //     foreignField: "_id",
            //     as: "subProductName",
            //   },
            // },
            // {
            //   $unwind: {
            //     path: "$subProductName",
            //     preserveNullAndEmptyArrays: true,
            //   },
            // },
          ],
          as: "productDetails",
        },
      },
      {
        $unwind: {
          path: "$productDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);

    res.status(200).json({
      message: "success",
      getWishList,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = getWishList;
