const addContactUs = require("../../controllers/contactUs/addContactUs");
const getAllContacts = require("../../controllers/contactUs/getAllContactUs");

const router = require("express").Router();

router.post("/", addContactUs);
router.get("/", getAllContacts);
module.exports = router;
