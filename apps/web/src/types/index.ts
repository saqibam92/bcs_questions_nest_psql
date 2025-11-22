// apps/web/src/types/index.ts

// 1. Content Interfaces
export interface Question {
  id: string;
  ques_no: number;
  ques: string;
  option_1: string;
  option_2: string;
  option_3: string;
  option_4: string;
  correctAnswer: string;
  explanation: string;
  add_favourite: boolean;
  subjectId: string;
  subject?: Subject;

  // These will be added in the service/component for convenience
  options?: string[];
  correctAnswerIndex?: number;
}

export interface Subject {
  id: string;
  name: string;
  examId: string;
  exam?: Exam;
  questions?: Question[]; 
}

export interface Exam {
  id: string;
  exam_name: string;
  date: string; // ISO Date string
  totalExaminees?: number;
  highestMark?: number;
  subjects: Subject[];
  createdAt: string;
}

// 2. Auth & User Interfaces

// For the End-User (Mobile/Web App User)
export interface User {
  id: string;
  userId: string; // The custom ID (e.g., "Wym1")
  name: string;
  email: string;
  phone?: string;
  userType: 'FREE' | 'PAID' | 'PREMIUM'; // Updated to match your new schema requirements
  createdAt: string;
}

// For the Admin Panel User (Staff)
export interface Admin {
  id: string;
  name: string;
  email: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'MODERATOR';
  createdAt: string;
}

// 3. API & Result Interfaces

export interface ApiResponse<T> {
  success: boolean;
  count?: number;
  data: T;
  message?: string;
}

export interface SubjectResult {
  subjectName: string;
  correct: number;
  wrong: number;
  marks: number;
}

export interface ExamResult {
  totalScore: number;
  totalCorrect: number;
  totalWrong: number;
  subjectBreakdown: SubjectResult[];
  rank?: number;
}

export interface ExamCreateDto {
  exam_name?: string;
  date: string | null;
}

export interface ExamUpdateDto {
  exam_name?: string;
  date?: string | null;
}
