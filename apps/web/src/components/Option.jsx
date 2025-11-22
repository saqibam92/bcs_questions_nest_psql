// src/components/Option.jsx
"use client";

import { Button } from "@mui/material";

// FIX: Add onClick to the props
const Option = ({ text, isSelected, isCorrect, showResult, onClick }) => {
  const getButtonStyle = () => {
    if (showResult) {
      if (isCorrect) return "bg-green-500 text-white hover:bg-green-600";
      if (isSelected && !isCorrect)
        return "bg-red-500 text-white hover:bg-red-600";
    }
    return isSelected
      ? "bg-blue-500 text-white hover:bg-blue-600"
      : "bg-gray-200 text-black hover:bg-gray-300";
  };

  return (
    <Button
      variant="contained"
      // Use full-width and justify-start for better alignment
      className={`w-full m-1 justify-start normal-case ${getButtonStyle()}`}
      // FIX: Use the onClick prop from the parent component
      onClick={onClick}
      disabled={showResult}
    >
      {text}
    </Button>
  );
};

export default Option;
