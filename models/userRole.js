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
  },
  { timestamps: true }
);

module.exports = mongoose.model("userRole",userRole);
