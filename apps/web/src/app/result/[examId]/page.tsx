// src/app/result/[examId]/page.tsx
"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from "@mui/material";
import { useResult } from "@/contexts/ResultContext";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function ResultPage() {
  const router = useRouter();
  const { result, exam } = useResult();

  useEffect(() => {
    // If user lands here directly without context, redirect them
    if (!result || !exam) {
      router.replace("/exam-list");
    }
  }, [result, exam, router]);

  if (!result || !exam) {
    return <LoadingSpinner />;
  }

  const { totalScore, totalCorrect, totalWrong, subjectBreakdown, rank } = result;

  const getFormattedDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    try {
      return new Intl.DateTimeFormat("en-US", {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
      }).format(new Date(dateString));
    } catch (e) {
      return "Invalid Date";
    }
  };

  return (
    <Container maxWidth="md" className="py-8">
      {/* Top Header */}
      <Typography variant="h5" align="center" gutterBottom>
        পরীক্ষা নং :- {exam.exam_name}
      </Typography>

      {/* Stats Grid */}
      <Grid container spacing={2} className="mb-4">
        <Grid>
          <Paper elevation={2} className="p-2 text-center">
            <Typography variant="body2">পরীক্ষার তারিখ</Typography>
            <Typography variant="h6">{getFormattedDate(exam.date)}</Typography>
          </Paper>
        </Grid>
        <Grid>
          <Paper elevation={2} className="p-2 text-center">
            <Typography variant="body2">মোট পরীক্ষার্থী সংখ্যা</Typography>
            <Typography variant="h6">{exam.totalExaminees ?? 'N/A'}</Typography>
          </Paper>
        </Grid>
        <Grid>
          <Paper elevation={2} className="p-2 text-center">
            <Typography variant="body2">আপনার অবস্থান</Typography>
            <Typography variant="h6">{rank ?? 'N/A'}</Typography>
          </Paper>
        </Grid>
        <Grid>
          <Paper elevation={2} className="p-2 text-center">
            <Typography variant="body2">সর্বোচ্চ উত্তীর্ণ পরীক্ষার্থীর মার্কস</Typography>
            <Typography variant="h6">{exam.highestMark ?? 'N/A'}</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Score Buttons */}
      <Box className="flex justify-between items-center my-4">
        <Button variant="contained" color="primary">
          প্রশ্নের ভিউ দিন
        </Button>
        <Box className="text-center">
          <Typography variant="h5">আপনার মার্কস</Typography>
          <Typography variant="h3" color="green" className="font-bold">
            {totalScore}
          </Typography>
        </Box>
        <Button variant="contained" color="warning">
          * কাট মার্ক কত ?
        </Button>
      </Box>

      {/* Results Table */}
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f0f0f0" }}>
            <TableRow>
              <TableCell>বিষয়</TableCell>
              <TableCell align="right">সঠিক</TableCell>
              <TableCell align="right">ভুল</TableCell>
              <TableCell align="right">মার্ক</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subjectBreakdown.map((subject) => (
              <TableRow key={subject.subjectName}>
                <TableCell component="th" scope="row">
                  {subject.subjectName}
                </TableCell>
                <TableCell align="right">{subject.correct}</TableCell>
                <TableCell align="right">{subject.wrong}</TableCell>
                <TableCell align="right">{subject.marks}</TableCell>
              </TableRow>
            ))}
            {/* Total Row */}
            <TableRow sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>
              <TableCell component="th" scope="row" className="font-bold">
                Total
              </TableCell>
              <TableCell align="right" className="font-bold">{totalCorrect}</TableCell>
              <TableCell align="right" className="font-bold">{totalWrong}</TableCell>
              <TableCell align="right" className="font-bold">{totalScore}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Footer Buttons */}
      <Box className="flex justify-between mt-6 gap-4">
        <Button variant="contained" color="success" fullWidth>
          উত্তরপত্রটি দেখুন
        </Button>
        <Button variant="contained" color="error" fullWidth>
          মেরিট লিস্ট
        </Button>
      </Box>
      <Button variant="contained" color="secondary" fullWidth className="mt-4">
        আলোচনা পোস্ট
      </Button>
    </Container>
  );
}