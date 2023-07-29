const { Schema, model } = require("mongoose");

const CategoryMedia = new Schema({
  url: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});
const Category = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "ProductCategory",
    },
    child: {
      type: Schema.Types.ObjectId,
      ref: "ProductCategory",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    value: {
      type: String,
    },
    media: [
      {
        type: CategoryMedia,
        required: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Category", Category, "categories");
