const Feedback = require("../../models/Feedback.model");

const { ObjectId } = require("mongoose").Types;
const getProducts = async (req, res, next) => {
  try {
    const { productId } = req.query;
    const { query } = req;
    const startIndex = (query.startIndex && parseInt(query.startIndex)) || 0;
    const viewSize = (query.viewSize && parseInt(query.viewSize)) || 10;
    let searchCriteria = {};
    if (productId) {
      searchCriteria = {
        ...searchCriteria,
        productId: ObjectId(productId),
      };
    }
    if (keyword) {
      searchCriteria = {
        ...searchCriteria,
        "productDetails.user.name": { $regex: `${keyword}`, $options: "i" },
      };
    }

    const feedbacks = await Feedback.aggregate([
      {
        $facet: {
          data: [
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
                      from: "users",
                      localField: "userId",
                      foreignField: "_id",
                      as: "user",
                    },
                  },
                  {
                    $unwind: {
                      path: "$user",
                      preserveNullAndEmptyArrays: true,
                    },
                  },
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
            {
              $sort: {
                createdAt: -1,
              },
            },
            {
              $match: searchCriteria,
            },
            { $skip: startIndex },
            { $limit: parseInt(viewSize) },
          ],
          count: [
            {
              $match: searchCriteria,
            },
            {
              $count: "total",
            },
          ],
        },
      },
    ]);
    const totalCount = await Feedback.countDocuments();
    res.json({
      success: true,
      status: 200,
      message: "Product fetched successfully",
      count: feedbacks?.[0]?.count?.[0]?.total,
      data: feedbacks?.[0]?.data,
      totalCount,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getProducts;
