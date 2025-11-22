// src/routes/question.routes.js
const express = require("express");
const {
  createQuestion,
  getAllQuestions,
  getQuestionById,
} = require("../controllers/question.controller.js");

const router = express.Router();

router.route("/").get(getAllQuestions).post(createQuestion);
router.route("/:id").get(getQuestionById);

module.exports = router;
