const router = require("express").Router();

const addCategory = require("../../controllers/category/addCategory");
const getAllCategory = require("../../controllers/category/getAllCategory");
const updateCategory = require("../../controllers/category/updateCategory");
const deleteCategory = require("../../controllers/category/deleteCategory");
const addSubCategory = require("../../controllers/category/addSubCategory");
const getSingleCategory = require("../../controllers/category/getSingleCategory");
const getSubCategory = require("../../controllers/category/getSubCategory");
const deleteSubCategory = require("../../controllers/category/deleteSubCategory");
const getSingleCategoryDetails = require("../../controllers/category/getSingleCategoryDetails");
const getSubCategories = require("../../controllers/category/getSubCategories");

router.post("/", addCategory);
router.get("/subCategory", getSubCategories);
router.get("/", getAllCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);
router.get("/:id", getSingleCategory);
router.get("/getSingleCategoryDetails/:id", getSingleCategoryDetails);
router.post("/:categoryId", addSubCategory);
router.delete("/subCategory/:id", deleteSubCategory);

module.exports = router;
