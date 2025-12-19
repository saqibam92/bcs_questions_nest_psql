// apps/web/src/app/admin/exams/edit/[id]/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "@/lib/api";
import UnifiedExamForm from "@/components/admin/UnifiedExamForm";
import { ExamFormValues } from "@/types/exam-form";
import toast from "react-hot-toast";
import {
  Box,
  CircularProgress,
  Typography,
  Container,
  Paper,
  IconButton,
} from "@mui/material";
import { ArrowLeft } from "@mui/icons-material";
import Link from "next/link";

export default function EditExamPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [initialValues, setInitialValues] =
    useState<Partial<ExamFormValues> | null>(null);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchExam = async () => {
        try {
          const { data } = await api.get(`/exams/${id}`);

          // Transform API response to Form Values
          const formData: Partial<ExamFormValues> = {
            name: data.name,
            slug: data.slug,
            description: data.description || "",
            durationMinutes: data.durationMinutes,
            totalMarks: data.totalMarks,
            passingMarks: data.passingMarks,
            hasNegativeMarking: data.hasNegativeMarking,
            negativeMarkingValue: data.negativeMarkingValue,
            isPublished: data.isPublished,
            // Format date for datetime-local input (YYYY-MM-DDTHH:mm)
            examDate: data.examDate
              ? new Date(data.examDate).toISOString().slice(0, 16)
              : "",
            sections: data.sections.map((sec: any) => ({
              id: sec.id,
              name: sec.name,
              defaultMarks: sec.defaultMarks,
              questions: sec.questions.map((q: any) => ({
                id: q.id,
                text: q.text,
                optionA: q.optionA,
                optionB: q.optionB,
                optionC: q.optionC,
                optionD: q.optionD,
                correctOption: q.correctOption,
                explanation: q.explanation || "",
                marks: q.marks,
                order: q.order,
              })),
            })),
          };

          setInitialValues(formData);
        } catch (error) {
          toast.error("Failed to fetch exam data");
          console.error("Failed to fetch exam", error);
        }
      };
      fetchExam();
    }
  }, [id]);

  const handleSubmit = async (data: ExamFormValues) => {
    setIsSaving(true);
    try {
      const payload = {
        ...data,
        durationMinutes: Number(data.durationMinutes),
        totalMarks: Number(data.totalMarks),
        passingMarks: Number(data.passingMarks),
        negativeMarkingValue: Number(data.negativeMarkingValue || 0),
        examDate: data.examDate ? new Date(data.examDate).toISOString() : null,

        // Handling nested updates:
        // This strategy deletes old sections and recreates everything.
        // It's simple but effective for keeping sync.
        // Ensure your backend supports this or update your backend service to handle updates properly.
        sections: {
          deleteMany: {},
          create: data.sections.map((section, sIdx) => ({
            name: section.name,
            order: sIdx,
            defaultMarks: Number(section.defaultMarks),
            questions: {
              create: section.questions.map((q, qIdx) => ({
                text: q.text,
                optionA: q.optionA,
                optionB: q.optionB,
                optionC: q.optionC,
                optionD: q.optionD,
                correctOption: q.correctOption,
                explanation: q.explanation || null,
                marks: Number(q.marks),
                order: qIdx,
              })),
            },
          })),
        },
      };

      await api.patch(`/exams/${id}`, payload);
      toast.success("Exam updated successfully");
      router.push("/admin/exams");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update exam");
    } finally {
      setIsSaving(false);
    }
  };

  if (!initialValues)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50vh"
      >
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5", pb: 10 }}>
      {/* Top Bar */}
      <Paper
        elevation={0}
        sx={{
          borderBottom: "1px solid #e0e0e0",
          px: 3,
          py: 2,
          position: "sticky",
          top: 0,
          zIndex: 1100,
          bgcolor: "white",
        }}
      >
        <Box
          sx={{
            maxWidth: "1200px",
            mx: "auto",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Link href="/admin/exams">
            <IconButton>
              <ArrowLeft />
            </IconButton>
          </Link>
          <Typography variant="h6" fontWeight="bold" color="text.primary">
            Edit Exam: {initialValues.name}
          </Typography>
        </Box>
      </Paper>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <UnifiedExamForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          isSaving={isSaving}
        />
      </Container>
    </Box>
  );
}

