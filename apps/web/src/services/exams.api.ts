// src/services/exams.api.ts

import api from "@/lib/api";
import { Exam } from "@/types";

export const getExams = async () => {
  return api.get<Exam[]>("/exams");
};

export const getExam = async (id: string) => {
  return api.get<Exam>(`/exams/${id}`);
};

export const createExam = async (data: any) => {
  return api.post("/exams", data);
};

export const updateExam = async (
  id: string,
  data: any
) => {
  return api.patch(`/exams/${id}`, data);
};

export const deleteExam = async (id: string) => {
  return api.delete(`/exams/${id}`);
};