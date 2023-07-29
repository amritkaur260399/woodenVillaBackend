const AddProductName = require("../../models/AddProductName.model");

const createError = require("http-errors");
const { ObjectId } = require("mongoose").Types;
const getAllSubProductDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
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
    const product = await AddProductName.aggregate([
      {
        $match: { ...searchCriteria, parent: ObjectId(id) },
      },
      {
        $facet: {
          data: [{ $skip: startIndex }, { $limit: parseInt(viewSize) }],
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
      count: product?.[0]?.count?.[0]?.total,
      data: product?.[0]?.data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllSubProductDetails;
