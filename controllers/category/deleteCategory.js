const createError = require("http-errors");
const Category = require("../../models/Category.model");
const Product = require("../../models/Product.model");
const { ObjectId } = require("mongoose").Types;

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Category.findOneAndDelete({ _id: ObjectId(id) });
    await Category.findOneAndDelete({ parent: ObjectId(id) });
    await Product.findOneAndDelete({ categoryId: ObjectId(id) });
    res.json({
      message: " Category deleted successfully.",
      success: true,
    });
  } catch (err) {
    next(err);
  }
};
module.exports = deleteCategory;
