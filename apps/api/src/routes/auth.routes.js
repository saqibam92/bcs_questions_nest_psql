// src/routes/auth.routes.js
const express = require("express");
const passport = require("passport");
const router = express.Router();

const CLIENT_HOME_PAGE_URL = process.env.CLIENT_URL || "http://localhost:3000";

// Google Auth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", passport.authenticate("google", { failureRedirect: `${CLIENT_HOME_PAGE_URL}/login` }), (req, res) => {
  res.redirect(`${CLIENT_HOME_PAGE_URL}/profile`);
});

// Facebook Auth
router.get("/facebook", passport.authenticate("facebook", { scope: ["public_profile", "email"] }));

router.get("/facebook/callback", passport.authenticate("facebook", { failureRedirect: `${CLIENT_HOME_PAGE_URL}/login` }), (req, res) => {
  res.redirect(`${CLIENT_HOME_PAGE_URL}/profile`);
});

// Get current user status
router.get("/current_user", (req, res) => {
  res.send(req.user);
});

// Logout
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect(CLIENT_HOME_PAGE_URL);
  });
});

module.exports = router;