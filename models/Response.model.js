const { Schema, model } = require("mongoose");

const responseSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Conactus",
      required: true,
    },
    response: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Response", responseSchema, "responses");
