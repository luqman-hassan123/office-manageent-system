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
  },
  { timestamp: true }
);

module.exports = mongoose.Aggregate("userRole", userRole);
