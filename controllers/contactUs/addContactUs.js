const ContactUsModel = require("../../models/ContactUs.model");

const addContactUs = async (req, res, next) => {
  try {
    const { name, email, phone_number, message } = req.body;

    const contact = new ContactUsModel({ name, email, phone_number, message });

    await contact.save();

    res.status(200).json({
      success: true,
      message: "Contact Us created successfully.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addContactUs;
