// src/app/exam/[examId]/page.tsx
"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { getExamById, getQuestionsForSubject } from "../../../services/api";
import { useRouter } from "next/navigation";
import type { Exam, Question, Subject, ExamResult, SubjectResult } from "@/types";
import { useResult } from "@/contexts/ResultContext"; // Import the context hook

type ProcessedQuestion = Question & {
  options: string[];
  correctAnswerIndex: number;
};

interface ExamPageProps {
  params: Promise<{
    examId: string;
  }>;
}

export default function ExamPage({ params }: ExamPageProps) {
  const resolvedParams = React.use(params);
  const { examId } = resolvedParams;
  const router = useRouter();
  const { setResultData } = useResult(); // Get the context setter

  const [exam, setExam] = useState<Exam | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [currentQuestions, setCurrentQuestions] = useState<ProcessedQuestion[]>([]);
  const [allQuestionsMap, setAllQuestionsMap] = useState<Map<string, ProcessedQuestion[]>>(new Map());
  
  const [loading, setLoading] = useState(true);
  const [qLoading, setQLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("");
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  
  // NOTE: We remove showResults, score, etc. They are no longer needed here.
  const [timeLeft, setTimeLeft] = useState(0); 
  const [isSubmitting, setIsSubmitting] = useState(false); // Prevent double-submit

  useEffect(() => {
    getExamById(examId)
      .then((response) => {
        const examData = response.data;
        setExam(examData);
        setSubjects(examData.subjects || []);
        if (examData.subjects && examData.subjects.length > 0) {
          setSelectedSubjectId(examData.subjects[0].id);
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [examId]);

  useEffect(() => {
    if (!selectedSubjectId) return;
    if (allQuestionsMap.has(selectedSubjectId)) {
      setCurrentQuestions(allQuestionsMap.get(selectedSubjectId)!);
      return;
    }

    setQLoading(true);
    getQuestionsForSubject(selectedSubjectId)
      .then((response) => {
        const questions = response.data.map(processQuestion);
        setCurrentQuestions(questions);
        setAllQuestionsMap(prevMap => new Map(prevMap).set(selectedSubjectId, questions));
        
        // Set timer based on *total* questions fetched so far
        const totalFetched = Array.from(allQuestionsMap.values()).reduce((acc, qs) => acc + qs.length, 0);
        setTimeLeft(totalFetched * 60); // 1 min per question
      })
      .catch((err) => setError(err.message))
      .finally(() => setQLoading(false));
      
  }, [selectedSubjectId, allQuestionsMap]);

  const processQuestion = (q: Question): ProcessedQuestion => {
      const options = [q.option_1, q.option_2, q.option_3, q.option_4];
      return {
        ...q,
        options,
        correctAnswerIndex: options.indexOf(q.correctAnswer),
      }
  }

    const handleSubmit = React.useCallback(() => {
    if (isSubmitting || !exam) return; 
    setIsSubmitting(true);
    
    let totalScore = 0;
    let totalCorrect = 0;
    let totalWrong = 0;

    const subjectBreakdown: SubjectResult[] = subjects.map(subject => {
        let correct = 0;
        let wrong = 0;
        const questions = allQuestionsMap.get(subject.id) || [];

        questions.forEach(q => {
            const userAnswer = userAnswers[q.id];
            if (userAnswer !== undefined) {
                if (userAnswer === q.correctAnswerIndex) {
                    correct++;
                } else {
                    wrong++;
                }
            }
        });

        // Example scoring: 1 mark for correct, 0 for wrong (as per image)
        const marks = correct;
        totalCorrect += correct;
        totalWrong += wrong;
        totalScore += marks;

        return {
            subjectName: subject.name,
            correct,
            wrong,
            marks
        };
    });

    // Add empty subjects from the image for completeness
    const allSubjectNames = [
      "বাংলা সাহিত্য ও ব্যাকরণ", "English Literature and Grammar", "গাণিতিক যুক্তি", 
      "সাধারণ বিজ্ঞান", "কম্পিউটার ও তথ্য প্রযুক্তি", "মানসিক দক্ষতা", "বাংলাদেশ বিষয়াবলি",
      "আন্তর্জাতিক বিষয়াবলি", "ভূগোল, পরিবেশ ও দুর্যোগ ব্যবস্থাপনা", "নৈতিকতা, মূল্যবোধ ও সুশাসন"
    ];

    const finalBreakdown = allSubjectNames.map(name => {
      const found = subjectBreakdown.find(s => s.subjectName === name);
      if (found) return found;
      // Find the "Bangla" subject and map it
      if (name === "বাংলা সাহিত্য ও ব্যাকরণ" && subjectBreakdown.find(s => s.subjectName === "Bangla")) {
         return { ...subjectBreakdown.find(s => s.subjectName === "Bangla")!, subjectName: name};
      }
      return { subjectName: name, correct: 0, wrong: 0, marks: 0 };
    });

    const resultData: ExamResult = {
        totalScore,
        totalCorrect,
        totalWrong,
        subjectBreakdown: finalBreakdown,
        rank: 9134 // Hardcoded from image
    };

    // Set data in context and redirect
    setResultData(exam, resultData);
    router.push(`/result/${exam.id}`);

  }, [isSubmitting, exam, subjects, allQuestionsMap, userAnswers, setResultData, router]);

  // Timer logic
  useEffect(() => {
    if (loading || error || timeLeft <= 0 || isSubmitting) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [loading, error, timeLeft, isSubmitting, handleSubmit]); // Added handleSubmit

  const formatTime = (s: number) => {
    const hours = Math.floor(s / 3600).toString().padStart(2, "0");
    const minutes = Math.floor((s % 3600) / 60).toString().padStart(2, "0");
    const seconds = (s % 60).toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const handleSelectOption = (qId: string, idx: number) => {
    // This will disable the group after selection
    setUserAnswers((prevAnswers) => ({ ...prevAnswers, [qId]: idx }));
  };



  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedSubjectId(newValue);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container>
      <Typography variant="h4" className="text-center my-4">
        Exam: {exam?.exam_name}
      </Typography>
      <Box className="flex justify-between items-center mb-4">
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={isSubmitting || Object.keys(userAnswers).length === 0}
        >
          {isSubmitting ? "Submitting..." : "Submit Exam"}
        </Button>
        <Typography variant="h6" className="text-red-500 text-center">
          Time Left: {formatTime(timeLeft)}
        </Typography>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={selectedSubjectId}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          {subjects.map((s) => (
            <Tab key={s.id} label={s.name} value={s.id} />
          ))}
        </Tabs>
      </Box>

      {qLoading ? <LoadingSpinner /> : (
        <div className="space-y-6 mt-4">
          {currentQuestions.map((q) => (
            <div key={q.id} className="p-4 border-b border-gray-200">
              <Typography variant="h6" className="mb-2">
                {q.ques_no} {q.ques}
              </Typography>
              <RadioGroup
                value={userAnswers[q.id] ?? -1}
                onChange={(e) =>
                  handleSelectOption(q.id, parseInt(e.target.value))
                }
                className="flex flex-col items-start mt-2 space-y-2"
              >
                {q.options.map((o, i) => (
                  <FormControlLabel
                    key={i}
                    value={i}
                    control={<Radio />}
                    label={o}
                    // --- DISABLE ON SELECT ---
                    disabled={userAnswers[q.id] !== undefined}
                  />
                ))}
              </RadioGroup>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}