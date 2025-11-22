// apps/web/src/app/admin/upload-questions/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Alert,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { useAuth } from "@/contexts/AuthContext";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import * as Papa from "papaparse";
import { getExams } from "@/services/api";
import type { Exam } from "@/types";

// Define the template data
const questionTemplate = [
  {
    subject: "Bangla",
    ques_no: 1,
    ques: "Sample question text?",
    option_1: "Option A",
    option_2: "Option B",
    option_3: "Option C",
    option_4: "Option D",
    correctAnswer: "Option A",
    explanation: "This is the explanation.",
  },
  {
    subject: "English",
    ques_no: 1,
    ques: "Another sample question?",
    option_1: "Choice 1",
    option_2: "Choice 2",
    option_3: "Choice 3",
    option_4: "Choice 4",
    correctAnswer: "Choice 2",
    explanation: "This is another explanation.",
  },
];

export default function UploadQuestionsPage() {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [exams, setExams] = useState<Exam[]>([]);
  const [selectedExam, setSelectedExam] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    if (!loading && (!isAuthenticated || user?.role !== "admin")) {
      router.push("/login"); // Redirect if not admin
    } else if (isAuthenticated) {
      // Fetch exams for the dropdown
      getExams()
        .then((res) => setExams(res.data))
        .catch((err) => setError((err as Error).message));
    }
  }, [user, loading, isAuthenticated, router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleExamChange = (e: SelectChangeEvent<string>) => {
    setSelectedExam(e.target.value);
  };

  const handleDownloadTemplate = () => {
    const csv = Papa.unparse(questionTemplate);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "question_upload_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }
    if (!selectedExam) {
      setError("Please select an exam.");
      return;
    }

    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post(
        `/api/upload/questions/${selectedExam}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSuccess(res.data.message);
      setFile(null);
      setSelectedExam("");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || !isAuthenticated || user?.role !== "admin") {
    return <LoadingSpinner />;
  }

  return (
    <Container maxWidth="md" className="mt-8">
      <Paper elevation={3} className="p-6">
        <Typography variant="h4" gutterBottom>
          Upload Questions for Exam
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Select an exam, then upload a CSV file with all its questions.
        </Typography>

        <Box my={3}>
          <Button variant="outlined" onClick={handleDownloadTemplate}>
            Download Questions CSV Template
          </Button>
        </Box>

        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" className="mb-4">
            {success}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <FormControl fullWidth margin="normal">
            <InputLabel id="exam-select-label">Select Exam</InputLabel>
            <Select
              labelId="exam-select-label"
              value={selectedExam}
              label="Select Exam"
              onChange={handleExamChange}
            >
              {exams.map((exam) => (
                <MenuItem key={exam.id} value={exam.id}>
                  {exam.exam_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            type="file"
            fullWidth
            margin="normal"
            onChange={handleFileChange}
            inputProps={{ accept: ".csv" }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!file || !selectedExam || isSubmitting}
            sx={{ mt: 2, py: 1.5 }}
          >
            {isSubmitting ? "Uploading..." : "Upload Questions"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
