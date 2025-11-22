// apps/web/src/components/admin/UnifiedExamForm.tsx
"use client";

import React, { useEffect } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { ExamFormValues } from "@/types/exam-form";
import { Box, Button, Chip } from "@mui/material";
import { Add, Save, ContentPaste } from "@mui/icons-material";
import toast from "react-hot-toast";
import ExamConfigCard from "./exam-form/ExamConfigCard";
import SectionList from "./exam-form/SectionList";
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

interface UnifiedExamFormProps {
  initialValues?: Partial<ExamFormValues>;
  onSubmit: (data: ExamFormValues) => Promise<void>;
  isSaving: boolean;
}

export default function UnifiedExamForm({
  initialValues,
  onSubmit,
  isSaving,
}: UnifiedExamFormProps) {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ExamFormValues>({
    defaultValues: initialValues || {
      name: "",
      slug: "",
      durationMinutes: 60,
      totalMarks: 100,
      passingMarks: 40,
      hasNegativeMarking: false,
      negativeMarkingValue: 0.25,
      isPublished: false,
      sections: [
        {
          name: "General Knowledge",
          defaultMarks: 1,
          questions: [],
        },
      ],
    },
  });

  const {
    fields: sectionFields,
    append: appendSection,
    remove: removeSection,
    move: moveSection,
  } = useFieldArray({
    control,
    name: "sections",
  });

  // Drag and Drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = sectionFields.findIndex((item) => item.id === active.id);
      const newIndex = sectionFields.findIndex((item) => item.id === over.id);
      moveSection(oldIndex, newIndex);
      toast.success("Section reordered");
    }
  };

  // Auto-generate slug from Exam Name
  const examName = useWatch({ control, name: "name" });
  useEffect(() => {
    if (examName && !initialValues?.slug) {
      setValue(
        "slug",
        examName
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/[^\w-]+/g, "")
      );
    }
  }, [examName, setValue, initialValues]);

  // Calculate total questions across all sections
  const sections = useWatch({ control, name: "sections" });
  const totalQuestions =
    sections?.reduce((acc, sec) => acc + (sec.questions?.length || 0), 0) || 0;

  const handleFormSubmit = (data: ExamFormValues) => {
    if (data.sections.length === 0) {
      toast.error("Please add at least one section");
      return;
    }

    const hasQuestionsInAnySections = data.sections.some(
      (section) => section.questions.length > 0
    );

    if (!hasQuestionsInAnySections) {
      toast.error("Please add at least one question");
      return;
    }

    onSubmit(data);
  };

  const handleAddSection = () => {
    appendSection({
      name: "New Section",
      defaultMarks: 1,
      questions: [],
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)}
      sx={{ pb: 12 }}
    >
      {/* Exam Configuration */}
      <ExamConfigCard
        register={register}
        errors={errors}
        watch={watch}
        totalQuestions={totalQuestions}
      />

      {/* Section Header with Add Button */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
        mt={4}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Box
            sx={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "text.secondary",
            }}
          >
            Question Sections
          </Box>
          <Chip
            label={`${sectionFields.length} Section${
              sectionFields.length !== 1 ? "s" : ""
            }`}
            color="default"
            size="small"
            icon={<ContentPaste />}
          />
        </Box>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Add />}
          onClick={handleAddSection}
          sx={{
            bgcolor: "text.primary",
            color: "white",
            "&:hover": { bgcolor: "text.secondary" },
          }}
        >
          Add Section
        </Button>
      </Box>

      {/* Sections List */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sectionFields.map((s) => s.id)}
          strategy={verticalListSortingStrategy}
        >
          <SectionList
            control={control}
            register={register}
            sectionFields={sectionFields}
            removeSection={removeSection}
          />
        </SortableContext>
      </DndContext>

      {/* Sticky Footer Actions */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          bgcolor: "white",
          borderTop: "1px solid #e0e0e0",
          p: 2,
          zIndex: 1200,
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
          boxShadow: "0px -4px 10px rgba(0,0,0,0.05)",
        }}
      >
        <Button variant="outlined" color="inherit" sx={{ px: 4 }}>
          Save Draft
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSaving}
          startIcon={isSaving ? null : <Save />}
          sx={{ px: 5, py: 1.2, fontSize: "1rem", fontWeight: "bold" }}
        >
          {isSaving ? "Publishing..." : "Publish Exam"}
        </Button>
      </Box>
    </Box>
  );
}
