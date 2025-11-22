// apps/web/src/app/profile/page.tsx
"use client";

import React, { useEffect } from 'react'; // Import useEffect
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import {
  Container,
  Typography,
  Box,
  Paper,
  Avatar,
  Button,
  Grid,
} from '@mui/material';
import LoadingSpinner from '@/components/LoadingSpinner';

const ProfileRow = ({ label, value }: { label: string, value: string | number }) => (
  <Paper 
    elevation={1} 
    className="flex justify-between items-center p-3 mb-2"
    sx={{ backgroundColor: '#f9f9f9' }}
  >
    <Typography variant="body1">{label}</Typography>
    <Typography variant="body1" className="font-semibold">{value}</Typography>
  </Paper>
);

export default function ProfilePage() {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  // --- THIS IS THE FIX ---
  // We move the redirect logic into a useEffect hook.
  // This hook will run after the component renders.
  useEffect(() => {
    // If auth is done loading AND the user is not authenticated
    if (!loading && !isAuthenticated) {
      router.push('/login'); // Redirect to login page
    }
  }, [loading, isAuthenticated, router]); // Re-run if these values change
  // --- END OF FIX ---

  // While loading or before redirecting, show a spinner.
  if (loading || !isAuthenticated || !user) {
    return <LoadingSpinner />;
  }
  
  // These are mock stats based on the image
  const stats = {
    activeSubscription: "নেই",
    participatedExams: 0,
    passedExams: 0,
    totalQuestions: 0.0,
    totalCorrect: 0.0,
    totalWrong: 0.0,
  };

  // Since the hook above handles redirection, if we reach this point,
  // we are guaranteed to be authenticated and have a user.
  return (
    <Container maxWidth="sm" className="mt-8">
      <Paper elevation={3} className="p-4" sx={{ backgroundColor: '#f0f2f5' }}>
        <Box className="flex flex-col items-center mb-4">
          <Avatar sx={{ width: 80, height: 80, fontSize: '2.5rem', mb: 2, bgcolor: 'primary.main' }}>
            {user.name[0].toUpperCase()}
          </Avatar>
        </Box>

        <Box className="p-4" sx={{ backgroundColor: '#fff' }}>
          <Box className="p-2 text-center text-white mb-2" sx={{ backgroundColor: '#006400' }}>
            <Typography variant="h6">আপনার তথ্যাসমুহ</Typography>
          </Box>
          <ProfileRow label="আপনার আইডি" value={user.userId} />
          <ProfileRow label="আপনার নাম" value={user.name} />
          <ProfileRow label="অ্যাক্টিভ সাবস্ক্রিপশন" value={stats.activeSubscription} />
          <ProfileRow label="অংশগ্রহণকৃত লাইভ পরীক্ষার সংখ্যা" value={stats.participatedExams} />
          <ProfileRow label="পাশকৃত লাইভ পরীক্ষার সংখ্যা" value={stats.passedExams} />
          <ProfileRow label="মোট প্রশ্ন সংখ্যা (লাইভ পরীক্ষা)" value={stats.totalQuestions.toFixed(1)} />
          <ProfileRow label="মোট সঠিক উত্তর (লাইভ পরীক্ষা)" value={stats.totalCorrect.toFixed(1)} />
          <ProfileRow label="মোট ভুল উত্তর (লাইভ পরীক্ষা)" value={stats.totalWrong.toFixed(1)} />
        </Box>
        
        {/* Corrected Grid layout for buttons */}
        <Grid container spacing={2} className="mt-4 p-4">
          <Grid> {/* Added xs={6} */}
            <Button 
              variant="contained" 
              fullWidth
              sx={{ backgroundColor: '#f39c12', '&:hover': { backgroundColor: '#e67e22' } }}
              onClick={() => router.push('/profile/update')}
            >
              Profile Update
            </Button>
          </Grid>
          <Grid> {/* Added xs={6} */}
            <Button 
              variant="contained" 
              color="success" 
              fullWidth
            >
              পেমেন্ট করুন
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}