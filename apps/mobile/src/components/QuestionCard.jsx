// src/components/QuestionCard.jsx
import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Platform,
} from "react-native";

const QuestionCard = ({ question, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.questionText} numberOfLines={2}>
        {question.questionText}
      </Text>
      <View style={styles.tagContainer}>
        <Text style={styles.tag}>{question.subject}</Text>
        <Text style={styles.tag}>{question.topic}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    // FIX: Use Platform.select for cross-platform shadow/elevation
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
      },
    }),
  },
  questionText: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  tagContainer: {
    flexDirection: "row",
  },
  tag: {
    fontSize: 12,
    backgroundColor: "#e0e0e0",
    color: "#333",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 5,
  },
});

export default QuestionCard;
