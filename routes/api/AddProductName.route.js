const router = require("express").Router();

const addProductName = require("../../controllers/addProductName/addProductDetails");
const addSubProductName = require("../../controllers/addProductName/addSubProductDetails");
const getProductNameList = require("../../controllers/addProductName/getProductNameList");
const getAllSubProductDetails = require("../../controllers/addProductName/getAllSubProductDetails");
const getSubProductData = require("../../controllers/addProductName/getSubProductData");
const updateProductName = require("../../controllers/addProductName/updateProductName");
const deleteProductName = require("../../controllers/addProductName/deleteProductName");
const getSingleProductName = require("../../controllers/addProductName/getSingleProductName");

router.post("/", addProductName);
router.get("/", getProductNameList);
router.get("/:id", getSingleProductName);
router.get("/subProductData/:id", getSubProductData);
router.put("/:id", updateProductName);
router.delete("/:id", deleteProductName);
router.post("/:id", addSubProductName);
router.get("/:id", getAllSubProductDetails);

module.exports = router;
