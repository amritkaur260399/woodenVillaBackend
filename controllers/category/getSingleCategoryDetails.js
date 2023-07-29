const Category = require("../../models/Category.model");
const createError = require("http-errors");
const { ObjectId } = require("mongoose").Types;
const getSingleCategoryDetails = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await Category.findOne({ _id: ObjectId(id) });
    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getSingleCategoryDetails;
