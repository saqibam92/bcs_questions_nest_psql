// apps/web/src/app/admin/questions/page.tsx

"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
// import { api } from "@/services/api";
import api from "@/lib/api";

import { Question } from "@/types";

export default function AdminQuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchQuestions = async () => {
    try {
      const { data } = await api.get<Question[]>("/questions");
      setQuestions(data);
    } catch (error) {
      console.error("Failed to fetch questions", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        await api.delete(`/questions/${id}`);
        setQuestions(questions.filter((q) => q.id !== id));
      } catch (error: any) {
        alert(error.response?.data?.message || "Failed to delete");
      }
    }
  };

  if (loading) return <div className="p-8">Loading questions...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Questions</h1>
        <Link
          href="/admin/questions/add"
          className="px-4 py-2 font-bold text-white bg-green-600 rounded hover:bg-green-700"
        >
          Add New Question
        </Link>
      </div>
      <div className="bg-white rounded shadow-md overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Q.No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase w-1/2">
                Question
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Subject
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {questions.map((q) => (
              <tr key={q.id}>
                <td className="px-6 py-4 whitespace-nowrap">{q.ques_no}</td>
                <td className="px-6 py-4">
                  <div className="line-clamp-2 text-sm">{q.ques}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {q.subject?.name}
                </td>
                <td className="px-6 py-4 text-right whitespace-nowrap">
                  <Link
                    href={`/admin/questions/edit/${q.id}`}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(q.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}