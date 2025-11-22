// apps/web/src/components/admin/exam-form/SectionList.tsx
"use client";

import React from "react";
import { Control, UseFormRegister, FieldArrayWithId } from "react-hook-form";
import { ExamFormValues } from "@/types/exam-form";
import { Box, Typography } from "@mui/material";
import SectionItem from "./SectionItem";

interface SectionListProps {
  control: Control<ExamFormValues>;
  register: UseFormRegister<ExamFormValues>;
  sectionFields: FieldArrayWithId<ExamFormValues, "sections", "id">[];
  removeSection: (index: number) => void;
}

export default function SectionList({
  control,
  register,
  sectionFields,
  removeSection,
}: SectionListProps) {
  if (sectionFields.length === 0) {
    return (
      <Box
        sx={{
          py: 8,
          textAlign: "center",
          color: "text.secondary",
          border: "2px dashed #e0e0e0",
          borderRadius: 2,
          bgcolor: "#fafafa",
        }}
      >
        <Typography variant="h6" gutterBottom>
          No sections added yet
        </Typography>
        <Typography variant="body2">
          Click "Add Section" to create your first question section
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {sectionFields.map((section, index) => (
        <SectionItem
          key={section.id}
          sectionId={section.id}
          control={control}
          register={register}
          sectionIndex={index}
          removeSection={removeSection}
        />
      ))}
    </Box>
  );
}
