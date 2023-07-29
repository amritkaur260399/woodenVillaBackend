const addResponse = require("../../controllers/response/addResponse");

const router = require("express").Router();

router.post("/", addResponse);

module.exports = router;
