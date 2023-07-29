const Product = require("../../models/Product.model");
const { ObjectId } = require("mongoose").Types;

const statusChange = async (req, res) => {
  try {
    const id = req.params.id;
    const isActive = req.body.status;
    console.log(isActive);
    if (!id) {
      return res.status(400).json({
        message: "Please Specify Id",
        status: "error",
      });
    }
    const product = await Product.findById({
      _id: ObjectId(id),
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const productData = await Product.findByIdAndUpdate(
      {
        _id: ObjectId(id),
      },
      {
        isActive,
      },
      {
        new: true,
      }
    );
    return res.status(200).json({
      message: "Status updated successfully",
      data: productData,
    });
  } catch (error) {
    return res.status(400).json({
      message: "error",
    });
  }
};

module.exports = statusChange;
