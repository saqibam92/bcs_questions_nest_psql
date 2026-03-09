// File: apps/client/src/app/admin/page.tsx

"use client";

import React from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminDashboard() {
  const { user, isAdmin } = useAuth();

  if (!isAdmin) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold text-red-600">Access Denied</h1>
        <p className="text-gray-600 mt-2">
          You do not have permission to access this page.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Admin Dashboard</h1>

      <div className="p-6 bg-white rounded shadow-md">
        <p className="text-lg text-gray-700">
          Welcome, <span className="font-bold">{user?.name || "Admin"}</span>!
        </p>

        <p className="mt-2 text-gray-600">
          Your role is:
          <span className="font-medium text-blue-600 ml-2">{user?.role}</span>
        </p>

        <p className="mt-4 text-gray-600">
          Use the sidebar to manage Exams, Subjects, and Questions.
        </p>
      </div>
    </div>
  );
}