// src/middleware/requireAuth.js
const requireAuth = (req, res, next) => {
  if (!req.isAuthenticated() || !req.user) {
    return res
      .status(401)
      .send({ error: "You must be logged in to access this resource." });
  }
  next();
};

module.exports = { requireAuth };
