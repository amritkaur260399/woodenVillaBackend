const router = require("express").Router();

const register = require("../../controllers/auth/register");
const loginUser = require("../../controllers/auth/login");
const resetPassword = require("../../controllers/auth/resetPassword");
const verifyOtp = require("../../controllers/auth/verifyOTP");
const sendOtp = require("../../controllers/auth/sendOtp");

router.post("/register", register);
router.post("/login", loginUser);
router.post("/sendOtp", sendOtp);
router.post("/resetPassword/:token", resetPassword);
router.post("/verifyOtp/:token", verifyOtp);

module.exports = router;
