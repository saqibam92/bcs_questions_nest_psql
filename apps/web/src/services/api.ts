// src/services/api.ts
import api from "@/lib/api";
import { Exam, Question } from "@/types";

/* ==================================
   Public API (App Users)
================================== */

export const getExams = async () => {
  return api.get<Exam[]>("/exams");
};

export const getExamById = async (examId: string) => {
  return api.get<Exam>(`/exams/${examId}`);
};

export const getQuestionsForSubject = async (subjectId: string) => {
  return api.get<Question[]>(`/questions/subject/${subjectId}`);
};

/* ==================================
   Admin API (Dashboard)
================================== */

/* ---------- Exams ---------- */

export const adminGetExams = async () => {
  return api.get<Exam[]>("/exams");
};

export const adminGetExam = async (id: string) => {
  return api.get<Exam>(`/exams/${id}`);
};

export const adminCreateExam = async (data: any) => {
  return api.post("/exams", data);
};

export const adminUpdateExam = async (id: string, data: any) => {
  return api.patch(`/exams/${id}`, data);
};

export const adminDeleteExam = async (id: string) => {
  return api.delete(`/exams/${id}`);
};

/* ---------- Questions ---------- */

export const adminGetQuestions = async () => {
  return api.get<Question[]>("/questions");
};

export const adminGetQuestion = async (id: string) => {
  return api.get<Question>(`/questions/${id}`);
};

export const adminCreateQuestion = async (data: any) => {
  return api.post("/questions", data);
};

export const adminUpdateQuestion = async (id: string, data: any) => {
  return api.patch(`/questions/${id}`, data);
};

export const adminDeleteQuestion = async (id: string) => {
  return api.delete(`/questions/${id}`);
};

/* ---------- Admin Users ---------- */

export const getAdminUsers = async () => {
  return api.get("/users");
};

export const createAdminUser = async (data: any) => {
  return api.post("/users", data);
};

export const updateAdminUser = async (id: string, data: any) => {
  return api.patch(`/users/${id}`, data);
};

export const deleteAdminUser = async (id: string) => {
  return api.delete(`/users/${id}`);
};