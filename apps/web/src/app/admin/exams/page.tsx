// apps/web/src/app/admin/exams/page.tsx

"use client";
import React, { useEffect, useState } from 'react';
import api from '@/lib/api';
import { 
  Box, 
  Button, 
  Container, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Typography, 
  IconButton,
  Tooltip,
  Chip
} from '@mui/material';
import { Add, Edit, Delete, Visibility, Assignment } from '@mui/icons-material';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function ExamsPage() {
  const [exams, setExams] = useState<any[]>([]);

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const { data } = await api.get('/exams');
      setExams(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load exams");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this exam?")) return;
    try {
      await api.delete(`/exams/${id}`);
      toast.success("Exam deleted");
      fetchExams();
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" fontWeight="bold">Exam List</Typography>
        <Link href="/admin/exams/add">
          <Button variant="contained" startIcon={<Add />}>Create New Exam</Button>
        </Link>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: 'grey.100' }}>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Slug</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell align="center"><strong>Sections</strong></TableCell>
              <TableCell align="right"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {exams.map((exam) => (
              <TableRow key={exam.id} hover>
                <TableCell>
                    <Typography variant="body1" fontWeight="medium">{exam.name}</Typography>
                    <Typography variant="caption" color="text.secondary">{new Date(exam.createdAt).toLocaleDateString()}</Typography>
                </TableCell>
                <TableCell>{exam.slug}</TableCell>
                <TableCell>
                    <Chip 
                        label={exam.isPublished ? "Published" : "Draft"} 
              color={exam.isPublished ? "success" : "default"} 
                        size="small" 
                    />
                </TableCell>
                <TableCell align="center">
                    {exam._count?.sections || 0}
                </TableCell>
                <TableCell align="right">
                   <Link href={`/admin/exams/view/${exam.id}`}>
                      <Tooltip title="View Questions">
                        <IconButton color="info"><Visibility /></IconButton>
                      </Tooltip>
                   </Link>
                   <Link href={`/admin/exams/edit/${exam.id}`}>
                      <Tooltip title="Edit">
                        <IconButton color="primary"><Edit /></IconButton>
                      </Tooltip>
                   </Link>
                   <Tooltip title="Delete">
                      <IconButton color="error" onClick={() => handleDelete(exam.id)}>
                        <Delete />
                      </IconButton>
                   </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}