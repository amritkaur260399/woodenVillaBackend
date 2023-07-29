const Category = require("../../models/Category.model");
const createError = require("http-errors");
const { ObjectId } = require("mongoose").Types;
const getSubCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const subCategory = Category.findOne({ _id: ObjectId(categoryId) });

    res.status(200).json({
      success: true,
      data: subCategory,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getSubCategory;
