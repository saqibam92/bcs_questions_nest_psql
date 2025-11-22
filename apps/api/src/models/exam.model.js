// src/models/exam.model.js
const mongoose = require("mongoose");

const questionEmbeddedSchema = new mongoose.Schema({
  ques_no: Number,
  ques: String,
  option_1: String,
  option_2: String,
  option_3: String,
  option_4: String,
  correctAnswer: String,
  explanation: String,
  add_favourite: Boolean,
});

const subjectWiseSortSchema = new mongoose.Schema({
  subject: String,
  questions: [questionEmbeddedSchema],
});

const examSchema = new mongoose.Schema(
  {
    exam_name: String,
    subjectWiseSort: [subjectWiseSortSchema],
  },
  {
    timestamps: true,
  }
);

const Exam = mongoose.model("Exam", examSchema);

module.exports = Exam;
