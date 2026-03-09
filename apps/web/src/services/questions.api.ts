// src/services/questions.api.ts

import api from "@/lib/api";
import { Question } from "@/types";

export const getQuestions = async () => {
  return api.get<Question[]>("/questions");
};

export const getQuestion = async (id: string) => {
  return api.get<Question>(`/questions/${id}`);
};

export const getQuestionsForSubject = async (
  subjectId: string
) => {
  return api.get<Question[]>(
    `/questions/subject/${subjectId}`
  );
};

export const createQuestion = async (data: any) => {
  return api.post("/questions", data);
};

export const updateQuestion = async (
  id: string,
  data: any
) => {
  return api.patch(`/questions/${id}`, data);
};

export const deleteQuestion = async (id: string) => {
  return api.delete(`/questions/${id}`);
};