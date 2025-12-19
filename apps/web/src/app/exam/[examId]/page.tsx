// apps/web/src/app/exam/[examId]/page.tsx
"use client";

import React, { useEffect, useState, useCallback } from "react";
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
  CircularProgress,
  Chip,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useResult } from "@/contexts/ResultContext";
import toast from "react-hot-toast";
import { Exam } from "@/types";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Save,
} from "@mui/icons-material";

export default function TakeExamPage() {
  const { examId } = useParams();
  const router = useRouter();
  const { setResultData } = useResult();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [exam, setExam] = useState<Exam | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  useEffect(() => {
    if (examId) {
      api
        .get(`/exams/${examId}`)
        .then(({ data }) => {
          setExam(data);
          setTimeLeft((data.durationMinutes || 60) * 60);
        })
        .catch((err) => toast.error("Failed to load exam"));
    }
  }, [examId]);

  useEffect(() => {
    if (timeLeft <= 0 && exam && !submitting) {
      // Optional: Auto submit logic here
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, exam, submitting]);

  const handleAnswerChange = useCallback(
    (questionId: string, value: string) => {
      setAnswers((prev) => ({ ...prev, [questionId]: value }));
    },
    []
  );

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveSectionIndex(newValue);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    if (!confirm("Are you sure you want to finish and submit the exam?"))
      return;
    setSubmitting(true);

    let score = 0;
    let correctCount = 0;
    let wrongCount = 0;

    const totalQuestions =
      exam?.sections.reduce((acc, sec) => acc + sec.questions.length, 0) || 0;

    exam?.sections.forEach((section) => {
      section.questions.forEach((q) => {
        const userAnswer = answers[q.id];

        // CRITICAL FIX: Normalize correctOption to ensure accurate comparison
        const correctOpt = (q.correctOption || "").trim().toUpperCase();

        if (userAnswer) {
          if (userAnswer === correctOpt) {
            score += q.marks || 1;
            correctCount++;
          } else {
            wrongCount++;
            if (exam.hasNegativeMarking) {
              score -= exam.negativeMarkingValue || 0.25;
            }
          }
        }
      });
    });

    if (exam) {
      setResultData(exam, {
        examName: exam.name,
        totalQuestions,
        score,
        correctCount,
        wrongCount,
        answers,
        examData: exam,
      });
    }

    router.push(`/result/${examId}`);
  };

  if (!exam)
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const activeSection = exam.sections[activeSectionIndex];
  const isLastSection = activeSectionIndex === exam.sections.length - 1;

  // Helper to count answered questions in a section
  const getAnsweredCount = (sectionIndex: number) => {
    const section = exam.sections[sectionIndex];
    return section.questions.filter((q) => answers[q.id]).length;
  };

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      {/* Sticky Header */}
      <Paper
        elevation={4}
        sx={{
          p: 2,
          mb: 3,
          position: "sticky",
          top: 0,
          zIndex: 1100,
          borderRadius: 2,
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            variant={isMobile ? "subtitle1" : "h6"}
            fontWeight="bold"
            noWrap
            sx={{ maxWidth: "60%" }}
          >
            {exam.name}
          </Typography>
          <Chip
            label={formatTime(timeLeft)}
            color={timeLeft < 300 ? "error" : "primary"}
            sx={{ fontWeight: "bold", fontSize: "1rem", minWidth: 80 }}
          />
        </Box>

        {/* Section Tabs */}
        <Tabs
          value={activeSectionIndex}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ mt: 1, minHeight: 48 }}
        >
          {exam.sections.map((sec, idx) => (
            <Tab
              key={sec.id}
              label={
                <Box display="flex" alignItems="center" gap={1}>
                  {sec.name}
                  {getAnsweredCount(idx) === sec.questions.length && (
                    <CheckCircle fontSize="small" color="success" />
                  )}
                </Box>
              }
              sx={{ textTransform: "none", fontWeight: "bold" }}
            />
          ))}
        </Tabs>
      </Paper>

      {/* Active Section Content */}
      <Box mb={4} minHeight="60vh">
        <Box
          sx={{
            mb: 3,
            p: 2,
            bgcolor: "#f0f7ff",
            borderRadius: 2,
            borderLeft: "4px solid #1976d2",
          }}
        >
          <Typography variant="h6" color="primary.main" fontWeight="bold">
            {activeSection.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {activeSection.questions.length} Questions •{" "}
            {getAnsweredCount(activeSectionIndex)} Answered
          </Typography>
        </Box>

        {activeSection.questions.map((q, qIndex) => {
          const isAnswered = answers[q.id] !== undefined;

          return (
            <Paper
              key={q.id}
              sx={{
                p: 3,
                mb: 2,
                border: isAnswered ? "1px solid #4caf50" : "1px solid #eee",
              }}
            >
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
                    disabled={isAnswered}
                    label={
                      <Box display="flex" gap={1}>
                        <Typography
                          fontWeight="bold"
                          color={
                            isAnswered && answers[q.id] !== opt
                              ? "text.disabled"
                              : "text.secondary"
                          }
                        >
                          ({opt})
                        </Typography>
                        <Typography
                          color={
                            isAnswered && answers[q.id] !== opt
                              ? "text.disabled"
                              : "text.primary"
                          }
                        >
                          {(q as any)[`option${opt}`]}
                        </Typography>
                      </Box>
                    }
                    sx={{
                      mb: 1,
                      borderRadius: 1,
                      p: 0.5,
                      backgroundColor:
                        answers[q.id] === opt ? "#e8f5e9" : "transparent",
                      transition: "background-color 0.3s",
                      opacity: isAnswered && answers[q.id] !== opt ? 0.6 : 1,
                    }}
                  />
                ))}
              </RadioGroup>
            </Paper>
          );
        })}
      </Box>

      {/* Navigation Footer */}
      <Paper
        elevation={6}
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          p: 2,
          zIndex: 1100,
          borderTop: "1px solid #ddd",
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            variant="outlined"
            startIcon={<ChevronLeft />}
            disabled={activeSectionIndex === 0}
            onClick={() => handleTabChange({} as any, activeSectionIndex - 1)}
          >
            Prev
          </Button>

          <Button
            variant="contained"
            color="success"
            size="large"
            startIcon={<Save />}
            onClick={handleSubmit}
            disabled={submitting}
            sx={{ px: 4, fontWeight: "bold" }}
          >
            {submitting ? "Submitting..." : "Submit Exam"}
          </Button>

          <Button
            variant="contained"
            endIcon={<ChevronRight />}
            onClick={() => handleTabChange({} as any, activeSectionIndex + 1)}
            sx={{ visibility: isLastSection ? "hidden" : "visible" }}
          >
            Next
          </Button>
        </Container>
      </Paper>

      {/* Spacer for fixed footer */}
      <Box height={80} />
    </Container>
  );
}