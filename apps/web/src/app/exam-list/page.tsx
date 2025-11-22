// src/app/exam-list/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Container, Typography } from "@mui/material";
import ExamCard from "../../components/ExamCard";
import LoadingSpinner from "../../components/LoadingSpinner";
import { getExams } from "../../services/api";
import { Exam } from "../../types"; // Import our new type

export default function ExamList() {
  const [exams, setExams] = useState<Exam[]>([]); // Use the Exam type
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    getExams()
      .then((data) => setExams(data.data)) // Access the data property
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container>
      <Typography variant="h4" className="my-4 text-center">
        BCS Exams
      </Typography>
      {exams.length > 0 ? (
        exams.map((exam) => (
          <ExamCard
            key={exam.id} // Use id from Prisma
            exam={exam}
            onClick={() => router.push(`/exam/${exam.id}`)} // Use id from Prisma
          />
        ))
      ) : (
        <Typography className="text-center">No exams available.</Typography>
      )}
    </Container>
  );
}