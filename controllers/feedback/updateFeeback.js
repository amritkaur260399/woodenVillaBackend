const Feedback = require("../../models/Feedback.model");
const { ObjectId } = require("mongoose").Types;
const updateFeeback = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { feedback, rating } = req.body;

    await Feedback.findOneAndUpdate(
      { _id: ObjectId(id) },
      { feedback, rating },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Feedback updated successfully.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateFeeback;
