const createError = require("http-errors");
const AddProductName = require("../../models/AddProductName.model");
const Product = require("../../models/Product.model");
const { ObjectId } = require("mongoose").Types;

const updateSubProductName = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    await AddProductName.findOneAndUpdate(
      { _id: ObjectId(id) },
      { name },
      {
        new: true,
      }
    );

    res.json({
      message: "Name Updated successfully.",
      success: true,
    });
  } catch (err) {
    next(err);
  }
};
module.exports = updateSubProductName;
