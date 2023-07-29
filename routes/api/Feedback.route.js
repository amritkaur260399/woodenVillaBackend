const addFeedback = require("../../controllers/feedback/addFeedback");
const getAllFeedback = require("../../controllers/feedback/getAllFeedback");
const updateFeeback = require("../../controllers/feedback/updateFeeback");
const deleteFeedback = require("../../controllers/feedback/deleteFeedback");

const router = require("express").Router();

router.post("/", addFeedback);
router.get("/", getAllFeedback);
router.put("/:id", updateFeeback);
router.delete("/:id", deleteFeedback);
module.exports = router;
