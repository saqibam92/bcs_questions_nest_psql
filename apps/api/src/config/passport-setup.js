// src/config/passport-setup.js
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/user.model");
const { logger } = require("../utils/logger");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

const handleOAuthUser = async (profile, provider, done) => {
  const providerIdField = `${provider}Id`;
  const email =
    profile.emails && profile.emails.length > 0 ? profile.emails.value : null;

  if (!email) {
    return done(new Error("Email not provided by OAuth provider."), null);
  }

  try {
    let user = await User.findOne({ email: email });

    if (user) {
      // If user exists but logs in with a new provider, link the account
      if (!user[providerIdField]) {
        user[providerIdField] = profile.id;
        await user.save();
      }
      return done(null, user);
    }

    // Create a new user
    const newUser = await new User({
      [providerIdField]: profile.id,
      username: email.split("@") + `_${provider}`, // Create a unique username
      displayName: profile.displayName,
      email: email,
      avatar:
        profile.photos && profile.photos.length > 0
          ? profile.photos.value
          : null,
    }).save();
    done(null, newUser);
  } catch (error) {
    logger.error(`OAuth Error: ${error.message}`);
    done(error, null);
  }
};

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
      proxy: true,
    },
    (accessToken, refreshToken, profile, done) =>
      handleOAuthUser(profile, "google", done)
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "/api/auth/facebook/callback",
      profileFields: ["id", "displayName", "photos", "email"],
      proxy: true,
    },
    (accessToken, refreshToken, profile, done) =>
      handleOAuthUser(profile, "facebook", done)
  )
);
