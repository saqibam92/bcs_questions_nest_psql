// apps/web/src/app/admin/exams/add/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import UnifiedExamForm from "@/components/admin/UnifiedExamForm";
import toast from "react-hot-toast";
import { ExamFormValues } from "@/types/exam-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AddExamPage() {
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: ExamFormValues) => {
    setIsSaving(true);
    try {
      // Transform the form data to match Prisma's nested create expectation
      // We map the form's flat structure to the backend's API structure
      const payload = {
        ...data,
        durationMinutes: Number(data.durationMinutes),
        totalMarks: Number(data.totalMarks),
        passingMarks: Number(data.passingMarks),
        negativeMarkingValue: Number(data.negativeMarkingValue || 0),
        examDate: data.examDate ? new Date(data.examDate).toISOString() : null,
        sections: {
          create: data.sections.map((section, sIdx) => ({
            name: section.name,
            order: sIdx,
            defaultMarks: Number(section.defaultMarks),
            questions: {
              create: section.questions.map((q, qIdx) => ({
                text: q.text,
                optionA: q.optionA,
                optionB: q.optionB,
                optionC: q.optionC,
                optionD: q.optionD,
                correctOption: q.correctOption,
                explanation: q.explanation || null,
                marks: Number(q.marks),
                order: qIdx,
              })),
            },
          })),
        },
      };

      await api.post("/exams", payload);

      toast.success("Exam created successfully with all questions!");
      router.push("/admin/exams");
    } catch (error: any) {
      console.error("Creation failed:", error);
      const msg = error.response?.data?.message || "Failed to create exam";
      toast.error(Array.isArray(msg) ? msg[0] : msg);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Top Bar */}
      <div className="bg-white border-b px-6 py-4 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <Link
            href="/admin/exams"
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Create New Exam</h1>
            <p className="text-sm text-gray-500">
              Unified wizard for exam, sections, and questions
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-8 px-4">
        <UnifiedExamForm onSubmit={handleSubmit} isSaving={isSaving} />
      </div>
    </div>
  );
}