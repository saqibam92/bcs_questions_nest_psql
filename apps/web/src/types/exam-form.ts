// apps/web/src/types/exam-form.ts
export type QuestionFormValues = {
  id?: string; // Optional for new questions
  text: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctOption: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  marks: number;
  order: number; // This fixes the TS error
};

export type SectionFormValues = {
  id?: string;
  name: string; // This will store the Subject Name
  subjectId?: string; // Optional: if you want to link to a Subject ID
  defaultMarks: number;
  questions: QuestionFormValues[];
};

export type ExamFormValues = {
  name: string;
  slug: string;
  description: string;
  durationMinutes: number;
  totalMarks: number;
  passingMarks: number;
  examDate: string; // ISO string for datetime-local input
  hasNegativeMarking: boolean;
  negativeMarkingValue: number;
  isPublished: boolean;
  sections: SectionFormValues[];
};