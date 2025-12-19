// apps/web/src/app/admin/exams/view/[id]/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import {
  Container,
  Typography,
  Box,
  Paper,
  Divider,
  Chip,
  Grid,
  CircularProgress,
  Button,
} from "@mui/material";
import { CheckCircle, ArrowBack } from "@mui/icons-material";
import Link from "next/link";

export default function ViewExamPage() {
  const { id } = useParams();
  const [exam, setExam] = useState<any>(null);

  useEffect(() => {
    if (id) {
      api
        .get(`/exams/${id}`)
        .then(({ data }) => setExam(data))
        .catch((err) => console.error(err));
    }
  }, [id]);

  if (!exam)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50vh"
      >
        <CircularProgress />
      </Box>
    );

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Link href="/admin/exams" style={{ textDecoration: "none" }}>
        <Button startIcon={<ArrowBack />} sx={{ mb: 2 }}>
          Back to List
        </Button>
      </Link>

      <Paper sx={{ p: 4, mb: 4, borderRadius: 2 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {exam.name}
        </Typography>
        <Box display="flex" gap={1} mb={2}>
          <Chip label={`${exam.durationMinutes} Mins`} variant="outlined" />
          <Chip label={`${exam.totalMarks} Marks`} variant="outlined" />
          <Chip
            label={exam.isPublished ? "Published" : "Draft"}
            color={exam.isPublished ? "success" : "default"}
          />
        </Box>
        <Typography variant="body1" color="text.secondary">
          {exam.description || "No description provided."}
        </Typography>
      </Paper>

      {exam.sections?.map((section: any, sIdx: number) => (
        <Box key={section.id} mb={5}>
          <Box
            sx={{
              mb: 3,
              borderLeft: "5px solid #1976d2",
              pl: 2,
              py: 1,
              bgcolor: "#f5f9ff",
              borderRadius: "0 8px 8px 0",
            }}
          >
            <Typography variant="h5" fontWeight="bold" color="primary.main">
              {section.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {section.questions?.length || 0} Questions • Default Marks:{" "}
              {section.defaultMarks}
            </Typography>
          </Box>

          {section.questions?.map((q: any, qIdx: number) => (
            <Paper key={q.id} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="flex-start"
                mb={2}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{ width: "90%" }}
                >
                  Q{qIdx + 1}. {q.text}
                </Typography>
                <Chip
                  label={q.marks}
                  size="small"
                  sx={{ fontWeight: "bold" }}
                />
              </Box>

              <Grid container spacing={2}>
                {["A", "B", "C", "D"].map((opt) => {
                  const isCorrect = q.correctOption === opt;
                  const optText = q[`option${opt}`];
                  return (
                    <Grid size={{xs: 12, sm: 6}} key={opt}>
                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: 1,
                          border: "1px solid",
                          borderColor: isCorrect ? "success.main" : "grey.300",
                          bgcolor: isCorrect ? "success.light" : "white",
                          color: isCorrect
                            ? "success.contrastText"
                            : "text.primary",
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        {isCorrect ? (
                          <CheckCircle fontSize="small" />
                        ) : (
                          <Typography
                            fontWeight="bold"
                            color="text.disabled"
                            sx={{ minWidth: 20 }}
                          >
                            {opt}.
                          </Typography>
                        )}
                        <Typography variant="body2">{optText}</Typography>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>

              {q.explanation && (
                <Box
                  mt={2}
                  p={2}
                  bgcolor="#f8f9fa"
                  borderRadius={1}
                  border="1px dashed #e0e0e0"
                >
                  <Typography
                    variant="caption"
                    fontWeight="bold"
                    display="block"
                    color="text.secondary"
                    mb={0.5}
                  >
                    EXPLANATION
                  </Typography>
                  <Typography variant="body2">{q.explanation}</Typography>
                </Box>
              )}
            </Paper>
          ))}
        </Box>
      ))}
    </Container>
  );
}

// // apps/web/src/app/admin/exams/view/[id]/page.tsx

// "use client";
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import api from '@/lib/api';
// import { Container, Typography, Box, Paper, Divider, Chip, Grid } from '@mui/material';
// import { CheckCircle, Cancel } from '@mui/icons-material';

// export default function ViewExamPage() {
//   const { id } = useParams();
//   const [exam, setExam] = useState<any>(null);

//   useEffect(() => {
//     if (id) {
//       api.get(`/exams/${id}`).then(({ data }) => setExam(data));
//     }
//   }, [id]);

//   if (!exam) return <Typography p={4}>Loading...</Typography>;

//   return (
//     <Container maxWidth="md" sx={{ py: 4 }}>
//       <Paper sx={{ p: 4, mb: 4 }}>
//         <Typography variant="h4" fontWeight="bold" gutterBottom>{exam.name}</Typography>
//         <Typography color="text.secondary" gutterBottom>Duration: {exam.durationMinutes} mins | Total Marks: {exam.totalMarks}</Typography>
//         <Typography variant="body1" sx={{ mt: 2 }}>{exam.description}</Typography>
//       </Paper>

//       {exam.sections?.map((section: any, sIdx: number) => (
//         <Box key={section.id} mb={4}>
//           <Typography variant="h5" sx={{ mb: 2, borderLeft: '4px solid #1976d2', pl: 2 }}>
//             {section.name}
//           </Typography>

//           {section.questions?.map((q: any, qIdx: number) => (
//             <Paper key={q.id} sx={{ p: 3, mb: 2, bgcolor: '#f9fafb' }}>
//               <Box display="flex" justifyContent="space-between">
//                  <Typography variant="h6" fontSize="1rem" fontWeight="bold">
//                    Q{qIdx+1}. {q.text}
//                  </Typography>
//                  <Chip label={`${q.marks} Marks`} size="small" />
//               </Box>

//               <Grid container spacing={2} sx={{ mt: 1 }}>
//                  {['A', 'B', 'C', 'D'].map((opt) => {
//                     const isCorrect = q.correctOption === opt;
//                     const optText = q[`option${opt}`];
//                     return (
//                         <Grid item xs={12} sm={6} key={opt}>
//                             <Box
//                                 sx={{
//                                     p: 1.5,
//                                     borderRadius: 1,
//                                     border: '1px solid',
//                                     borderColor: isCorrect ? 'success.main' : 'grey.300',
//                                     bgcolor: isCorrect ? 'success.light' : 'white',
//                                     color: isCorrect ? 'success.contrastText' : 'text.primary',
//                                     display: 'flex',
//                                     alignItems: 'center',
//                                     gap: 1
//                                 }}
//                             >
//                                 {isCorrect ? <CheckCircle fontSize="small" /> : <Box width={20} />}
//                                 <Typography variant="body2"><strong>{opt}.</strong> {optText}</Typography>
//                             </Box>
//                         </Grid>
//                     );
//                  })}
//               </Grid>

//               {q.explanation && (
//                   <Box mt={2} p={2} bgcolor="info.light" borderRadius={1}>
//                       <Typography variant="body2" fontWeight="bold">Explanation:</Typography>
//                       <Typography variant="body2">{q.explanation}</Typography>
//                   </Box>
//               )}
//             </Paper>
//           ))}
//         </Box>
//       ))}
//     </Container>
//   );
// }
