// src/controllers/question.controller.js

const Question = require('../models/question.model.js');

// @desc    Create a new question
// @route   POST /api/questions
const createQuestion = async (req, res) => {
  try {
    const question = await Question.create(req.body);
    res.status(201).json({
      success: true,
      data: question,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Get all questions
// @route   GET /api/questions
const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find(req.query); // req.query allows filtering e.g., /api/questions?subject=Math
    res.status(200).json({
      success: true,
      count: questions.length,
      data: questions,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get a single question by ID
// @route   GET /api/questions/:id
const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ success: false, error: 'Question not found' });
    }
    res.status(200).json({
      success: true,
      data: question,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  createQuestion,
  getAllQuestions,
  getQuestionById,
};