const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    avatar: {
      type: String,
      // default: "",
    },
    resetPasswordToken: {
      type: String,
      // default: "",
    },
    resetPasswordExpires: {
      type: Date,
      // default: "",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", UserSchema);
