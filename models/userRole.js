const mongoose = require("mongoose");

const userRole = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    permission: {
      type: String,
      required: true,
    },
      isDeleted: {
    type: Boolean,
    default: false
  },
  },
  { timestamps: true }
);

module.exports = mongoose.model("userRole",userRole);
