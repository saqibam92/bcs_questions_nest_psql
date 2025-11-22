// src/screens/QuestionDetailScreen.jsx
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
import { getQuestionById } from "../services/api";
import Option from "../components/Option";

const QuestionDetailScreen = ({ route }) => {
  const { questionId } = route.params;
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await getQuestionById(questionId);
        setQuestion(response.data.data);
      } catch (err) {
        setError("Failed to fetch question details.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [questionId]);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.centered} />;
  }

  if (error) {
    return <Text style={styles.centered}>{error}</Text>;
  }

  const handleSelectOption = (index) => {
    if (!showResult) {
      setSelectedOption(index);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.questionText}>{question.questionText}</Text>

      {question.options.map((option, index) => (
        <TouchableOpacity key={index} onPress={() => handleSelectOption(index)}>
          <Option
            text={option}
            isSelected={selectedOption === index}
            isCorrect={index === question.correctAnswerIndex}
            showResult={showResult}
          />
        </TouchableOpacity>
      ))}

      <View style={styles.buttonContainer}>
        <Button
          title={showResult ? "Try Again" : "Show Answer"}
          onPress={() => {
            if (showResult) {
              setSelectedOption(null);
              setShowResult(false);
            } else {
              setShowResult(true);
            }
          }}
          disabled={selectedOption === null && !showResult}
        />
      </View>

      {showResult && (
        <View style={styles.explanationBox}>
          <Text style={styles.explanationTitle}>Explanation</Text>
          <Text style={styles.explanationText}>{question.explanation}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  questionText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
  explanationBox: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#f0f8ff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#cce5ff",
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  explanationText: {
    fontSize: 16,
  },
});

export default QuestionDetailScreen;
