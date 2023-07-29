const Category = require("../../models/Category.model");
const createError = require("http-errors");

const getAllCategory = async (req, res, next) => {
  try {
    const startIndex =
      (req?.query?.startIndex && parseInt(req?.query?.startIndex)) || 0;
    const viewSize =
      (req?.query?.viewSize && parseInt(req?.query?.viewSize)) || 10;
    let searchCriteria = {};

    if (keyword) {
      searchCriteria = {
        ...searchCriteria,
        name: { $regex: `^${keyword}`, $options: "i" },
      };
    }
    const allCategory = await Category.aggregate([
      { $match: { ...searchCriteria, parent: { $exists: false } } },
      {
        $facet: {
          data: [
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
      count: allCategory?.[0]?.count?.[0]?.total,
      data: allCategory?.[0]?.data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllCategory;
