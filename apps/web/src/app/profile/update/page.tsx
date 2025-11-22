// apps/web/src/app/profile/update/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Alert,
} from '@mui/material';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function ProfileUpdatePage() {
  const { user, loading, isAuthenticated, updateUser } = useAuth();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        email: user.email || '',
        password: '',
        confirmPassword: '',
      });
    }
  }, [user, loading, isAuthenticated, router]);

  if (loading || !user) {
    return <LoadingSpinner />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    if (formData.password && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsSubmitting(false);
      return;
    }

    const dataToUpdate: { name: string; email: string; phone: string; password?: string } = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    };

    if (formData.password) {
      dataToUpdate.password = formData.password;
    }

    const result = await updateUser(dataToUpdate);

    if (result.success) {
      setSuccess("Profile updated successfully!");
      router.push('/profile'); // Redirect back to profile
    } else {
      setError(result.error || "An unknown error occurred.");
    }
    setIsSubmitting(false);
  };

  return (
    <Container maxWidth="sm" className="mt-8">
      <Paper elevation={3} className="p-6" sx={{ backgroundColor: '#f0f2f5' }}>
        <Typography variant="h5" align="center" gutterBottom>
          আপনার তথ্য আপডেট করুন
        </Typography>
        
        {error && <Alert severity="error" className="mb-4">{error}</Alert>}
        {success && <Alert severity="success" className="mb-4">{success}</Alert>}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="আপনার নামঃ"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            sx={{ backgroundColor: '#fff' }}
          />
          <TextField
            label="মোবাইল নাম্বারঃ (পেমেন্টের সাথে কোন সম্পর্ক নেই)"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            sx={{ backgroundColor: '#fff' }}
          />
          <TextField
            label="আপনার ইমেইলঃ"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            sx={{ backgroundColor: '#fff' }}
          />
          <TextField
            label="নতুন পাসওয়ার্ড (খালি রাখুন যদি পরিবর্তন না চান)"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={{ backgroundColor: '#fff' }}
          />
          <TextField
            label="পাসওয়ার্ড নিশ্চিত করুন"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            fullWidth
            margin="normal"
            disabled={!formData.password}
            sx={{ backgroundColor: '#fff' }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isSubmitting}
            sx={{ mt: 3, py: 1.5 }}
          >
            {isSubmitting ? "আপডেট হচ্ছে..." : "সাবমিট"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}