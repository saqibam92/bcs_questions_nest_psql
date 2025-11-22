// src/controllers/user.controller.js
const User = require("../models/user.model.js");
// const Result = require("../models/result.model.js");

const getProfile = async (req, res) => {
  try {
    // In a real app, you would link results to the user via a userId field
    // const userResults = await Result.find({ userId: req.user._id }).lean();

    const profileData = {
      username: req.user.username,
      displayName: req.user.displayName,
      email: req.user.email,
      mobileNumber: req.user.mobileNumber,
      avatar: req.user.avatar,
      // Dummy stats based on the image
      examsTaken: 0,
      examsPassed: 0,
      totalQuestions: 0.0,
      totalCorrect: 0.0,
      totalWrong: 0.0,
    };

    res.status(200).json({ success: true, data: profileData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { displayName, mobileNumber } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { displayName, mobileNumber },
      { new: true, runValidators: true }
    ).select("-googleId -facebookId"); // Exclude provider IDs from response

    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = { getProfile, updateProfile };
