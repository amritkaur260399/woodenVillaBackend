const User = require("../../models/User.model");
const createError = require("http-errors");
const { ObjectId } = require("mongoose").Types;
const getSingleUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const allUsers = await User.aggregate([
      {
        $match: {
          _id: ObjectId(id),
        },
      },
    ]);
    res.status(200).json({
      success: true,
      data: allUsers[0],
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getSingleUser;
