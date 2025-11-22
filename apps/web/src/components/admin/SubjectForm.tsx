// apps/web/src/components/admin/SubjectForm.tsx
"use client";
import React, { useState, useEffect } from "react";
import api from "@/lib/api"; // or "@/services/api" depending on your setup
import { Exam, Subject } from "@/types";
import toast from "react-hot-toast";

// 1. Local interface (Replaces Prisma type)
interface SubjectFormData {
  name: string;
  exam: {
    connect: { id: string };
  };
}

interface SubjectFormProps {
  initialData?: Subject;
  // 2. Update prop type
  onSubmit: (data: SubjectFormData) => void;
  isSaving: boolean;
}

export default function SubjectForm({
  initialData,
  onSubmit,
  isSaving,
}: SubjectFormProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [examId, setExamId] = useState(initialData?.examId || "");
  const [exams, setExams] = useState<Exam[]>([]);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const { data } = await api.get<Exam[]>("/exams");
        setExams(data);
      } catch (error) {
        toast.error("Failed to fetch exams");
      }
    };
    fetchExams();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      exam: { connect: { id: examId } },
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded shadow-md text-gray-900"
    >
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Subject Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-3 py-2 mt-1 text-black border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label
          htmlFor="exam"
          className="block text-sm font-medium text-gray-700"
        >
          Associated Exam
        </label>
        <select
          id="exam"
          value={examId}
          onChange={(e) => setExamId(e.target.value)}
          required
          className="w-full px-3 py-2 mt-1 text-black border border-gray-300 rounded-md"
        >
          <option value="" disabled>
            -- Select Exam --
          </option>
          {exams.map((exam) => (
            <option key={exam.id} value={exam.id}>
              {exam.exam_name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={isSaving}
        className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isSaving ? "Saving..." : "Save Subject"}
      </button>
    </form>
  );
}