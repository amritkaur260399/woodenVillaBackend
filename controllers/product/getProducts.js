const createError = require("http-errors");
const Product = require("../../models/Product.model");
const { productValidation } = require("../../services/validation_schema");
const uploadFiles = require("../../services/upload-files");
const formidable = require("formidable");
const { ObjectId } = require("mongoose").Types;
const getProducts = async (req, res, next) => {
  try {
    const { subCategoryId, name, keyword, status } = req.query;
    const { query } = req;
    const startIndex = (query.startIndex && parseInt(query.startIndex)) || 0;
    const viewSize = (query.viewSize && parseInt(query.viewSize)) || 10;
    let searchCriteria = {};
    if (subCategoryId) {
      searchCriteria = {
        ...searchCriteria,
        subCategoryId: ObjectId(subCategoryId),
      };
    }
    if (keyword) {
      searchCriteria["$or"] = [
        {
          "subCategory.name": { $regex: `${keyword}`, $options: "i" },
        },
        {
          "category.name": { $regex: `${keyword}`, $options: "i" },
        },
        {
          "productName.name": { $regex: `${keyword}`, $options: "i" },
        },
        {
          "subProductName.name": { $regex: `${keyword}`, $options: "i" },
        },
      ];
    }
    if (status) {
      searchCriteria = {
        ...searchCriteria,
        isActive: status === "true" ? true : false,
      };
    }

    const products = await Product.aggregate([
      {
        $lookup: {
          from: "addProductName",
          localField: "productNameId",
          foreignField: "_id",
          as: "productName",
        },
      },
      {
        $unwind: {
          path: "$productName",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "addProductName",
          localField: "subProductNameId",
          foreignField: "_id",
          as: "subProductName",
        },
      },
      {
        $unwind: {
          path: "$subProductName",
          preserveNullAndEmptyArrays: true,
        },
      },

      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: {
          path: "$category",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "subCategoryId",
          foreignField: "_id",
          as: "subCategory",
        },
      },
      {
        $unwind: {
          path: "$subCategory",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: searchCriteria,
      },
      {
        $facet: {
          data: [
            {
              $sort: {
                createdAt: -1,
              },
            },
            { $skip: startIndex },
            { $limit: parseInt(viewSize) },
          ],
          count: [
            {
              $count: "total",
            },
          ],
          activeCount: [
            {
              $match: {
                $and: [searchCriteria, { isActive: true }],
              },
            },
            {
              $count: "active",
            },
          ],
          inactiveCount: [
            {
              $match: {
                $and: [searchCriteria, { isActive: false }],
              },
            },
            {
              $count: "inactive",
            },
          ],
        },
      },
    ]);
    const totalCount = await Product.countDocuments();
    console.log(
      products?.[0]?.activeCount?.[0]?.active,
      "products?.[0]?.activeCount?.[0]?.active"
    );
    res.json({
      success: true,
      status: 200,
      message: "Product fetched successfully",
      count: products?.[0]?.count?.[0]?.total,
      activeCount:
        !!products?.[0]?.activeCount?.[0]?.active === false
          ? 0
          : products?.[0]?.activeCount?.[0]?.active,
      inActiveCount:
        !!products?.[0]?.inactiveCount?.[0]?.inactive === false
          ? 0
          : products?.[0]?.inactiveCount?.[0]?.inactive,
      products: products?.[0]?.data,
      totalCount,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getProducts;
