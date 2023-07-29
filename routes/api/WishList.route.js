const router = require("express").Router();

const addToWishList = require("../../controllers/wishList/addToWishList");
const getWishList = require("../../controllers/wishList/getWishList");
const deleteWishList = require("../../controllers/wishList/deleteWishList");
const validateAccessToken = require("../../middlewares/jwtValidation");

router.post("/", validateAccessToken, addToWishList);
router.get("/", validateAccessToken, getWishList);
router.delete("/:id", validateAccessToken, deleteWishList);

module.exports = router;
