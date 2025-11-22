// apps/web/src/components/admin/exam-form/QuestionList.tsx
"use client";

import React from "react";
import { UseFormRegister, FieldArrayWithId } from "react-hook-form";
import { ExamFormValues } from "@/types/exam-form";
import { Box, Typography } from "@mui/material";
import QuestionItem from "./QuestionItem";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import toast from "react-hot-toast";

interface QuestionListProps {
  register: UseFormRegister<ExamFormValues>;
  sectionIndex: number;
  questionFields: FieldArrayWithId<
    ExamFormValues,
    `sections.${number}.questions`,
    "id"
  >[];
  removeQuestion: (index: number) => void;
  moveQuestion: (from: number, to: number) => void;
}

export default function QuestionList({
  register,
  sectionIndex,
  questionFields,
  removeQuestion,
  moveQuestion,
}: QuestionListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = questionFields.findIndex(
        (item) => item.id === active.id
      );
      const newIndex = questionFields.findIndex((item) => item.id === over.id);
      moveQuestion(oldIndex, newIndex);
      toast.success("Question reordered");
    }
  };
  if (questionFields.length === 0) {
    return (
      <Box
        sx={{
          py: 4,
          textAlign: "center",
          color: "text.secondary",
          border: "2px dashed #e0e0e0",
          borderRadius: 2,
        }}
      >
        <Typography variant="body1">
          No questions in this section yet.
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Use the buttons below to add questions
        </Typography>
      </Box>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={questionFields.map((q) => q.id)}
        strategy={verticalListSortingStrategy}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {questionFields.map((question, qIndex) => (
            <QuestionItem
              key={question.id}
              questionId={question.id}
              register={register}
              sectionIndex={sectionIndex}
              qIndex={qIndex}
              removeQuestion={removeQuestion}
            />
          ))}
        </Box>
      </SortableContext>
    </DndContext>
  );
}
