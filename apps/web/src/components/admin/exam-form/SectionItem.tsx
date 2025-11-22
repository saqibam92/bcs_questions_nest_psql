// apps/web/src/components/admin/exam-form/SectionItem.tsx
"use client";

import React, { useState } from "react";
import {
  Control,
  UseFormRegister,
  useFieldArray,
  useWatch,
  Controller,
} from "react-hook-form";
import { ExamFormValues } from "@/types/exam-form";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Autocomplete,
  Divider,
  Chip,
} from "@mui/material";
import {
  ExpandMore,
  Delete,
  Add,
  DragIndicator,
  CloudUpload,
  LibraryBooks,
} from "@mui/icons-material";
import toast from "react-hot-toast";
import QuestionList from "./QuestionList";
import BulkInputModal from "./BulkInputModal";
import QuestionBankModal from "./QuestionBankModal";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const PREDEFINED_SUBJECTS = [
  "সাধারণ জ্ঞান",
  "গণিত",
  "English Language",
  "English Literature",
  "বাংলা ভাষা ও সাহিত্য",
  "মানসিক দক্ষতা",
  "ICT",
  "আন্তর্জাতিক বিষয়াবলি",
  "ভূগোল",
];

interface SectionItemProps {
  control: Control<ExamFormValues>;
  register: UseFormRegister<ExamFormValues>;
  sectionIndex: number;
  removeSection: (index: number) => void;
  sectionId: string;
}

export default function SectionItem({
  control,
  register,
  sectionIndex,
  removeSection,
  sectionId,
}: SectionItemProps) {
  const {
    fields: questionFields,
    append: appendQuestion,
    remove: removeQuestion,
    move: moveQuestion,
  } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.questions`,
  });

  const [bulkOpen, setBulkOpen] = useState(false);
  const [questionBankOpen, setQuestionBankOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: sectionId });

  const defaultMarks =
    useWatch({ control, name: `sections.${sectionIndex}.defaultMarks` }) || 1;
  const sectionName = useWatch({
    control,
    name: `sections.${sectionIndex}.name`,
  });

  const handleAddSingleQuestion = () => {
    appendQuestion({
      text: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      correctOption: "A",
      marks: Number(defaultMarks),
      explanation: "",
      order: questionFields.length,
    });
  };

  const handleBulkSave = (newQuestions: any[]) => {
    const startOrder = questionFields.length;
    const questionsWithOrder = newQuestions.map((q, idx) => ({
      ...q,
      marks: Number(defaultMarks),
      order: startOrder + idx,
    }));
    appendQuestion(questionsWithOrder);
    toast.success(`Added ${newQuestions.length} questions!`);
    setBulkOpen(false);
  };

  const handleQuestionBankImport = (selectedQuestions: any[]) => {
    const startOrder = questionFields.length;
    const questionsWithOrder = selectedQuestions.map((q, idx) => ({
      text: q.text,
      optionA: q.optionA,
      optionB: q.optionB,
      optionC: q.optionC,
      optionD: q.optionD,
      correctOption: q.correctOption,
      explanation: q.explanation || "",
      marks: Number(defaultMarks),
      order: startOrder + idx,
    }));
    appendQuestion(questionsWithOrder);
    toast.success(`Imported ${selectedQuestions.length} questions from bank!`);
    setQuestionBankOpen(false);
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Accordion
      ref={setNodeRef}
      style={style}
      expanded={isExpanded}
      onChange={(_, expanded) => setIsExpanded(expanded)}
      sx={{
        border: "1px solid #e0e0e0",
        borderRadius: "8px !important",
        "&:before": { display: "none" },
        boxShadow: isDragging ? 3 : 1,
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
        sx={{ bgcolor: "#f8f9fa", borderBottom: "1px solid #e0e0e0" }}
      >
        <Box display="flex" alignItems="center" width="100%" gap={2}>
          <Box
            {...attributes}
            {...listeners}
            sx={{
              cursor: isDragging ? "grabbing" : "grab",
              display: "flex",
              alignItems: "center",
              "&:hover": { color: "primary.main" },
            }}
          >
            <DragIndicator />
          </Box>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{ width: { xs: "auto", md: "30%" }, flexShrink: 0 }}
          >
            {sectionName || "Untitled Section"}
          </Typography>
          <Chip
            label={`${questionFields.length} Question${
              questionFields.length !== 1 ? "s" : ""
            }`}
            size="small"
            color={questionFields.length > 0 ? "success" : "default"}
            sx={{
              bgcolor: questionFields.length > 0 ? undefined : "white",
              border: "1px solid #ddd",
            }}
          />
        </Box>
      </AccordionSummary>

      <AccordionDetails sx={{ p: 3, bgcolor: "#fff" }}>
        {/* Section Settings */}
        <Grid container spacing={2} alignItems="flex-start" mb={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              control={control}
              name={`sections.${sectionIndex}.name`}
              render={({ field }) => (
                <Autocomplete
                  freeSolo
                  options={PREDEFINED_SUBJECTS}
                  value={field.value}
                  onChange={(e, newValue) => field.onChange(newValue)}
                  onInputChange={(e, newInputValue) =>
                    field.onChange(newInputValue)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Section Name / Subject"
                      placeholder="Select or type..."
                      required
                    />
                  )}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              type="number"
              label="Default Marks per Q"
              fullWidth
              {...register(`sections.${sectionIndex}.defaultMarks`)}
            />
          </Grid>
          <Grid
            size={{ xs: 12, md: 3 }}
            display="flex"
            justifyContent="flex-end"
          >
            <Button
              color="error"
              variant="text"
              startIcon={<Delete />}
              onClick={() => removeSection(sectionIndex)}
            >
              Remove Section
            </Button>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Questions List */}
        <QuestionList
          register={register}
          sectionIndex={sectionIndex}
          questionFields={questionFields}
          removeQuestion={removeQuestion}
          moveQuestion={moveQuestion}
        />

        {/* Action Buttons */}
        <Grid container spacing={2} mt={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Add />}
              onClick={handleAddSingleQuestion}
              sx={{
                py: 2,
                borderStyle: "dashed",
                borderWidth: 2,
                "&:hover": { borderStyle: "dashed", borderWidth: 2 },
              }}
            >
              Add Single Question
            </Button>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              startIcon={<CloudUpload />}
              onClick={() => setBulkOpen(true)}
              sx={{ py: 2, fontWeight: "bold", boxShadow: 2 }}
            >
              Bulk Import
            </Button>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Button
              fullWidth
              variant="contained"
              color="info"
              startIcon={<LibraryBooks />}
              onClick={() => setQuestionBankOpen(true)}
              sx={{ py: 2, fontWeight: "bold", boxShadow: 2 }}
            >
              Question Bank
            </Button>
          </Grid>
        </Grid>

        {/* Modals */}
        <BulkInputModal
          open={bulkOpen}
          onClose={() => setBulkOpen(false)}
          onSave={handleBulkSave}
        />

        <QuestionBankModal
          open={questionBankOpen}
          onClose={() => setQuestionBankOpen(false)}
          onImport={handleQuestionBankImport}
          sectionName={sectionName}
        />
      </AccordionDetails>
    </Accordion>
  );
}
