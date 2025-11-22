// apps/web/src/components/admin/exam-form/ExamConfigCard.tsx
"use client";

import React from "react";
import { UseFormRegister, UseFormWatch, FieldErrors } from "react-hook-form";
import { ExamFormValues } from "@/types/exam-form";
import {
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  Chip,
} from "@mui/material";
import { Layers, ContentPaste } from "@mui/icons-material";

interface ExamConfigCardProps {
  register: UseFormRegister<ExamFormValues>;
  errors: FieldErrors<ExamFormValues>;
  watch: UseFormWatch<ExamFormValues>;
  totalQuestions: number;
}

export default function ExamConfigCard({
  register,
  errors,
  watch,
  totalQuestions,
}: ExamConfigCardProps) {
  const hasNegativeMarking = watch("hasNegativeMarking");

  return (
    <Card sx={{ mb: 4, p: 1, borderRadius: 3, boxShadow: 2 }}>
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography
            variant="h5"
            fontWeight="800"
            display="flex"
            alignItems="center"
            gap={1}
            color="primary.main"
          >
            <Layers /> Exam Configuration
          </Typography>
          <Chip
            label={`${totalQuestions} Question${
              totalQuestions !== 1 ? "s" : ""
            } Added`}
            color="primary"
            variant="outlined"
            icon={<ContentPaste />}
          />
        </Box>

        <Grid container spacing={3}>
          {/* Exam Name */}
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Exam Name"
              placeholder="e.g. 46th BCS Preliminary Test"
              {...register("name", { required: "Exam Name is required" })}
              error={!!errors.name}
              helperText={errors.name?.message}
              variant="outlined"
            />
          </Grid>

          {/* Slug */}
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Slug (URL)"
              {...register("slug", { required: true })}
              InputLabelProps={{ shrink: true }}
              sx={{ bgcolor: "grey.50" }}
            />
          </Grid>

          {/* Date & Time */}
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              type="datetime-local"
              label="Date & Time"
              InputLabelProps={{ shrink: true }}
              {...register("examDate")}
            />
          </Grid>

          {/* Duration */}
          <Grid size={{ xs: 6, md: 2 }}>
            <TextField
              fullWidth
              type="number"
              label="Duration (min)"
              {...register("durationMinutes", { required: true, min: 1 })}
            />
          </Grid>

          {/* Total Marks */}
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              fullWidth
              type="number"
              label="Total Marks"
              {...register("totalMarks")}
            />
          </Grid>

          {/* Passing Marks */}
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              fullWidth
              type="number"
              label="Passing Marks"
              {...register("passingMarks")}
            />
          </Grid>

          {/* Negative Marking */}
          <Grid size={{ xs: 12 }}>
            <Box
              sx={{
                p: 2,
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                bgcolor: "#f9fafb",
                display: "flex",
                alignItems: "center",
                gap: 3,
              }}
            >
              <FormControlLabel
                control={<Checkbox {...register("hasNegativeMarking")} />}
                label={
                  <Typography fontWeight="bold">
                    Enable Negative Marking
                  </Typography>
                }
              />
              {hasNegativeMarking && (
                <TextField
                  size="small"
                  label="Deduct per wrong answer"
                  type="number"
                  inputProps={{ step: "0.01" }}
                  {...register("negativeMarkingValue")}
                  sx={{ width: 200, bgcolor: "white" }}
                />
              )}
            </Box>
          </Grid>

          {/* Description */}
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              multiline
              rows={2}
              label="Description / Instructions"
              {...register("description")}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
