const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userRole",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    checkInTime: {
      type: Date,
    },
    checkOutTime: {
      type: Date,
    },
    attendanceType: {
      type: String,
      enum: ["Onsite", "Remote", "Half-day"],
      default: "Onsite",
    },
    status: {
      type: String,
      enum: ["Present", "Absent", "Late"],
      default: "Absent",
    },
      isDeleted: {
    type: Boolean,
    default: false
  },
  },
  { timestamps: true }
);
attendanceSchema.index({ user: 1, date: 1 }, { unique: true }); 

module.exports = mongoose.model("Attendance", attendanceSchema);
