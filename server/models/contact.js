const mongoose = require("mongoose");
const ContactSchema = new mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String
  },

  comments: {
    type: String
  },
  phoneNum: {
    type: Number
  }
});
const ContactInfo = mongoose.model("Contact", ContactSchema);

module.exports = { ContactInfo };
