// File: apps/client/src/app/admin/page.tsx
"use client";
import React from "react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";

export default function AdminDashboard() {
  const { admin } = useAdminAuth();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Admin Dashboard</h1>
      <div className="p-6 bg-white rounded shadow-md">
        <p className="text-lg text-gray-700">
          Welcome, <span className="font-bold">{admin?.name || "Admin"}</span>!
        </p>
        <p className="mt-2 text-gray-600">
          Your role is:
          <span className="font-medium text-blue-600">{admin?.role}</span>
        </p>
        <p className="mt-4 text-gray-600">
          Use the sidebar to manage Exams, Subjects, and Questions.
        </p>
      </div>
    </div>
  );
}