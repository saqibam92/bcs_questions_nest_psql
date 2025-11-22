// src/routes/exam.routes.js
const express = require("express");
const {
  createExam,
  getAllExams,
  getExamById,
} = require("../controllers/exam.controller.js");

const router = express.Router();

router.route("/").get(getAllExams).post(createExam);
router.route("/:id").get(getExamById);

module.exports = router;
