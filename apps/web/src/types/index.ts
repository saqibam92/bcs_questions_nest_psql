// apps/web/src/types/index.ts

// ==========================================
// 1. Content Interfaces (New Schema)
// ==========================================

export interface Question {
  id: string;
  text: string;          
  optionA: string;       
  optionB: string;       
  optionC: string;       
  optionD: string;       
  correctOption: string; 
  explanation?: string;
  marks: number;
  order: number;         
  sectionId: string;
  imageUrl?: string;
  options?: string[]; 
}

export interface ExamSection {
  id: string;
  name: string;
  defaultMarks: number;
  examId: string;
  questions: Question[];
  order: number;
}

export interface Exam {
  id: string;
  name: string;          
  slug: string;
  description?: string;
  durationMinutes: number;
  totalMarks: number;
  passingMarks: number;
  hasNegativeMarking: boolean;
  negativeMarkingValue: number;
  examDate?: string;     
  isPublished: boolean;
  sections: ExamSection[]; 
  createdAt: string;

  // Legacy stats (optional, depending on backend implementation)
  totalExaminees?: number;
  highestMark?: number;
}



export type Role =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "MODERATOR"
  | "EDITOR"
  | "VIEWER"
  | "USER";

export type UserType = "FREE" | "PAID" | "PREMIUM";

export interface AuthUser {
  id: string;
  name: string;
  email: string;

  role: Role;
  userType: UserType;

  createdAt: string;
}

export interface Admin {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
}


// ==========================================
// 3. API & Result Interfaces
// ==========================================

export interface ApiResponse<T> {
  success: boolean;
  count?: number;
  data: T;
  message?: string;
}

export interface SectionResult {
  sectionName: string;
  correct: number;
  wrong: number;
  marks: number;
}

// Updated to match the new Exam Page logic
export interface ExamResult {
  examName: string;
  totalQuestions: number;
  score: number;
  correctCount: number;
  wrongCount: number;
  
  // Map of Question ID -> Selected Option ("A", "B", "C", "D")
  answers: Record<string, string>; 
  
  // Full exam data for review page
  examData: Exam;
  
  // Optional breakdown
  sectionBreakdown?: SectionResult[];
  rank?: number;
}

export interface ExamCreateDto {
  name: string;
  slug: string;
  durationMinutes: number;
  totalMarks: number;
  passingMarks: number;
  examDate?: string;
}

export interface ExamUpdateDto {
  name?: string;
  slug?: string;
  durationMinutes?: number;
  totalMarks?: number;
  passingMarks?: number;
  examDate?: string;
}