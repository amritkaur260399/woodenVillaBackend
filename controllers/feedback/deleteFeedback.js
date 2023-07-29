const Feedback = require("../../models/Feedback.model");

const { ObjectId } = require("mongoose").Types;

const deleteFeedback = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Feedback.findOneAndDelete({ _id: ObjectId(id) });

    res.json({
      success: true,
      message: "Feedback delete successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteFeedback;
