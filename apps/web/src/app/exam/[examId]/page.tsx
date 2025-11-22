// src/app/exam/[examId]/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useResult } from "@/contexts/ResultContext"; // Assuming you have this context
import toast from "react-hot-toast";

export default function TakeExamPage() {
  const { examId } = useParams();
  const router = useRouter();
  const { setExamResult } = useResult(); // Context to store results for the result page

  const [exam, setExam] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (examId) {
      api
        .get(`/exam/${examId}`)
        .then(({ data }) => {
          setExam(data);
          // Assuming duration is in minutes
          setTimeLeft((data.durationMinutes || 60) * 60);
        })
        .catch((err) => toast.error("Failed to load exam"));
    }
  }, [examId]);

  // Timer Logic
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async () => {
    if (!confirm("Are you sure you want to submit?")) return;
    setSubmitting(true);

    // Calculate Result Locally (Or send to backend)
    // Structure: { examId, answers: { qId: option } }

    let score = 0;
    let correctCount = 0;
    let wrongCount = 0;
    const totalQuestions = exam.sections.reduce(
      (acc: number, sec: any) => acc + sec.questions.length,
      0
    );

    // Iterate sections to check answers
    exam.sections.forEach((section: any) => {
      section.questions.forEach((q: any) => {
        const userAnswer = answers[q.id];
        if (userAnswer) {
          if (userAnswer === q.correctOption) {
            score += q.marks || 1;
            correctCount++;
          } else {
            wrongCount++;
            // Handle negative marking if applicable
            if (exam.hasNegativeMarking) {
              score -= exam.negativeMarkingValue || 0.25;
            }
          }
        }
      });
    });

    // Store result in context to show on Result Page
    setExamResult({
      examName: exam.name,
      totalQuestions,
      score,
      correctCount,
      wrongCount,
      answers, // Pass user answers to review
      examData: exam, // Pass full exam data to review questions
    });

    router.push(`/result/${examId}`);
  };

  if (!exam)
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );

  // Format Timer
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Header with Timer */}
      <Paper
        sx={{
          p: 2,
          mb: 4,
          position: "sticky",
          top: 10,
          zIndex: 100,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          border: "1px solid #ddd",
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          {exam.name}
        </Typography>
        <Box
          sx={{
            bgcolor: timeLeft < 300 ? "error.light" : "primary.light",
            color: "white",
            px: 2,
            py: 1,
            borderRadius: 2,
            fontWeight: "bold",
          }}
        >
          Time Left: {formatTime(timeLeft)}
        </Box>
      </Paper>

      {/* Sections Loop */}
      {exam.sections.map((section: any, sIndex: number) => (
        <Box key={section.id} mb={6}>
          <Box sx={{ mb: 3, borderLeft: "5px solid #1976d2", pl: 2 }}>
            <Typography variant="h5" fontWeight="bold" color="primary.main">
              {section.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {section.questions.length} Questions | Marks per Question:{" "}
              {section.defaultMarks}
            </Typography>
          </Box>

          {section.questions.map((q: any, qIndex: number) => (
            <Paper key={q.id} sx={{ p: 3, mb: 2 }}>
              <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                {qIndex + 1}. {q.text}
              </Typography>

              <RadioGroup
                value={answers[q.id] || ""}
                onChange={(e) => handleAnswerChange(q.id, e.target.value)}
              >
                {["A", "B", "C", "D"].map((opt) => (
                  <FormControlLabel
                    key={opt}
                    value={opt}
                    control={<Radio />}
                    label={
                      <Box display="flex" gap={1}>
                        <Typography fontWeight="bold" color="text.secondary">
                          ({opt})
                        </Typography>
                        <Typography>{q[`option${opt}`]}</Typography>
                      </Box>
                    }
                    sx={{ mb: 1 }}
                  />
                ))}
              </RadioGroup>
            </Paper>
          ))}
        </Box>
      ))}

      <Box mt={4} display="flex" justifyContent="center">
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={handleSubmit}
          disabled={submitting}
          sx={{ px: 8, py: 1.5, fontSize: "1.2rem" }}
        >
          {submitting ? "Submitting..." : "Submit Exam"}
        </Button>
      </Box>
    </Container>
  );
}