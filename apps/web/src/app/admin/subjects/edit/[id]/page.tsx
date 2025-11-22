// apps/web/src/app/admin/subjects/edit/[id]/page.tsx

"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "@/lib/api";
import SubjectForm from "@/components/admin/SubjectForm";
import { Subject } from "@/types";
import toast from "react-hot-toast";

export default function EditSubjectPage() {
  const [subject, setSubject] = useState<Subject | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchSubject = async () => {
        try {
          const { data } = await api.get<Subject>(`/subjects/${id as string}`);
          setSubject(data);
        } catch (error) {
          toast.error("Failed to fetch subject");
        }
      };
      fetchSubject();
    }
  }, [id]);

  // Use 'any' here or the SubjectFormData interface if exported
  const handleSubmit = async (data: any) => {
    setIsSaving(true);
    try {
      await api.patch(`/subjects/${id as string}`, data);
      toast.success("Subject updated successfully");
      router.push("/admin/subjects");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update subject");
      setIsSaving(false);
    }
  };

  if (!subject) return <div className="p-8 text-gray-900">Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Edit Subject</h1>
      <SubjectForm
        initialData={subject}
        onSubmit={handleSubmit}
        isSaving={isSaving}
      />
    </div>
  );
}