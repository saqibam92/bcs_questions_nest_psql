// apps/web/src/components/admin/ExamForm.jsx
"use client";
import React, { useState } from "react";
import { Exam, ExamCreateDto, ExamUpdateDto,  } from "@/types";
// import { Prisma } from "@prisma/client";

interface ExamFormProps {
  initialData?: Exam;
  onSubmit: (data: ExamCreateDto | ExamUpdateDto) => void;
  isSaving: boolean;
}

export default function ExamForm({
  initialData,
  onSubmit,
  isSaving,
}: ExamFormProps) {
  const [name, setName] = useState(initialData?.exam_name || "");
  const [date, setDate] = useState(
    initialData?.date
      ? new Date(initialData.date).toISOString().split("T")[0]
      : ""
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      exam_name: name,
      date: date ? new Date(date).toISOString() : null,
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
          Exam Name
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
          htmlFor="date"
          className="block text-sm font-medium text-gray-700"
        >
          Date
        </label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-3 py-2 mt-1 text-black border border-gray-300 rounded-md"
        />
      </div>
      <button
        type="submit"
        disabled={isSaving}
        className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isSaving ? "Saving..." : "Save Exam"}
      </button>
    </form>
  );
}