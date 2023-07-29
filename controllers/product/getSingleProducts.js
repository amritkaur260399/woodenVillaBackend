const createError = require("http-errors");
const Product = require("../../models/Product.model");
const { ObjectId } = require("mongoose").Types;

const getSingleProducts = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.aggregate([
      {
        $match: {
          _id: ObjectId(id),
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
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: {
          path: "$category",
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "subCategoryId",
          foreignField: "_id",
          as: "subCategory",
        },
      },
      {
        $unwind: {
          path: "$subCategory",
        },
      },

      {
        $lookup: {
          from: "feedbacks",
          localField: "_id",
          foreignField: "productId",
          as: "feedbacks",
        },
      },

      {
        $addFields: {
          averageRating: { $avg: "$feedbacks.rating" },
        },
      },

      {
        $addFields: {
          averageRating: { $round: ["$averageRating", 1] },
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
    ]);
    res.json({
      success: true,
      status: 200,
      message: "Product fetched successfully",
      product: product[0],
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getSingleProducts;
