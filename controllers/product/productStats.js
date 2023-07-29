const Product = require("../../models/Product.model");

const statusCount = async (req, res) => {
  try {
    let statusCount = [];
    const arr = ["true", "false", "all"];
    for (const i of arr) {
      let searchCriteria = {};
      if (i !== "all") {
        searchCriteria.isActive = i;
      } else {
        searchCriteria = {};
      }
      const stats = await Product.find({ ...searchCriteria });
      statusCount = { ...statusCount, [i]: stats.length };
    }

    res.status(200).send({ statusCount, message: "count fetch successfully" });
  } catch (err) {
    console.log(err, "err");
  }
};
module.exports = statusCount;
