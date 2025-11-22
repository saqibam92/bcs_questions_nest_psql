// src/routes/user.routes.js
const express = require("express");
const {
  getProfile,
  updateProfile,
} = require("../controllers/user.controller.js");
const { requireAuth } = require("../middleware/requireAuth.js");
const router = express.Router();

router
  .route("/profile")
  .get(requireAuth, getProfile)
  .put(requireAuth, updateProfile);

module.exports = router;
