// apps/web/src/components/admin/exam-form/QuestionItem.tsx
"use client";

import React from "react";
import { UseFormRegister } from "react-hook-form";
import { ExamFormValues } from "@/types/exam-form";
import {
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  IconButton,
  Chip,
  Tooltip,
} from "@mui/material";
import { Delete, DragIndicator } from "@mui/icons-material";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface QuestionItemProps {
  register: UseFormRegister<ExamFormValues>;
  sectionIndex: number;
  qIndex: number;
  removeQuestion: (index: number) => void;
  questionId: string;
}

export default function QuestionItem({
  register,
  sectionIndex,
  qIndex,
  removeQuestion,
  questionId,
}: QuestionItemProps) {
  const optionLabels: Array<"A" | "B" | "C" | "D"> = ["A", "B", "C", "D"];

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: questionId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      variant="outlined"
      sx={{
        position: "relative",
        bgcolor: "#fff",
        "&:hover": { borderColor: "primary.main" },
        boxShadow: isDragging ? 3 : 0,
      }}
    >
      <Tooltip title="Remove Question">
        <IconButton
          size="small"
          onClick={() => removeQuestion(qIndex)}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "text.disabled",
            "&:hover": { color: "error.main" },
          }}
        >
          <Delete fontSize="small" />
        </IconButton>
      </Tooltip>

      <CardContent sx={{ pb: "16px !important" }}>
        {/* Question Text and Marks */}
        <Box display="flex" gap={2} mb={2} alignItems="flex-start">
          <Box
            {...attributes}
            {...listeners}
            sx={{
              cursor: isDragging ? "grabbing" : "grab",
              display: "flex",
              alignItems: "center",
              mt: 1,
              "&:hover": { color: "primary.main" },
            }}
          >
            <DragIndicator />
          </Box>
          <Chip
            label={`Q${qIndex + 1}`}
            size="small"
            color="default"
            sx={{ mt: 1, fontWeight: "bold" }}
          />
          <TextField
            fullWidth
            multiline
            label="Question Text"
            placeholder="Enter your question..."
            variant="standard"
            {...register(`sections.${sectionIndex}.questions.${qIndex}.text`, {
              required: true,
            })}
            InputProps={{
              disableUnderline: false,
              style: { fontSize: "1.1rem" },
            }}
          />
          <TextField
            sx={{ width: 100 }}
            label="Marks"
            type="number"
            variant="standard"
            {...register(`sections.${sectionIndex}.questions.${qIndex}.marks`)}
          />
        </Box>

        {/* Options Grid */}
        <Grid container spacing={2}>
          {optionLabels.map((opt) => (
            <Grid size={{ xs: 12, md: 6 }} key={opt}>
              <Box
                display="flex"
                alignItems="center"
                gap={1}
                sx={{ bgcolor: "#f9fafb", p: 1, borderRadius: 1 }}
              >
                <input
                  type="radio"
                  value={opt}
                  style={{
                    width: 18,
                    height: 18,
                    cursor: "pointer",
                    accentColor: "#1976d2",
                  }}
                  {...register(
                    `sections.${sectionIndex}.questions.${qIndex}.correctOption`
                  )}
                />
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  color="text.secondary"
                  sx={{ minWidth: 20 }}
                >
                  {opt}.
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  variant="standard"
                  placeholder={`Option ${opt}`}
                  {...register(
                    `sections.${sectionIndex}.questions.${qIndex}.option${opt}`,
                    { required: true }
                  )}
                  InputProps={{ disableUnderline: true }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Explanation */}
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          label="Explanation (Optional)"
          placeholder="Why is this correct?"
          sx={{ mt: 2, bgcolor: "#f0f7ff" }}
          {...register(
            `sections.${sectionIndex}.questions.${qIndex}.explanation`
          )}
        />
      </CardContent>
    </Card>
  );
}
