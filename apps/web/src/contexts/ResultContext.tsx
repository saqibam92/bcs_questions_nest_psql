// src/contexts/ResultContext.tsx
"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";
import type { Exam, ExamResult } from "@/types";

interface ResultContextType {
  exam: Exam | null;
  result: ExamResult | null;
  setResultData: (exam: Exam, result: ExamResult) => void;
}

const ResultContext = createContext<ResultContextType | undefined>(undefined);

export const ResultProvider = ({ children }: { children: ReactNode }) => {
  const [exam, setExam] = useState<Exam | null>(null);
  const [result, setResult] = useState<ExamResult | null>(null);

  const setResultData = (examData: Exam, resultData: ExamResult) => {
    setExam(examData);
    setResult(resultData);
    // Persist to session storage so a refresh doesn't wipe it
    sessionStorage.setItem("examResult", JSON.stringify(resultData));
    sessionStorage.setItem("examData", JSON.stringify(examData));
  };

  // Try to load from session storage on initial load
  useState(() => {
    if (typeof window !== "undefined") {
      const storedResult = sessionStorage.getItem("examResult");
      const storedExam = sessionStorage.getItem("examData");
      if (storedResult && storedExam) {
        setResult(JSON.parse(storedResult));
        setExam(JSON.parse(storedExam));
      }
    }
  });


  return (
    <ResultContext.Provider value={{ exam, result, setResultData }}>
      {children}
    </ResultContext.Provider>
  );
};

export const useResult = () => {
  const context = useContext(ResultContext);
  if (context === undefined) {
    throw new Error("useResult must be used within a ResultProvider");
  }
  return context;
};