// src/services/api.ts
import api from '@/lib/api'; 
import { Exam, Subject, Question } from '@/types';

// Note: The NestJS API returns data directly, not wrapped in an `ApiResponse` object.
// We will return `data` from the Axios response.

// ==================================
// Public API Functions (for app)
// ==================================

export const getExams = async () => {
  return api.get<Exam[]>('/exams');
};

export const getExamById = async (examId: string) => {
  return api.get<Exam>(`/exams/${examId}`);
};

export const getQuestionsForSubject = async (subjectId: string) => {
  return api.get<Question[]>(`/questions/subject/${subjectId}`);
};

// ==================================
// Admin API Functions (for admin panel)
// ==================================

// --- Exams ---
export const adminGetExams = async () => {
  return api.get<Exam[]>('/exams');
};

export const adminGetExam = async (id: string) => {
  return api.get<Exam>(`/exams/${id}`);
};

export const adminCreateExam = async (data: any) => {
  return api.post('/exams', data);
};

export const adminUpdateExam = async (id: string, data: any) => {
  return api.patch(`/exams/${id}`, data);
};

export const adminDeleteExam = async (id: string) => {
  return api.delete(`/exams/${id}`);
};

// --- Subjects ---
export const adminGetSubjects = async () => {
  return api.get<Subject[]>('/subjects');
};

export const adminGetSubject = async (id: string) => {
  return api.get<Subject>(`/subjects/${id}`);
};

export const adminCreateSubject = async (data: any) => {
  return api.post('/subjects', data);
};

export const adminUpdateSubject = async (id: string, data: any) => {
  return api.patch(`/subjects/${id}`, data);
};

export const adminDeleteSubject = async (id: string) => {
  return api.delete(`/subjects/${id}`);
};

// --- Questions ---
export const adminGetQuestions = async () => {
  return api.get<Question[]>('/questions');
};

export const adminGetQuestion = async (id: string) => {
  return api.get<Question>(`/questions/${id}`);
};

export const adminCreateQuestion = async (data: any) => {
  return api.post('/questions', data);
};

export const adminUpdateQuestion = async (id: string, data: any) => {
  return api.patch(`/questions/${id}`, data);
};

export const adminDeleteQuestion = async (id: string) => {
  return api.delete(`/questions/${id}`);
};