// apps/web/src/app/admin/upload-exams/page.tsx
"use client";

import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Alert,
  TextField,
} from "@mui/material";
import { useAuth } from "@/contexts/AuthContext";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import * as Papa from "papaparse";

// Define the template data
const examTemplate = [
  {
    exam_name: "Sample Exam 1",
    date: "2025-10-01T10:00:00.000Z",
    totalExaminees: 1000,
    highestMark: 95,
  },
  {
    exam_name: "Sample Exam 2",
    date: "2025-10-15T10:00:00.000Z",
    totalExaminees: 500,
    highestMark: 88,
  },
];

export default function UploadExamsPage() {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    if (!loading && (!isAuthenticated || user?.role !== "admin")) {
      router.push("/login"); // Redirect if not admin
    }
  }, [user, loading, isAuthenticated, router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleDownloadTemplate = () => {
    const csv = Papa.unparse(examTemplate);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "exam_upload_template.csv");
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

    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post("/api/upload/exams", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccess(res.data.message);
      setFile(null);
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
          Bulk Upload Exams
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Upload a CSV file with new exams. The required columns are:
          `exam_name`, `date` (YYYY-MM-DD), `totalExaminees`, and `highestMark`.
        </Typography>

        <Box my={3}>
          <Button variant="outlined" onClick={handleDownloadTemplate}>
            Download CSV Template
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
            disabled={!file || isSubmitting}
            sx={{ mt: 2, py: 1.5 }}
          >
            {isSubmitting ? "Uploading..." : "Upload Exams"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
