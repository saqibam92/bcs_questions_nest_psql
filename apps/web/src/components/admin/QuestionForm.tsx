// apps/web/src/components/admin/QuestionForm.tsx
"use client";
import React, { useState, useEffect } from "react";
// import { api } from "@/services/api";
import api from "@/lib/api";
import { Subject, Question } from "@/types";
import toast from "react-hot-toast";

interface QuestionFormProps {
  initialData?: Question;
  onSubmit: (data: any) => void;
  isSaving: boolean;
}

export default function QuestionForm({
  initialData,
  onSubmit,
  isSaving,
}: QuestionFormProps) {
  const [quesNo, setQuesNo] = useState(initialData?.ques_no || 1);
  const [ques, setQues] = useState(initialData?.ques || "");
  const [option1, setOption1] = useState(initialData?.option_1 || "");
  const [option2, setOption2] = useState(initialData?.option_2 || "");
  const [option3, setOption3] = useState(initialData?.option_3 || "");
  const [option4, setOption4] = useState(initialData?.option_4 || "");
  const [correctAnswer, setCorrectAnswer] = useState(
    initialData?.correctAnswer || ""
  );
  const [explanation, setExplanation] = useState(
    initialData?.explanation || ""
  );
  const [subjectId, setSubjectId] = useState(initialData?.subjectId || "");

  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const { data } = await api.get<Subject[]>("/subjects");
        setSubjects(data);
      } catch (error) {
        toast.error("Failed to fetch subjects");
      }
    };
    fetchSubjects();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      correctAnswer !== option1 &&
      correctAnswer !== option2 &&
      correctAnswer !== option3 &&
      correctAnswer !== option4
    ) {
      toast.error("Correct Answer must exactly match one of the options.");
      return;
    }

    onSubmit({
      ques_no: Number(quesNo),
      ques,
      option_1: option1,
      option_2: option2,
      option_3: option3,
      option_4: option4,
      correctAnswer,
      explanation,
      subject: { connect: { id: subjectId } },
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded shadow-md text-gray-900"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-gray-700"
          >
            Subject
          </label>
          <select
            id="subject"
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
            required
            className="w-full px-3 py-2 mt-1 text-black border border-gray-300 rounded-md"
          >
            <option value="" disabled>
              -- Select Subject --
            </option>
            {subjects.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.exam?.exam_name} - {sub.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="quesNo"
            className="block text-sm font-medium text-gray-700"
          >
            Question No.
          </label>
          <input
            id="quesNo"
            type="number"
            value={quesNo}
            onChange={(e) => setQuesNo(Number(e.target.value))}
            required
            className="w-full px-3 py-2 mt-1 text-black border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="ques"
          className="block text-sm font-medium text-gray-700"
        >
          Question Text
        </label>
        <textarea
          id="ques"
          value={ques}
          onChange={(e) => setQues(e.target.value)}
          required
          rows={3}
          className="w-full px-3 py-2 mt-1 text-black border border-gray-300 rounded-md"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { val: option1, set: setOption1, label: "Option 1" },
          { val: option2, set: setOption2, label: "Option 2" },
          { val: option3, set: setOption3, label: "Option 3" },
          { val: option4, set: setOption4, label: "Option 4" },
        ].map((opt, idx) => (
          <div key={idx}>
            <label
              htmlFor={`opt-${idx}`}
              className="block text-sm font-medium text-gray-700"
            >
              {opt.label}
            </label>
            <input
              id={`opt-${idx}`}
              type="text"
              value={opt.val}
              onChange={(e) => opt.set(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 text-black border border-gray-300 rounded-md"
            />
          </div>
        ))}
      </div>

      <div>
        <label
          htmlFor="correct"
          className="block text-sm font-medium text-gray-700"
        >
          Correct Answer (Exact Text)
        </label>
        <input
          id="correct"
          type="text"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
          required
          placeholder="Must match one of the options exactly"
          className="w-full px-3 py-2 mt-1 text-black border border-gray-300 rounded-md bg-green-50"
        />
      </div>

      <div>
        <label
          htmlFor="explanation"
          className="block text-sm font-medium text-gray-700"
        >
          Explanation
        </label>
        <textarea
          id="explanation"
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 mt-1 text-black border border-gray-300 rounded-md"
        />
      </div>

      <button
        type="submit"
        disabled={isSaving}
        className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isSaving ? "Saving..." : "Save Question"}
      </button>
    </form>
  );
}