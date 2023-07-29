const AddProductName = require("../../models/AddProductName.model");
const createError = require("http-errors");

const getProductNameList = async (req, res, next) => {
  try {
    const { query } = req;
    const startIndex = (query.startIndex && parseInt(query.startIndex)) || 0;
    const viewSize = (query.viewSize && parseInt(query.viewSize)) || 10;
    let searchCriteria = {};

    const { keyword } = req.query;
    if (keyword) {
      searchCriteria = {
        ...searchCriteria,
        name: { $regex: `^${keyword}`, $options: "i" },
      };
    }
    const allProducts = await AddProductName.aggregate([
      { $match: { ...searchCriteria, parent: { $exists: false } } },
      {
        $facet: {
          data: [
            {
              $lookup: {
                from: "categories",
                localField: "_id",
                foreignField: "parent",
                as: "subCategory",
              },
            },
            {
              $sort: {
                createdAt: -1,
              },
            },
            { $skip: startIndex },
            { $limit: parseInt(viewSize) },
          ],
          count: [
            {
              $count: "total",
            },
          ],
        },
      },
    ]);
    res.status(200).json({
      success: true,
      count: allProducts?.[0]?.count?.[0]?.total,
      data: allProducts?.[0]?.data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getProductNameList;
