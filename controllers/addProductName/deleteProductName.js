const createError = require("http-errors");
const AddProductName = require("../../models/AddProductName.model");
const Product = require("../../models/Product.model");
const { ObjectId } = require("mongoose").Types;

const deleteProductName = async (req, res, next) => {
  try {
    const { id } = req.params;
    await AddProductName.findOneAndDelete({ _id: ObjectId(id) });
    await Product.findOneAndDelete({ productNameId: ObjectId(id) });
    await Product.findOneAndDelete({ subProductNameId: ObjectId(id) });
    res.json({
      message: " ProductName deleted successfully.",
      success: true,
    });
  } catch (err) {
    next(err);
  }
};
module.exports = deleteProductName;
