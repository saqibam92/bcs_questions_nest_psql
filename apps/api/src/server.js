// src/server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieSession = require("cookie-session");
const passport = require("passport");

const connectDB = require("./config/db.js");
const { loadRoutes } = require("./routes/index.js");
const { logger } = require("./utils/logger.js");

// This line executes the passport configuration
require("./config/passport-setup");

dotenv.config();

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 5001;
    this.initializeMiddleware();
    this.initializeAuthMiddleware(); // Added for auth
    this.initializeRoutes();
    this.initializeHealthCheck();
    connectDB();
  }

  initializeMiddleware() {
    this.app.use(
      cors({
        origin: process.env.CLIENT_URL || "http://localhost:3000" || "http://localhost:3001", // Allow client to send cookies
        credentials: true,
      })
    );
    this.app.use(express.json());
  }

  // New method to keep auth middleware organized
  initializeAuthMiddleware() {
    this.app.use(
      cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        keys: "abcd",
      })
    );
    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }

  initializeRoutes() {
    loadRoutes(this.app);
  }

  initializeHealthCheck() {
    this.app.get("/health", (req, res) => {
      res
       .status(200)
       .json({ status: "OK", timestamp: new Date().toISOString() });
    });
  }

  start() {
    this.app.listen(this.port, () => {
      logger.info(`Server running on port ${this.port}`);
    });
  }
}

const server = new Server();
server.start();

module.exports = server;