const router = require("express").Router();

const validateAccessToken = require("../../middlewares/jwtValidation");
const currentUser = require("../../controllers/user/currentUser");
const adminCurrentUser = require("../../controllers/user/adminCurrentUser");
const updatePassword = require("../../controllers/user/updatePassword");
const getAllUsers = require("../../controllers/user/getAllUsers");
const getSingleUser = require("../../controllers/user/getSingleUser");
const roleCheck = require("../../middlewares/roleCheck");

router.get("/me", validateAccessToken, currentUser);
router.get("/admin/me", validateAccessToken, adminCurrentUser);
router.put("/updatepassword/:id", validateAccessToken, updatePassword);
router.get("/", getAllUsers);
router.put("/:id", validateAccessToken, getSingleUser);
module.exports = router;
