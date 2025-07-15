const mongoose = require("mongoose");

const userRole = new mongoose.Schema(
  {
    rolename: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
      isDeleted: {
    type: Boolean,
    default: false
  },
  },
  { timestamps:true }
);

module.exports = mongoose.model("userRole" , userRole);
