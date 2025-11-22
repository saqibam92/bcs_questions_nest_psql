// src/screens/ExamScreen.jsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Button,
} from "react-native";
import { getExamById } from "../services/api";
import Option from "../components/Option";
// import { ScrollView } from "react-native-web";

const ExamScreen = ({ route, navigation }) => {
  const { examId } = route.params;
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [examCompleted, setExamCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [allQuestions, setAllQuestions] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const response = await getExamById(examId);
        const fetchedExam = response.data.data;
        setExam(fetchedExam);

        let questionsList = [];
        let totalQuestions = 0;
        const subjList = fetchedExam.subjectWiseSort.map((s) => s.subject);
        setSubjects(subjList);
        setSelectedSubject(subjList[0]);

        fetchedExam.subjectWiseSort.forEach((s) => {
          s.questions.forEach((q, qIndex) => {
            const options = [q.option_1, q.option_2, q.option_3, q.option_4];
            const correctIndex = options.indexOf(q.correctAnswer);
            const questionId = `${s.subject}_${q.ques_no}`;
            questionsList.push({
              ...q,
              id: questionId,
              subject: s.subject,
              options,
              correctAnswerIndex: correctIndex,
            });
            totalQuestions++;
          });
        });

        setAllQuestions(questionsList);
        setTimeLeft(totalQuestions * 60); // 1 minute per question

        // Add dummy questions for testing
        if (
          process.env.NODE_ENV === "development" &&
          questionsList.length < 10
        ) {
          const dummyQuestions = Array(15)
            .fill()
            .map((_, i) => ({
              id: `dummy_${i}`,
              ques_no: totalQuestions + i + 1,
              ques: `Dummy Question ${totalQuestions + i + 1}?`,
              option_1: "A",
              option_2: "B",
              option_3: "C",
              option_4: "D",
              correctAnswer: "A",
              explanation: "Dummy explanation.",
              subject: subjList[0],
              options: ["A", "B", "C", "D"],
              correctAnswerIndex: 0,
            }));
          setAllQuestions([...questionsList, ...dummyQuestions]);
        }
      } catch (err) {
        setError("Failed to fetch exam.");
      } finally {
        setLoading(false);
      }
    };

    fetchExam();
  }, [examId]);

  useEffect(() => {
    if (loading || error || examCompleted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [loading, error, examCompleted, timeLeft]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSelectOption = (questionId, index) => {
    if (!showResults) {
      setUserAnswers((prev) => ({ ...prev, [questionId]: index }));
    }
  };

  const handleSubmit = () => {
    let calculatedScore = 0;
    allQuestions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswerIndex) {
        calculatedScore++;
      }
    });
    setScore(calculatedScore);
    setShowResults(true);
    setExamCompleted(true);
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.centered} />;
  }

  if (error) {
    return <Text style={styles.centered}>{error}</Text>;
  }

  if (examCompleted && showResults) {
    return (
      <View style={styles.centered}>
        <Text style={styles.scoreText}>
          {timeLeft > 0 ? "Exam Completed!" : "Time's Up!"}
        </Text>
        <Text style={styles.scoreText}>
          Your Score: {score} / {allQuestions.length}
        </Text>
        <Button
          title="Restart Exam"
          onPress={() => navigation.navigate("ExamList")}
        />
      </View>
    );
  }

  const currentQuestions = allQuestions.filter(
    (q) => q.subject === selectedSubject
  );

  return (
    <View>
      <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
      <View style={styles.pickerContainer}>
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          style={styles.select}
        >
          {subjects.map((subj, index) => (
            <option key={index} value={subj}>
              {subj}
            </option>
          ))}
        </select>
      </View>
      {currentQuestions.map((q) => (
        <ScrollView>

        <View key={q.id} style={styles.questionContainer}>
          <Text style={styles.questionText}>
            {q.ques_no}) {q.ques}
          </Text>
          {q.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleSelectOption(q.id, index)}
            >
              <Option
                text={option}
                isSelected={userAnswers[q.id] === index}
                isCorrect={index === q.correctAnswerIndex}
                showResult={showResults}
              />
            </TouchableOpacity>
          ))}
          {showResults && (
            <View style={styles.explanationBox}>
              <Text style={styles.explanationTitle}>Explanation</Text>
              <Text style={styles.explanationText}>{q.explanation}</Text>
            </View>
          )}
        </View>
        </ScrollView>
      ))}
      {!showResults && (
        <View style={styles.buttonContainer}>
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 10,
  },
  pickerContainer: {
    padding: 10,
    backgroundColor: "#90ee90",
  },
  select: {
    width: "100%",
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  questionContainer: {
    marginBottom: 20,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  explanationBox: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#f0f8ff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#cce5ff",
  },
  explanationTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  explanationText: {
    fontSize: 14,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  timer: {
    fontSize: 24,
    color: "red",
    textAlign: "center",
    margin: 10,
  },
});

export default ExamScreen;
