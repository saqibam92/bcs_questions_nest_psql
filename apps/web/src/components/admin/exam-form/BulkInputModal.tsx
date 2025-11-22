// apps/web/src/components/admin/exam-form/BulkInputModal.tsx
"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Grid,
  Box,
  Divider,
} from "@mui/material";
import { ContentPaste } from "@mui/icons-material";
import toast from "react-hot-toast";

interface BulkInputModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: any[]) => void;
}

export default function BulkInputModal({
  open,
  onClose,
  onSave,
}: BulkInputModalProps) {
  const [text, setText] = useState("");

  const handleParse = () => {
    // Split by double newline to separate questions
    const blocks = text.split(/\n\s*\n/);

    const questions = blocks
      .map((block) => {
        const lines = block
          .trim()
          .split("\n")
          .map((l) => l.trim())
          .filter((l) => l);
        if (lines.length < 3) return null; // Need at least Question + 2 options

        // 1. Extract Question (Remove leading numbers like "1. ")
        const qText = lines[0].replace(/^[0-9]+[\.\)]\s*/, "").trim();

        // 2. Extract Options (Look for A., B., a., b., etc.)
        const optA =
          lines
            .find((l) => /^(A[\.\)]|a[\.\)])/.test(l))
            ?.replace(/^(A[\.\)]|a[\.\)])\s*/, "") || "";
        const optB =
          lines
            .find((l) => /^(B[\.\)]|b[\.\)])/.test(l))
            ?.replace(/^(B[\.\)]|b[\.\)])\s*/, "") || "";
        const optC =
          lines
            .find((l) => /^(C[\.\)]|c[\.\)])/.test(l))
            ?.replace(/^(C[\.\)]|c[\.\)])\s*/, "") || "";
        const optD =
          lines
            .find((l) => /^(D[\.\)]|d[\.\)])/.test(l))
            ?.replace(/^(D[\.\)]|d[\.\)])\s*/, "") || "";

        // 3. Extract Correct Answer
        const correctLine = lines.find((l) =>
          /(Correct|Ans|Answer)\s*[:\-]\s*[A-Da-d]/.test(l)
        );
        let correctOption = "A";
        if (correctLine) {
          const match = correctLine.match(/[A-Da-d]/);
          if (match) correctOption = match[0].toUpperCase();
        }

        // 4. Extract Explanation
        const expLineIndex = lines.findIndex((l) =>
          /(Explanation|Exp|Note)\s*[:\-]/.test(l)
        );
        let explanation = "";
        if (expLineIndex > -1) {
          explanation = lines[expLineIndex].replace(
            /^(Explanation|Exp|Note)\s*[:\-]\s*/i,
            ""
          );
        }

        return {
          text: qText,
          optionA: optA,
          optionB: optB,
          optionC: optC,
          optionD: optD,
          correctOption: ["A", "B", "C", "D"].includes(correctOption)
            ? correctOption
            : "A",
          explanation: explanation,
        };
      })
      .filter((q) => q !== null && q.text !== "");

    if (questions.length === 0) {
      toast.error("Could not parse questions. Please check the format.");
      return;
    }

    onSave(questions);
    setText("");
  };

  const handleClose = () => {
    setText("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ bgcolor: "#f5f5f5" }}>
        Bulk Add Questions
        <Typography variant="caption" display="block" color="text.secondary">
          Paste your questions below. The system will automatically parse them.
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 8 }}>
            <TextField
              fullWidth
              multiline
              rows={16}
              placeholder="Paste your questions here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              sx={{ fontFamily: "monospace" }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ bgcolor: "#e3f2fd", p: 2, borderRadius: 2 }}>
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                gutterBottom
                color="primary"
              >
                Required Format
              </Typography>
              <Typography
                variant="caption"
                component="div"
                sx={{ fontFamily: "monospace", whiteSpace: "pre-wrap" }}
              >
                {`1. Question text here?
A. Option One
B. Option Two
C. Option Three
D. Option Four
Answer: B
Exp: Optional explanation.

2. Next question here?
A. ...`}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="caption" color="text.secondary">
                * Separate questions with an <strong>empty line</strong>.<br />
                * Options must start with A., B., C., D.
                <br />* Answer line must contain "Answer:" or "Correct:".
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleParse}
          variant="contained"
          color="primary"
          startIcon={<ContentPaste />}
          disabled={!text.trim()}
        >
          Parse & Add Questions
        </Button>
      </DialogActions>
    </Dialog>
  );
}
