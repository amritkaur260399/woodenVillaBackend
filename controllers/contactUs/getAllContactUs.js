const ContactUsModel = require("../../models/ContactUs.model");

const getAllContacts = async (req, res, next) => {
  const startIndex = parseInt(req.query.startIndex) || 0;
  const viewSize = parseInt(req.query.viewSize) || 10;
  const searchCreteria = {};

  if (req.query.keyword) {
    searchCreteria["$or"] = [
      {
        name: { $regex: `^${req.query.keyword.trim()}`, $options: "i" },
      },
    ];
  }

  if (req?.query?.status) {
    searchCreteria["$or"] = [
      {
        status: req?.query?.status,
      },
    ];
  }

  try {
    const contactUs = await ContactUsModel.aggregate([
      {
        $match: searchCreteria,
      },
      {
        $facet: {
          count: [
            {
              $count: "total",
            },
          ],

          data: [
            {
              $sort: {
                createdAt: -1,
              },
            },
            {
              $skip: startIndex,
            },
            {
              $limit: viewSize,
            },
          ],
        },
      },
    ]);
    res.status(200).json({
      success: true,
      message: "All Contacts Fetched Successfully!",
      contactUsData: contactUs[0]?.data,
      totalCount: contactUs?.[0]?.count?.[0]?.total,
    });
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};

module.exports = getAllContacts;
