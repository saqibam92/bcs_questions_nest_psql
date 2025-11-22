// src/routes/index.js
const questionRoutes = require("./question.routes.js");
const examRoutes = require("./exam.routes.js");
// const resultRoutes = require("./result.routes.js");
const authRoutes = require("./auth.routes.js");
const userRoutes = require("./user.routes.js");

const loadRoutes = (app) => {
  app.use("/api/questions", questionRoutes);
  app.use("/api/exams", examRoutes);
  // app.use("/api/results", resultRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/user", userRoutes);
};

module.exports = { loadRoutes };