// // apps/web/src/app/admin/exams/edit/[id]/page.tsx
// "use client";
// import React, { useState, useEffect } from "react";
// import { useRouter, useParams } from "next/navigation";
// import api from "@/lib/api";
// import UnifiedExamForm from "@/components/admin/UnifiedExamForm";
// import { ExamFormValues } from "@/types/exam-form";
// import toast from "react-hot-toast";
// import { Box, CircularProgress, Typography, Container } from "@mui/material";

// export default function EditExamPage() {
//   const [isSaving, setIsSaving] = useState(false);
//   const [initialValues, setInitialValues] = useState<Partial<ExamFormValues> | null>(null);
//   const router = useRouter();
//   const { id } = useParams();

//   useEffect(() => {
//     if (id) {
//       const fetchExam = async () => {
//         try {
//           const { data } = await api.get(`/exams/${id}`);

//           // Transform API response to Form Values
//           const formData: Partial<ExamFormValues> = {
//             name: data.name,
//             slug: data.slug,
//             description: data.description || "",
//             durationMinutes: data.durationMinutes,
//             totalMarks: data.totalMarks,
//             passingMarks: data.passingMarks,
//             hasNegativeMarking: data.hasNegativeMarking,
//             negativeMarkingValue: data.negativeMarkingValue,
//             isPublished: data.isPublished,
//             // Date needs to be formatted for input type="datetime-local" (YYYY-MM-DDTHH:mm)
//             examDate: data.examDate ? new Date(data.examDate).toISOString().slice(0, 16) : "",
//             sections: data.sections.map((sec: any) => ({
//                 id: sec.id,
//                 name: sec.name,
//                 defaultMarks: sec.defaultMarks,
//                 questions: sec.questions.map((q: any) => ({
//                     id: q.id,
//                     text: q.text,
//                     optionA: q.optionA,
//                     optionB: q.optionB,
//                     optionC: q.optionC,
//                     optionD: q.optionD,
//                     correctOption: q.correctOption,
//                     explanation: q.explanation || "",
//                     marks: q.marks,
//                     order: q.order
//                 }))
//             }))
//           };

//           setInitialValues(formData);
//         } catch (error) {
//           toast.error("Failed to fetch exam data");
//           console.error("Failed to fetch exam", error);
//         }
//       };
//       fetchExam();
//     }
//   }, [id]);

//   const handleSubmit = async (data: ExamFormValues) => {
//     setIsSaving(true);
//     try {
//       // Payload transformation
//       const payload = {
//         ...data,
//         durationMinutes: Number(data.durationMinutes),
//         totalMarks: Number(data.totalMarks),
//         passingMarks: Number(data.passingMarks),
//         negativeMarkingValue: Number(data.negativeMarkingValue || 0),
//         examDate: data.examDate ? new Date(data.examDate).toISOString() : null,

//         // Update logic often requires separating 'create', 'update', 'delete' for nested relations
//         // For simplicity, many APIs replace the whole nested structure or handle simple updates.
//         // Assuming your backend handles a "Deep Update" or we send the full object to replace.
//         sections: {
//             // Important: Prisma Nested writes usually need 'upsert' or 'deleteMany' then 'create'
//             // If your backend supports the Unified Nested structure we built earlier:
//             // You might need to adjust this based on your exact backend implementation.
//             // A common strategy for full overwrite:
//             deleteMany: {}, // Clear old sections (Use with caution!)
//             create: data.sections.map((section, sIdx) => ({
//                 name: section.name,
//                 order: sIdx,
//                 defaultMarks: Number(section.defaultMarks),
//                 questions: {
//                     create: section.questions.map((q, qIdx) => ({
//                         text: q.text,
//                         optionA: q.optionA,
//                         optionB: q.optionB,
//                         optionC: q.optionC,
//                         optionD: q.optionD,
//                         correctOption: q.correctOption,
//                         explanation: q.explanation || null,
//                         marks: Number(q.marks),
//                         order: qIdx
//                     }))
//                 }
//             }))
//         }
//       };

//       await api.patch(`/exams/${id}`, payload);
//       toast.success("Exam updated successfully");
//       router.push("/admin/exams");
//     } catch (error: any) {
//       toast.error(error.response?.data?.message || "Failed to update exam");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   if (!initialValues)
//     return (
//         <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
//             <CircularProgress />
//         </Box>
//     );

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Typography variant="h4" fontWeight="bold" mb={4}>Edit Exam</Typography>
//       <UnifiedExamForm
//         initialValues={initialValues}
//         onSubmit={handleSubmit}
//         isSaving={isSaving}
//       />
//     </Container>
//   );
// }
