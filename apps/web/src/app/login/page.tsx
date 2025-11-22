// apps/web/src/app/login/page.tsx
"use client";

import React, { useState } from 'react';
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
  Grid,
} from '@mui/material';
import Link from 'next/link';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  
  const [loginId, setLoginId] = useState(''); // Can be email or phone
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const result = await login(loginId, password);

    if (result.success) {
      router.push('/profile'); // Redirect to profile on success
    } else {
      setError(result.error || "An unknown error occurred.");
    }
    setIsSubmitting(false);
  };

  return (
    <Container maxWidth="sm" className="mt-8">
      <Paper elevation={3} className="p-6">
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>

        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Email or Phone"
            name="loginId"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isSubmitting}
            sx={{ mt: 3, py: 1.5 }}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
          <Grid container justifyContent="flex-end" className="mt-2">
            <Grid>
              <Link href="/register" style={{ textDecoration: "none" }}>
                <Typography variant="body2" color="primary">
                  Don't have an account? Sign Up
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}