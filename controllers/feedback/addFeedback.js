const Feedback = require("../../models/Feedback.model");

const addFeedback = async (req, res, next) => {
  try {
    const { feedback, rating, productId } = req.body;
    const { _id: userId } = req.user;
    const feedBack = new Feedback({ feedback, rating, userId, productId });

    await feedBack.save();

    res.status(200).json({
      success: true,
      message: "Feedback saved successfully.",
      feedBack,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addFeedback;
