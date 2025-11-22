// src/controllers/exam.controller.js
const Exam = require("../models/exam.model.js");

const createExam = async (req, res) => {
  try {
    const exam = await Exam.create(req.body);
    res.status(201).json({
      success: true,
      data: exam,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find().lean();
    console.log(exams) // Use lean() for performance
    res.status(200).json({
      success: true,
      count: exams.length,
      data: exams,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getExamById = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id).lean();
    if (!exam) {
      return res.status(404).json({ success: false, error: "Exam not found" });
    }
    res.status(200).json({
      success: true,
      data: exam,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  createExam,
  getAllExams,
  getExamById,
};
