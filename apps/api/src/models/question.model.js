// src/models/question.model.js
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: [true, 'Question text is required.'],
    trim: true,
  },
  options: {
    type:Array,
    required: true,
    validate: [
      (val) => val.length > 1,
      'A question must have at least two options.',
    ],
  },
  correctAnswerIndex: {
    type: Number,
    required: [true, 'Correct answer index is required.'],
  },
  explanation: {
    type: String,
    required: [true, 'Explanation is required.'],
  },
  subject: {
    type: String,
    required:true,
  },
  topic: {
    type: String,
    required:true,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;