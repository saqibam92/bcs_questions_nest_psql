// apps/web/src/components/admin/exam-form/QuestionBankModal.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  Chip,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  InputAdornment,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@mui/material";
import {
  Search,
  FilterList,
  CheckCircle,
  ExpandMore,
} from "@mui/icons-material";
import toast from "react-hot-toast";

// Mock API call - Replace with your actual API
const fetchQuestionBank = async (filters: {
  subject?: string;
  search?: string;
}) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock data - Replace with actual API call
  return [
    {
      id: "1",
      text: "What is the capital of Bangladesh?",
      optionA: "Dhaka",
      optionB: "Chittagong",
      optionC: "Sylhet",
      optionD: "Rajshahi",
      correctOption: "A",
      explanation: "Dhaka is the capital and largest city of Bangladesh.",
      subject: "General Knowledge",
      difficulty: "Easy",
      tags: ["Geography", "Bangladesh"],
    },
    {
      id: "2",
      text: "Who wrote 'Gitanjali'?",
      optionA: "Kazi Nazrul Islam",
      optionB: "Rabindranath Tagore",
      optionC: "Michael Madhusudan Dutt",
      optionD: "Jibanananda Das",
      correctOption: "B",
      explanation:
        "Rabindranath Tagore wrote Gitanjali, a collection of poems.",
      subject: "General Knowledge",
      difficulty: "Medium",
      tags: ["Literature", "Bengali Literature"],
    },
    {
      id: "3",
      text: "What is 2 + 2?",
      optionA: "3",
      optionB: "4",
      optionC: "5",
      optionD: "6",
      correctOption: "B",
      explanation: "Basic arithmetic: 2 + 2 = 4",
      subject: "Mathematics",
      difficulty: "Easy",
      tags: ["Arithmetic", "Basic Math"],
    },
  ];
};

interface QuestionBankModalProps {
  open: boolean;
  onClose: () => void;
  onImport: (questions: any[]) => void;
  sectionName?: string;
}

export default function QuestionBankModal({
  open,
  onClose,
  onImport,
  sectionName,
}: QuestionBankModalProps) {
  const [questions, setQuestions] = useState<any[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState(sectionName || "");

  useEffect(() => {
    if (open) {
      loadQuestions();
    }
  }, [open, subjectFilter]);

  const loadQuestions = async () => {
    setLoading(true);
    try {
      const data = await fetchQuestionBank({
        subject: subjectFilter,
        search: searchTerm,
      });
      setQuestions(data);
    } catch (error) {
      toast.error("Failed to load questions from bank");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleQuestion = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedIds.size === questions.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(questions.map((q) => q.id)));
    }
  };

  const handleImport = () => {
    const selectedQuestions = questions.filter((q) => selectedIds.has(q.id));

    if (selectedQuestions.length === 0) {
      toast.error("Please select at least one question");
      return;
    }

    onImport(selectedQuestions);
    setSelectedIds(new Set());
  };

  const handleClose = () => {
    setSelectedIds(new Set());
    setSearchTerm("");
    onClose();
  };

  const filteredQuestions = questions.filter((q) =>
    q.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h6">Question Bank</Typography>
            <Typography variant="caption" color="text.secondary">
              Import questions from your question library
            </Typography>
          </Box>
          <Chip
            label={`${selectedIds.size} Selected`}
            color={selectedIds.size > 0 ? "primary" : "default"}
            icon={<CheckCircle />}
          />
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        {/* Search and Filters */}
        <Box sx={{ mb: 3 }}>
          <Box display="flex" gap={2} mb={2}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="outlined"
              startIcon={<FilterList />}
              onClick={loadQuestions}
            >
              Search
            </Button>
          </Box>

          <Box display="flex" gap={1} alignItems="center">
            <Chip
              label="General Knowledge"
              onClick={() => setSubjectFilter("General Knowledge")}
              color={
                subjectFilter === "General Knowledge" ? "primary" : "default"
              }
              size="small"
            />
            <Chip
              label="Mathematics"
              onClick={() => setSubjectFilter("Mathematics")}
              color={subjectFilter === "Mathematics" ? "primary" : "default"}
              size="small"
            />
            <Chip
              label="English"
              onClick={() => setSubjectFilter("English")}
              color={subjectFilter === "English" ? "primary" : "default"}
              size="small"
            />
            <Chip
              label="All"
              onClick={() => setSubjectFilter("")}
              color={subjectFilter === "" ? "primary" : "default"}
              size="small"
            />
          </Box>
        </Box>

        {/* Select All */}
        {!loading && filteredQuestions.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedIds.size === filteredQuestions.length}
                  indeterminate={
                    selectedIds.size > 0 &&
                    selectedIds.size < filteredQuestions.length
                  }
                  onChange={handleSelectAll}
                />
              }
              label={
                <Typography variant="body2" fontWeight="bold">
                  Select All ({filteredQuestions.length} questions)
                </Typography>
              }
            />
          </Box>
        )}

        {/* Loading State */}
        {loading && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            py={8}
          >
            <CircularProgress />
          </Box>
        )}

        {/* Empty State */}
        {!loading && filteredQuestions.length === 0 && (
          <Alert severity="info" sx={{ mt: 2 }}>
            No questions found. Try adjusting your filters.
          </Alert>
        )}

        {/* Questions List */}
        {!loading && filteredQuestions.length > 0 && (
          <Box sx={{ maxHeight: 400, overflowY: "auto" }}>
            {filteredQuestions.map((question, index) => (
              <Accordion
                key={question.id}
                sx={{
                  mb: 1,
                  border: selectedIds.has(question.id)
                    ? "2px solid #1976d2"
                    : "1px solid #e0e0e0",
                  "&:before": { display: "none" },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  sx={{ bgcolor: "#fafafa" }}
                >
                  <Box display="flex" alignItems="center" gap={2} width="100%">
                    <Checkbox
                      checked={selectedIds.has(question.id)}
                      onChange={() => handleToggleQuestion(question.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <Box flex={1}>
                      <Typography variant="body2" fontWeight="500">
                        {question.text}
                      </Typography>
                      <Box display="flex" gap={1} mt={0.5}>
                        <Chip
                          label={question.subject}
                          size="small"
                          sx={{ height: 20, fontSize: "0.7rem" }}
                        />
                        <Chip
                          label={question.difficulty}
                          size="small"
                          color={
                            question.difficulty === "Easy"
                              ? "success"
                              : question.difficulty === "Medium"
                              ? "warning"
                              : "error"
                          }
                          sx={{ height: 20, fontSize: "0.7rem" }}
                        />
                      </Box>
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ pl: 5 }}>
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                    >
                      {["A", "B", "C", "D"].map((opt) => (
                        <Box
                          key={opt}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            p: 1,
                            borderRadius: 1,
                            bgcolor:
                              question.correctOption === opt
                                ? "#e8f5e9"
                                : "#f5f5f5",
                          }}
                        >
                          <Typography
                            variant="body2"
                            fontWeight="bold"
                            sx={{ minWidth: 20 }}
                          >
                            {opt}.
                          </Typography>
                          <Typography variant="body2">
                            {question[`option${opt}`]}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                    {question.explanation && (
                      <>
                        <Divider sx={{ my: 1 }} />
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ fontStyle: "italic" }}
                        >
                          <strong>Explanation:</strong> {question.explanation}
                        </Typography>
                      </>
                    )}
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleImport}
          variant="contained"
          color="primary"
          disabled={selectedIds.size === 0}
        >
          Import {selectedIds.size > 0 && `(${selectedIds.size})`} Questions
        </Button>
      </DialogActions>
    </Dialog>
  );
}
