// apps/web/src/app/admin/questions/add/page.tsx
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
// import { api } from "@/services/api";
import api from "@/lib/api";

import QuestionForm from "@/components/admin/QuestionForm";

export default function AddQuestionPage() {
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    setIsSaving(true);
    try {
      await api.post("/questions", data);
      router.push("/admin/questions");
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to create");
      setIsSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Add New Question</h1>
      <QuestionForm onSubmit={handleSubmit} isSaving={isSaving} />
    </div>
  );
}