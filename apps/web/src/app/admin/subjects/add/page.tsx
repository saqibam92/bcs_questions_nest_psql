// apps/web/src/app/admin/subjects/add/page.tsx
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import SubjectForm from "@/components/admin/SubjectForm";
import toast from "react-hot-toast";

export default function AddSubjectPage() {
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    setIsSaving(true);
    try {
      await api.post("/subjects", data);
      toast.success("Subject created successfully");
      router.push("/admin/subjects");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create subject");
      setIsSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Add New Subject</h1>
      <SubjectForm onSubmit={handleSubmit} isSaving={isSaving} />
    </div>
  );
}