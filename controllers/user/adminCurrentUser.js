const createError = require("http-errors");

// import user model
const User = require("../../models/User.model");
// const PostGift = require("../../models/PostGift.model");
const { ObjectId } = require("mongoose").Types;

const adminCurrentUser = async (req, res, next) => {
  try {
    const user = await User.aggregate([
      {
        $match: {
          _id: ObjectId(req.user._id),
        },
      },

      {
        $project: {
          password: 0,
          __v: 0,
        },
      },
    ]);
    res.status(200).json({
      status: "success",
      data: user[0],
    });
  } catch (err) {
    res.status(500).json({
      message: "Error while fetching user",
      error: err,
    });
  }
};

module.exports = adminCurrentUser;
