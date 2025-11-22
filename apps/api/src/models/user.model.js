// src/models/user.model.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    googleId: { type: String },
    facebookId: { type: String },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
    },
    mobileNumber: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
