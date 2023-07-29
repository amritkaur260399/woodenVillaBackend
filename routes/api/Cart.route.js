const router = require("express").Router();

const addToCart = require("../../controllers/addToCart/addToCart");
const deleteCart = require("../../controllers/addToCart/deleteCart");
const getCart = require("../../controllers/addToCart/getCart");
const validateAccessToken = require("../../middlewares/jwtValidation");
router.post("/", validateAccessToken, addToCart);
router.delete("/:id", validateAccessToken, deleteCart);
router.get("/", validateAccessToken, getCart);
module.exports = router;
