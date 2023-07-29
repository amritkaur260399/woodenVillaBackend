const Responsee = require("../../models/Response.model");

const addResponse = async (req, res, next) => {
  try {
    const { response, customerId } = req.body;

    const Response = new Responsee({ response, customerId });
    await Response.save();
    res.status(200).json({
      sucess: true,
      message: "Response saved successfully",
      Response,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = addResponse;
