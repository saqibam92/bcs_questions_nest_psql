// apps/web/src/app/admin/subjects/page.tsx

"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import api from "@/lib/api";
import { Subject } from "@/types";
import toast from "react-hot-toast";

export default function AdminSubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSubjects = async () => {
    try {
      const { data } = await api.get<Subject[]>("/subjects");
      setSubjects(data);
    } catch (error) {
      toast.error("Failed to fetch subjects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (
      window.confirm(
        "Are you sure? This will delete all questions in this subject."
      )
    ) {
      try {
        await api.delete(`/subjects/${id}`);
        toast.success("Subject deleted");
        fetchSubjects();
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to delete");
      }
    }
  };

  if (loading)
    return <div className="p-8 text-gray-900">Loading subjects...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Manage Subjects</h1>
        <Link
          href="/admin/subjects/add"
          className="px-4 py-2 font-bold text-white bg-green-600 rounded-md hover:bg-green-700"
        >
          Add New Subject
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Exam
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Questions
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-gray-900">
            {subjects.map((subject) => (
              <tr key={subject.id}>
                <td className="px-6 py-4 whitespace-nowrap">{subject.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                  {subject.exam?.exam_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {subject.questions?.length || 0}
                </td>
                <td className="px-6 py-4 text-right whitespace-nowrap">
                  <Link
                    href={`/admin/subjects/edit/${subject.id}`}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(subject.id)}
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