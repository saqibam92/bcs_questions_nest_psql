// src/services/api.js
import axios from "axios";

// Replace with your machine's local IP address if testing on a physical device
const API_URL = "http://localhost:5001/api";

const api = axios.create({
  baseURL: API_URL,
});

export const getQuestions = () => api.get("/questions");
export const getQuestionById = (id) => api.get(`/questions/${id}`);
export const getExams = () => api.get("/exams");
export const getExamById = (id) => api.get(`/exams/${id}`);