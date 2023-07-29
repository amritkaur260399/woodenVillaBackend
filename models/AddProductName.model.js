const { Schema, model } = require("mongoose");

const AddProductName = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "AddProductName",
    },
    child: {
      type: Schema.Types.ObjectId,
      ref: "AddProductName",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    value: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("AddProductName", AddProductName, "addProductName");
