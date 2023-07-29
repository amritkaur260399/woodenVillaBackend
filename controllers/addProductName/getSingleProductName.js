const AddProductName = require("../../models/AddProductName.model");
const createError = require("http-errors");

const { ObjectId } = require("mongoose").Types;
const getSingleProductName = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await AddProductName.findOne({ _id: ObjectId(id) });
    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getSingleProductName;
