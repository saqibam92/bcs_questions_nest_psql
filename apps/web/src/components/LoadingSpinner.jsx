// src/components/LoadingSpinner.jsx
"use client";
import { CircularProgress } from "@mui/material";

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <CircularProgress />
  </div>
);

export default LoadingSpinner;