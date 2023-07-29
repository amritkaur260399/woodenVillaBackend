const createError = require("http-errors");
const ResetPassword = require("../../models/ResetPassword.model");
const sendEmail = require("../../services/sendEmail");

const User = require("../../models/User.model");
const bcrypt = require("bcryptjs");
const { registerValidation } = require("../../services/validation_schema");

const register = async (req, res, next) => {
  try {
    const result = await registerValidation.validateAsync(req.body);
    const { name, phone, email, password } = result;

    const userExistingEmail = await User.findOne({
      email,
    });

    if (userExistingEmail) {
      throw new Error(`${email} is already exist. Please login.`);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      phone,
      email,
      password: hashedPassword,
    });
    await ResetPassword.findOneAndDelete({ email: email });

    const otp = sendEmail.generateOTP();
    const resetotp = new ResetPassword({
      otp,
      email,
    });
    await resetotp.save();
    await user.save();

    res.status(200).json({
      message: " User created successfully",
      success: true,
      otp,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
